<template>
	<div>
		<content class="content">
			<h1>Quickstart</h1>

			<div class="quickstart_page">
				<template v-if="page == 'generic'">
					<h4 class="suggestion">The following format was suggested for you:</h4>
					<h2>Generic Model</h2>
					<p>This format can be used to create custom models for the use in game engines and custom games, to port into other software, render, or just for showcase. It supports all the things you need, like meshes, texture editing, and animations.</p>

					<h3>Quick Info</h3>
					<ul>
						<li>Help Forum: <a href="https://chat.alpinebuster.top/Bswa9MJ8v3" class="channel">#help-mesh</a></li>
						<li>Models can be made with custom meshes or with cubes.</li>
						<li>Models can be exported as .obj, dae (Collada), FBX, or .glTF</li>
					</ul>

					<h3>Tutorials</h3>
					<ul>
						<li><a target="_blank" rel="noopener" href="https://v.ai-stomatology.tech/watch?v=Wc8BM">Mesh Modeling Tutorial</a></li>
						<li><a target="_blank" rel="noopener" href="https://v.ai-stomatology.tech/watch?v=U9FLteA8kHcPUGpxIS26uJR">AS Tutorials</a></li>
					</ul>
				</template>

				<template v-if="page == 'q_game'">
					<p>This Website will guide you to the correct AS format for your model as well as important information, tutorials and resources!</p>
					<p></p>
					<h2>Platform</h2>
					<p>Which target platform do you want to create a model for?</p>

					<div class="answer" @click="loadPage('generic')">Game Engine (Godot, Unity, Unreal Engine etc.)</div>
					<div class="answer" @click="loadPage('generic')">For rendering / Just for fun</div>
				</template>
			</div>

			<button @click="backPage()" v-if="page != 'q_game'">Back</button>

		</content>
	</div>
</template>

<script>
const default_page = 'q_game';

export default {
	data() {return {
		page: default_page,
		history: [],
	}},
	methods: {
		loadPage(page) {
			this.history.push(this.page);
			this.page = page;
		},
		backPage() {
			let page = this.history.pop() || default_page;
			this.page = page;
		}
	},
	head() {
		return {
			title: `Quickstart - AS`,
			meta: [
				{ hid: 'description', name: 'description', content: 'This Website will guide you to the correct AS format for your model as well as important information, tutorials and resources!' },
				// Open Graph
				{ hid: 'og:title', property: 'og:title', content: `Quickstart - AS` },
				{ hid: 'og:description', property: 'og:description', content: 'This Website will guide you to the correct AS format for your model as well as important information, tutorials and resources!' },
				// Twitter Card
				{ hid: 'twitter:title', name: 'twitter:title', content: `Quickstart - AS` },
				{ hid: 'twitter:description', name: 'twitter:description', content: 'This Website will guide you to the correct AS format for your model as well as important information, tutorials and resources!' }
			]
		}
	}
}
</script>

<style scoped>
		p {
			margin: 16px 0;
		}
		h3 {
			margin-top: 16px;
			margin-bottom: 4px;
		}
		li {
			margin-left: 25px;
		}
		.quickstart_page {
			margin-top: 20px;
			margin-bottom: 20px;
		}
		.answer {
			padding: 10px 20px 10px 20px;
			font-size: 1.16em;
			cursor: pointer;
		}
		.answer::before{
			content: "❯";
			display: inline-block;
			width: 20px;
		}
		.answer:hover {
			background-color: var(--accent);
			color: var(--dark-hover)
		}
		a.channel {
			color: #3e90ff;
			font-weight: 600;
		}
		.suggestion {
			margin-bottom: 28px;
			color: var(--dark-text);
			background-color: var(--dark-ui);
			font-weight: 300;
			margin: 15px -20px;
			padding: 20px;
		}
</style>