<template>
	<div>
		<div class="content">
			
			<h1>Gallery</h1>

			<p>This page lists some of the splash creations in AS history.</p>

			<h4>Filter by Tag</h4>
			<ul id="filter_list">
				<li :class="{selected: filter == ''}" @click="filter = '';">All</li>
				<li :class="{selected: filter == 'splashart'}" @click="filter = 'splashart';">Splash Art</li>
				<li :class="{selected: filter == 'mesh'}" @click="filter = 'mesh';">Mesh</li>
				<li :class="{selected: filter == 'vehicle'}" @click="filter = 'vehicle';">Vehicle</li>
				<li :class="{selected: filter == 'scifi'}" @click="filter = 'scifi';">Sci-Fi</li>
			</ul>

			<section v-if="showImage(['splashart', 'scifi', 'mesh'])">
				<img loading="lazy" src="~assets/gallery/5.0.webp" alt="Splash Art" />
				<h2>Splash Art</h2>
				<label>By <a target="_blank" rel="noopener" href="https://github.com/alpinebuster">alpinebuster</a> &amp; <a target="_blank" rel="noopener" href="https://v.ai-stomatology.tech/@%9D_11">AS</a>, September 2025</label>
				<p>Splash Art competed for 4 slots on the splash screen. Initially in third place, this render of a giant mech being assembled in a neon-lit factory building managed!</p>
			</section>
		</div>
	</div>
</template>

<script>


export default {
	head () {
		return {
			title: 'Gallery - AS',
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: 'AS Gallery and Hall of Fame'
				},
				{ hid: 'og:image', name: 'og:image', property: 'og:image', content: 'https://www.ai-stomatology.tech/images/gallery.png' },
			]
		}
	},
	data() {return {
		filter: ''
	}},
	methods: {
		showImage(tags = []) {
			return !this.filter || tags.includes(this.filter);
		}
	}
}
</script>


<style scoped>

	.content {
		--max-content-width: 1280px;
	}
	#filter_list {
		display: flex;
		list-style: none;
		padding: 0;
		gap: 12px;
	}
	#filter_list li {
		background-color: var(--light-background);
		padding: 10px 20px;
		cursor: pointer;
	}
	#filter_list li:hover {
		background-color: var(--accent);
		color: white;
	}
	#filter_list li.selected {
		background-color: var(--accent);
		color: white;
	}
	section {
		margin-top: 30px;
		margin-bottom: 50px;
		padding: 24px;
		padding-top: 0;
		background-color: var(--light-background);
	}
	img {
		width: calc(100% + 48px);
		margin-right: -24px;
		margin-left: -24px;
	}
	label {
		color: var(--light-subtle);
		margin-bottom: 12px;
		display: block;
	}
</style>
