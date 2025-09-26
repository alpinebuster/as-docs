(function() {
let deletables = [];
let old_animate;
let rightMouseDown = false;

ASPlugin.register('wasd_controls', {
	title: 'WASD Controls',
	icon: 'sports_esports',
	author: 'alpinebuster',
	description: 'Adds a WASD controlled viewport navigation mode',
	about: 'The WASD mode can be enabled from the View menu.\nThe keys can be remapped in the keybindings menu.\nThe sensitivity can be changed in the settings under Preview, along with the movement plane.\nHold Control to move faster.',
	version: '1.2.0',
	min_version: '1.5.2',
	variant: 'both',
	onload() {
		let navigate_forward = new KeybindingItem('navigate_forward', {
			name: 'Move Forward',
			icon: 'arrow_upward',
			category: 'navigate',
			keybinding: new Keybinding({key: 'w', ctrl: null})
		});
		let navigate_backward = new KeybindingItem('navigate_backward', {
			name: 'Move Backward',
			icon: 'arrow_downward',
			category: 'navigate',
			keybinding: new Keybinding({key: 's', ctrl: null})
		});
		let navigate_left = new KeybindingItem('navigate_left', {
			name: 'Move Left',
			icon: 'arrow_back',
			category: 'navigate',
			keybinding: new Keybinding({key: 'a', ctrl: null})
		});
		let navigate_right = new KeybindingItem('navigate_right', {
			name: 'Move Right',
			icon: 'arrow_forward',
			category: 'navigate',
			keybinding: new Keybinding({key: 'd', ctrl: null})
		});
		let navigate_down = new KeybindingItem('navigate_down', {
			name: 'Move Down',
			icon: 'expand_more',
			category: 'navigate',
			keybinding: new Keybinding({key: 16, ctrl: null})
		});
		let navigate_up = new KeybindingItem('navigate_up', {
			name: 'Move Up',
			icon: 'expand_less',
			category: 'navigate',
			keybinding: new Keybinding({key: 32, ctrl: null})
		});

		let navigate_faster = new KeybindingItem('navigate_faster', {
			name: 'Move Faster',
			icon: 'expand_less',
			category: 'navigate',
			keybinding: new Keybinding({key: 17, ctrl: null})
		});
		let navigate_slower = new KeybindingItem('navigate_slower', {
			name: 'Move Slower',
			icon: 'expand_less',
			category: 'navigate',
			keybinding: new Keybinding({key: 18, ctrl: null})
		});


		let navigation_keybinds = [navigate_forward, navigate_backward, navigate_left, navigate_right, navigate_down, navigate_up, navigate_faster, navigate_slower];
		deletables.push(...navigation_keybinds);

		function setupWASDMovement(preview, length = 1) {
			let pos = new THREE.Vector3().copy(preview.camera.position);
			pos.add(preview.camera.getWorldDirection(new THREE.Vector3()).normalize().multiplyScalar(length));
			preview.controls.target.copy(pos);
		}

		deletables.push(new Setting('wasd_enabled', {
			name: 'WASD Controls: Enabled',
			description: '_',
			category: 'preview',
			value: false,
			onChange(value) {
				AS_BAR_ITEMS.wasd_movement.value = value
				AS_BAR_ITEMS.wasd_movement.updateEnabledState();
				setupWASDMovement(Preview.selected, value ? 1 : 16);
			}
		}));

		let wasd_toggle = new Toggle('wasd_movement', {
			name: 'WASD Movement',
			icon: 'sports_esports',
			category: 'navigate',
			value: false,
			onChange(value) {
				AS_SETTINGS.wasd_enabled.value = value
				Settings.saveLocalStorages();
				setupWASDMovement(Preview.selected, value ? 1 : 16);
			}
		});

		deletables.push(wasd_toggle);
		MenuBar.menus.view.addAction('_');
		MenuBar.menus.view.addAction(wasd_toggle);
		AS_BAR_ITEMS.wasd_movement.value = AS_SETTINGS.wasd_enabled.value
		AS_BAR_ITEMS.wasd_movement.updateEnabledState();
		
		function isWASDMovementEnabled() {
			if (AS_SETTINGS.wasd_requires_hold_right_mouse.value) {
				return Preview.selected && AS_BAR_ITEMS.wasd_movement && AS_BAR_ITEMS.wasd_movement.value && rightMouseDown;
			} else {
				return Preview.selected && AS_BAR_ITEMS.wasd_movement && AS_BAR_ITEMS.wasd_movement.value
			}
		}

		deletables.push(new Setting('base_speed', {
			name: 'WASD Controls: Base Speed',
			description: '-', 
			category: 'preview',
			type: 'number',
			value: 50,
			min: 1
		}));

		deletables.push(new Setting('move_faster_mult', {
			name: 'WASD Controls: Move Faster Multiplier',
			description: '-', 
			category: 'preview',
			type: 'number',
			value: 2,
			max: 10,
			min: 1
		}));

		deletables.push(new Setting('move_slower_mult', {
			name: 'WASD Controls: Move Slower Multiplier',
			description: '-', 
			category: 'preview',
			type: 'number',
			value: 0.5,
			max: 1,
			min: 0.1
		}));

		deletables.push(new Setting('wasd_y_level', {
			name: 'WASD Controls: Navigate at Y Level',
			description: 'Navigate using WASD at consistent Y level rather than on camera plane',
			category: 'preview',
			value: true
		}));

		deletables.push(new Setting('wasd_requires_hold_right_mouse', {
			name: 'WASD Controls: Navigation only works when holding the right mouse button',
			description: 'The WASD Controls needs to be enabled for this to work.',
			category: 'preview',
			value: false
		}));

		let pressed_keys = [];
		AS.on('press_key', data => {
			let key = data.event.which;
			if (navigation_keybinds.find(k => k.keybinding.key == key) && !getFocusedTextInput()) {
				pressed_keys.safePush(key);
				if (isWASDMovementEnabled()) {
					data.capture();
				}
			}
		});

		document.addEventListener('keyup', event => {
			pressed_keys.remove(event.which);
		});

		document.addEventListener('mousedown', event => {
			if (event.button === 2) { // Right mouse button
				rightMouseDown = true;
			}
		});

		document.addEventListener('mouseup', event => {
			if (event.button === 2) { // Right mouse button
				rightMouseDown = false;
			}
		});

		function doWASDMovement() {
			let movement = new THREE.Vector3(0, 0, 0);

			let uses_wasd_movement = false;
			function add(x, y, z) {
				movement.x += x;
				movement.y += y;
				movement.z += z;
				uses_wasd_movement = true;
			}

			if (pressed_keys.includes(navigate_forward.keybinding.key)) add(0, 0, -1);
			if (pressed_keys.includes(navigate_backward.keybinding.key)) add(0, 0, 1);
			if (pressed_keys.includes(navigate_left.keybinding.key)) add(-1, 0, 0);
			if (pressed_keys.includes(navigate_right.keybinding.key)) add(1, 0, 0);
			if (pressed_keys.includes(navigate_down.keybinding.key)) add(0, -1, 0);
			if (pressed_keys.includes(navigate_up.keybinding.key)) add(0, 1, 0);
			
			
			if (uses_wasd_movement) {
				setupWASDMovement(Preview.selected);
				
				let speedMultiplier = 1.0; // Default speed
				
				if (pressed_keys.includes(navigate_faster.keybinding.key)) speedMultiplier *= AS_SETTINGS.move_faster_mult.value;
				else if (pressed_keys.includes(navigate_slower.keybinding.key)) speedMultiplier *= AS_SETTINGS.move_slower_mult.value;

				if (AS_SETTINGS.wasd_y_level.value) {
					let vec = Preview.selected.controls.object.getWorldDirection(new THREE.Vector3()).normalize();
					let angle = Math.atan2(-vec.x, -vec.z);
					movement.applyAxisAngle(THREE.NormalY, angle);
				} else {
					movement.applyEuler(Preview.selected.controls.object.rotation);
				}

				movement.multiplyScalar(Settings.get('base_speed') * speedMultiplier / 100);
				Preview.selected.camera.position.add(movement);
				Preview.selected.controls.target.add(movement);
			}
		}

		old_animate = window.animate;
		window.animate = function(...args) {
			old_animate(...args);

			if (isWASDMovementEnabled() && pressed_keys.length) {
				doWASDMovement();
			}

			// Ensure zoom is disabled when moving
			Preview.all.forEach(preview => {
				preview.controls.enableZoom = !isWASDMovementEnabled();
			});
		};
	},
	oninstall() {
		MenuBar.menus.view.highlight(AS_BAR_ITEMS.wasd_movement);
	},
	onunload() {
		deletables.forEach(action => {
			action.delete();
		});
		setupWASDMovement(Preview.selected, 16);
		Preview.all.forEach(preview => {
			preview.controls.enableZoom = true;
		});
		window.animate = old_animate;
	}
});
})();
