(function() {

let deletables = [];
let resize_line;
let sidebar_button;

ASPlugin.register('explorer', {
	title: 'Explorer',
	icon: 'fas.fa-folder-open',
	author: 'alpinebuster',
	description: 'Navigate the files in your project from the sidebar in AS!',
	about: 'Use the folder icon in the left corner of the tab bar to open the explorer. Click files to peak into them, double click to jump into the file. Right click a file to bring up the context menu.',
	version: '1.0.3',
	min_version: '1.5.2',
	variant: 'desktop',
	onload() {

		function getFileIcon(dirent) {
			let ext = dirent.name.split('.').last().toLowerCase();
			let icon_name = 'insert_drive_file';
			let color;
			switch (ext) {
				case 'asmodel': icon_name = 'icon-blockbench_inverted'; color = '#a3cad9'; break;
				case 'json': icon_name = 'icon-format_block'; color = '#62a5df'; break;
				case 'jem': icon_name = 'icon-optifine_file'; color = '#df628a'; break;
				case 'jpm': icon_name = 'icon-optifine_file'; color = '#df628a'; break;
				case 'java': icon_name = 'icon-format_java'; color = '#dfd022'; break;
				case 'png': icon_name = 'image'; color = '#42ab8d'; break;
			}
			if (dirent.isDirectory()) {
				icon_name = 'folder';
				color = '#c3a670';
			}
			if (dirent.name.endsWith('.geo.json')) {
				icon_name = 'icon-format_bedrock';
				color = '#e3815b';
			}

			return AS.getIconNode(icon_name, color);
		}

		let css = AS.addCSS(`
			.sidebar_explorer_open_button {
				height: 100%;
				padding-top: 2px;
			}
			#sidebar_explorer {
				display: flex;
				flex-direction: column;
				width: 300px;
				bottom: 0;
				border-radius: 4px;
    			height: 100%;
				left: 0;
				background-color: var(--color-ui);
				box-shadow: 10px 4px 44px rgb(0 0 0 / 42%), 500px 0px 500px 2000px rgb(0 0 0 / 15%);
				border: 1px solid var(--color-accent);
				border-left: 0;
				transition: left 120ms ease-out, box-shadow 120ms linear;
				width: var(--width);
			}
			#sidebar_explorer:not(.visible) {
				box-shadow: none;
				left: calc(var(--width) * -1);
			}
			#sidebar_explorer ul.list {
				overflow-y: auto;
				margin-top: 8px;
			}
			li.sidebar_explorer_file {
				display: flex;
				height: 30px;
				padding: 1px 10px;
				gap: 5px;
				align-items: center;
				cursor: pointer;
			}
			li.sidebar_explorer_file.unsupported {
				color: var(--color-subtle_text);
			}
			li.sidebar_explorer_file:hover {
				background-color: var(--color-ui);
				color: var(--color-light);
			}
			li.sidebar_explorer_file.selected {
				background-color: var(--color-selected);
			}
			li.sidebar_explorer_file span {
				flex-grow: 1;
				overflow: hidden;
				white-space: nowrap;
				cursor: inherit;
				direction: initial;
			}
			li.sidebar_explorer_file i {
				height: 24px;
			}
			.sidebar_explorer_is_open_icon {
				color: var(--color-subtle_text);
				font-size: 13px;
				padding: 5px;
				width: 20px;
			}

			.sidebar_explorer_location_page {
				display: flex;
				width: 100%;
				flex-direction: row;
				overflow: hidden;
				justify-content: left;
				direction: rtl;
				height: 32px;
				flex-shrink: 0;
				padding-left: 12px;
				margin-top: 6px;
				padding-right: 6px;
			}
			.sidebar_explorer_location {
				overflow: hidden;
				justify-content: right;
				font-size: 0.95em;
				overflow-x: scroll;
				direction: rtl;
				height: 32px;
			}
			.sidebar_explorer_location::-webkit-scrollbar {
				height: 7px;
			}
			.sidebar_explorer_location > span {
				padding: 3px 0;
				cursor: pointer;
				white-space: nowrap;
			}
			.sidebar_explorer_location > span:hover {
				color: var(--color-light);
				background-color: var(--color-ui);
			}
			.sidebar_explorer_location > span::after {
				content: "\\f105";
				font-family: 'Font Awesome 6 Free';
				font-weight: 900;
				color: var(--color-subtle_text);
				margin: 0 7px;
				vertical-align: baseline;
			}
			.sidebar_explorer_location > span:first-child::after {
				display: none;
			}
		`);
		deletables.push(css);
		
		let temp_tab = null;
		let open_timeout = '';
		let explorer = new ShapelessDialog('sidebar_explorer', {
			darken: false,
			component: {
				data() {return {
					path: '',
					directory: [],
					selected: [],
					search_term: '',
					width: 300,
					max_files: 500,

					file_menu: new Menu([
						{
							id: 'load_as',
							name: 'Load As...',
							icon: 'add_photo_alternate',
							condition: (file) => file.name.toLowerCase().endsWith('png'),
							click(file) {
								loadImages([{path: file.path, name: file.name}])
							}
						},
						{
							id: 'open',
							name: 'Open in Default Program',
							icon: 'open_in_new',
							condition: (file) => file.type == 'file',
							click(file) {
								shell.openPath(file.path);
							}
						},
						{
							id: 'open_folder',
							name: 'menu.texture.folder',
							icon: 'folder',
							click(file) {
								shell.showItemInFolder(file.path);
							}
						},
						{
							id: 'delete',
							name: 'generic.delete',
							icon: 'delete',
							condition: (file) => file.type == 'file',
							click: (file) => {
								let result = confirm(`Are you sure you want to move '${file.name}' to trash?`);
								if (result) {
									shell.trashItem(file.path);
									this.updateList();
								}
							}
						}
					])
				}},
				methods: {
					updateList() {
						this.directory.empty();
						let folders = [];
						if (!this.path) return;
						try {
							let fs = require('node:fs');
							let dirents = fs.readdirSync(this.path, {withFileTypes: true});
							if (!dirents) return;
							dirents.forEach(dirent => {
								let {name} = dirent;
								let path = PathModule.join(this.path, name);
								let is_folder = dirent.isDirectory();
								let file = {
									name,
									type: is_folder ? 'folder' : 'file',
									icon: getFileIcon(dirent),
									is_open: ModelProject.all.findIndex(project => project.save_path == path || project.export_path == path) !== -1,
									path,
								};
								if (file.type == 'folder') {
									folders.push(file);
								} else {
									this.directory.push(file);
								}
							})
							if (folders.length) {
								this.directory.splice(0, 0, ...folders);
							}
							this.selected.empty();
						} catch (err) {
							console.error(err);
						}
					},
					clickFile(file) {
						if (open_timeout == file.path) return;
						open_timeout = file.path;
						setTimeout(() => (open_timeout = ''), 360);
						
						this.selected.replace([file.path]);

						if (file.type != 'folder') {
							if (AS_CUR_PROJECT?.save_path == file.path || AS_CUR_PROJECT?.export_path == file.path) return;

							let project_before = AS_CUR_PROJECT;
							AS.read([file.path], {}, async files => {
								loadModelFile(files[0]);
								let to_close = temp_tab;
								if (AS_CUR_PROJECT !== project_before) temp_tab = AS_CUR_PROJECT;
								if (to_close) {
									await to_close.close();
								}
							})
						}
					},
					dblClickFile(file) {
						if (file.type == 'folder') {
							this.goTo(file.path);
						} else {
							temp_tab = null;
							explorer.confirm();
						}
					},
					openContextMenu(file, event) {
						this.selected.replace([file.path]);
						this.file_menu.open(event, file);
					},

					goTo(path) {
						this.path = path;
						this.search_term = '';
						this.updateList();
					},
					directoryUp() {
						this.goTo(PathModule.dirname(this.path));
					},
					navigateBackTo(index) {
						if (!index) return;
						let arr = this.path.split(/[/\\]+/)
						arr = arr.slice(0, -Math.min(index, arr.length-2));
						if (arr[0].length === 0) arr[0] = PathModule.sep;
						this.goTo(PathModule.join(...arr));
					},
					createFile(event) {
						let arr = [];
						let arr_asmodel = [];
						let redact = AS_SETTINGS.presentation_mode.value;
						for (let key in Formats) {
							let format = Formats[key];
							if (!format.show_in_new_list) continue;
							if (key == 'image') continue;
							
							if (format.codec && format.codec.remember) {
								arr.push({
									id: format.id,
									name: (redact && format.confidential) ? `[${tl('generic.redacted')}]` : format.name,
									icon: format.icon,
									description: format.description,
									click: (e) => {
										explorer.hide();
										format.new();
										let project = AS_CUR_PROJECT;
										let update = () => {
											AS.removeListener('update_project_settings', update);
											if (project == AS_CUR_PROJECT) {
												project.export_path = PathModule.join(this.path, (project.name||'new') + `.${format.codec.extension || 'txt'}`);
												AS_FORMAT.codec.write(AS_FORMAT.codec.compile(), AS_CUR_PROJECT.export_path);
											}
										}
										AS.on('update_project_settings', update);
									}
								})
							}
							if (true && (!format.codec || format.codec.id !== 'project') && key !== 'skin') {
								arr_asmodel.push({
									id: format.id,
									name: ((redact && format.confidential) ? `[${tl('generic.redacted')}]` : format.name) + ' (asmodel)',
									icon: format.icon,
									description: format.description,
									click: (e) => {
										explorer.hide();
										format.new();
										let project = AS_CUR_PROJECT;
										let update = () => {
											AS.removeListener('update_project_settings', update);
											if (project == AS_CUR_PROJECT) {
												project.save_path = PathModule.join(this.path, (project.name||'new') + '.asmodel')
												Codecs.project.write(Codecs.project.compile(), AS_CUR_PROJECT.save_path);
											}
										}
										AS.on('update_project_settings', update);
									}
								})
							}
						}
						arr.push('_', ...arr_asmodel);
						new Menu('sidebar_explorer_new_file', arr).show(event.target);
					},
					close(e) {
						explorer.cancel();
					}
				},
				computed: {
					files() {
						if (!this.search_term) return this.directory.slice(0, this.max_files);
						let terms = this.search_term.toLowerCase().split(/\s/);
						
						let i = 0;
						return this.directory.filter(file => {
							i++;
							if (i > this.max_files) return false;
							return !terms.find(term => (
								!file.name.toLowerCase().includes(term)
							))
						})
					},
					path_array() {
						return this.path.split(/[/\\]+/).reverse();
					}
				},
				template: `
					<div id="sidebar_explorer" :style="{'--width': width + 'px'}">
						<div class="bar flex">
							<search-bar id="sidebar_explorer_search_bar" v-model="search_term" style="flex-grow: 1;" />
							<div class="tool" @click="close($event)"><i class="material-icons">clear</i></div>
						</div>
						<div class="flex sidebar_explorer_location_page">
							<div class="bar flex sidebar_explorer_location">
								<span v-for="(directory, i) in path_array" @click="navigateBackTo(i)">{{ directory }}</span>
							</div>
						</div>
						<div class="bar flex">
							<div class="tool" @click="directoryUp()" title="Navigate Back"><i class="material-icons">arrow_back</i></div>
							<div class="tool" @click="updateList()" title="Refresh"><i class="material-icons">refresh</i></div>
							<div class="tool" @click="createFile($event)" title="New File"><i class="material-icons">note_add</i></div>
						</div>
						<ul class="list">
							<li v-for="file in files" :key="file.path"
								class="sidebar_explorer_file" :class="{selected: selected.includes(file.path), unsupported: file.icon.textContent == 'insert_drive_file'}"
								@click="clickFile(file)" @dblclick="dblClickFile(file)" @contextmenu.stop="openContextMenu(file, $event)"
							>
								<i v-html="file.icon.outerHTML" />
								<span>{{ file.name }}</span>
								<i class="material-icons sidebar_explorer_is_open_icon" v-if="file.is_open">fiber_manual_record</i>
							</li>
							{{ (files.length == max_files && directory.length > max_files) ? 'More files are hidden. Search to reveal them.' : '' }}
						</ul>
					</div>
				`
			},
			onOpen() {
				temp_tab = null;
				let current_file = AS_CUR_PROJECT && (AS_CUR_PROJECT.export_path || AS_CUR_PROJECT.save_path);
				if (current_file) {
					this.content_vue.goTo(PathModule.dirname(current_file));
				} else if (!this.content_vue.path) {
					this.content_vue.goTo(electron.app.getPath('desktop'));
				}
				this.content_vue.selected.replace(current_file ? [current_file] : []);
				setTimeout(() => {
					this.object.classList.add('visible');
					resize_line.update();
				}, 1);
			},
			onCancel() {
				this.object.classList.remove('visible');
				setTimeout(() => resize_line.update(), 0);
			},
			onConfirm() {
				this.object.classList.remove('visible');
				setTimeout(() => resize_line.update(), 0);
			}
		})
		//deletables.push(explorer);

		sidebar_button = AS_INTERFACE.createElement('div', {class: 'tool sidebar_explorer_open_button', title: 'Open Explorer'}, AS.getIconNode('fas.fa-folder-open'));
		sidebar_button.addEventListener('click', event => {
			explorer.show();
		})
		let tab_bar = document.getElementById('tab_bar');
		tab_bar.prepend(sidebar_button);

		resize_line = new ResizeLine('sidebar_explorer', {
			condition() {
				return Dialog.open == explorer
			},
			get() {return explorer.content_vue.width},
			set(o, diff) {
				let calculated = Math.clamp(o + diff, 120, 500);
				explorer.content_vue.width = Math.snapToValues(calculated, [300], 16);
			},
			position() {
				this.setPosition({
					top: 0,
					bottom: 0,
					left: explorer.content_vue.width+2
				})
			}
		});
		AS_INTERFACE.page_wrapper.append(resize_line.node);
		resize_line.node.style.zIndex = 40;

		let action = new Action('open_explorer_sidebar', {
			name: 'Open Explorer Sidebar',
			icon: 'fas.fa-folder-open',
			click() {
				explorer.show();
			}
		})
		deletables.push(action);
	},
	onunload() {
		sidebar_button.remove();
		deletables.forEach(action => {
			action.delete();
		})
	}
});

})()
