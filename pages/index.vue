<template>
	<div>
		<section class="download">
			<content class="content">
				<img id="main_logo" src="~assets/as_logo_text_white.svg" alt="AS" height="128px" />

				<h3>{{ $t('main_desc') }}</h3>

				<div class="buttons">
					<button><a href="/downloads">{{ $t('download') }}</a></button>
					<button class="webapp"><a href="https://as.alpinebuster.top" target="_blank" rel="noopener">{{ $t('open_web_app') }}</a></button>
				</div>

				<img id="front_page_app" src="~assets/front_page_app.png" alt="AS Interface" />
			</content>
		</section>
		
		<section class="features">
			<content class="content split">
				<div class="text_body">
					<h3>Mesh Modeling</h3>
					<p>AS puts all the tools at your disposal to make the creation process of models as easy as possible.</p>
					<p>Use cuboids to get that aesthetic, or create complex shapes using the mesh modeling tools!</p>
				</div>
				<div>
					<img src="~assets/features/flower_pot.png" alt="Modeling Illustration" />
				</div>
			</content>

			<content class="content split">
				<div class="text_body">
					<h3>Texturing Tools</h3>
					<p>Create, edit and paint texture right inside the program. Create or import palettes, paint, or draw shapes.</p>
					<p>AS can automatically create a UV map and template for your model so that you can start painting right away.</p>
					<p>You can paint directly on the model in 3D space, use the 2D texture editor, or connect your favorite external image editor or pixel art software.</p>
				</div>
				<div>
					<img src="~assets/features/texturing.png" alt="Texturing Illustration" />
				</div>
			</content>

			<content class="content split">
				<div class="text_body">
					<h3>Animations</h3>
					<p>AS comes with a powerful animation editor. Rig your model, then use position, rotation and scale keyframes to bring it to life. Use the graph editor to fine-tune your creation.</p>
					<p><a target="_blank" rel="noopener" href="https://ai-stomatology.tech/collections/as-animations">View AS animations...</a></p>
				</div>
				<div>
					<img src="~assets/features/animation.png" alt="Animation Illustration" />
				</div>
			</content>

			<content class="content split">
				<div class="text_body">
					<h3>Plugins</h3>
					<p>Customize AS with the built-in plugin store.</p>
					<p>Plugins extend the functionality of AS beyond what it's already capable of. They add new tools, support for new export formats, or model generators.</p>
					<p>You can also create your own plugin to extend AS or to support your own format.</p>
					<p><nuxt-link to="/plugins">Browse AS plugins...</nuxt-link></p>
				</div>
				<div>
					<img src="~assets/features/plugins.png" alt="Plugin Illustration" />
				</div>
			</content>

			<content class="content split">
				<div class="text_body">
					<h3>Free</h3>
					<p>AS is free to use for any type of project, forever, no strings attached.</p>
					<p>The project is under the GPL license.</p>
				</div>
				<div>
					<img src="~assets/features/open_source.png" alt="Free Illustration" />
				</div>
			</content>
		</section>

		<section class="users">
			<content class="content">
				<h2>Who's using AS</h2>
				<div id="as_user_list">
					<a href="https://alpinebuster.top/" target="_blank" rel="noopener">
						<img class="logo_light_mode" src="~assets/companies/hxkq_horizontal_bg.png" alt="HXKQ Logo">
						<img class="logo_dark_mode" src="~assets/companies/hxkq_horizontal_logo.png" alt="HXKQ Logo">
						HXKQ
					</a>
					<p>...and many more!</p>
				</div>
			</content>
		</section>
	</div>
</template>

<script>

export default {
	data() {return {
		sketchfab_cookies_accepted: true
	}},
	methods: {
		acceptSketchfabCookies() {
			this.sketchfab_cookies_accepted = true;
			localStorage.setItem('sketchfab-cookies-accepted', true);
		}
	},
	beforeMount() {
		this.sketchfab_cookies_accepted = localStorage.getItem('sketchfab-cookies-accepted') == 'true';

		document.body.style.setProperty('--scroll', 0);
		window.addEventListener('scroll', () => {
			document.body.style.setProperty('--scroll', window.pageYOffset / window.innerHeight);
		}, false);
	},
	
}
</script>

<style scoped>

	.content {
		padding: 0px;
		width: min(var(--max-page-width), 100%);
		background-color: transparent;
	}
	section {
		padding: 64px 0;
	}
	@media only screen and (max-width: 600px) {
		.content {
			padding: 12px 0;
		}
	}

	section.download {
		background-color: var(--dark-background);
		background-image: url('~assets/background.jpg');
		background-size: cover;
		color: white;
		text-align: center;
		padding-top: 100px;
	}
	section.download .content {
		perspective: 1000px;
	}
	section.download h3 {
		font-weight: 300;
	}
	section.download .buttons {
		text-align: center;
		padding: 20px;
	}
	#main_logo {
		max-width: 100%;
	}
	#front_page_app {
		width: min(100%, 1000px);
		max-width: 100%;
		box-shadow: 0 2px 20px #000000bb;
		transform: rotateX(max(calc(10deg - 60deg * var(--scroll)), -20deg));
		margin-bottom: -120px;
		transition: transform 800ms ease;
	}
	#front_page_app:hover {
		transform: translateY(-3px);
	}
	section.download button {
		padding: 0;
	}
	section.download button a {
		padding: 20px 36px;
		display: block;
	}
	section.download button {
		transition: padding 150ms ease-in-out;
	}
	section.download button:hover {
		padding-right: 7px;
		padding-left: 7px;
	}
	section.download button.webapp {
		background-color: transparent;
		border: 2px solid var(--dark-text);
	}
	section.download button.webapp:hover {
		padding-right: 2px;
		padding-left: 2px;
	}
	section.download button.webapp a {
		padding: 17.5px 25.5px;
	}
	button a {
		text-decoration: none;
		color: inherit;
	}
	button a:hover {
		text-decoration: none;
	}



	section.showcase {
		padding-top: 100px;
		background-color: var(--dark-background);;
		color: var(--dark-text);
	}
	#sketchfab_viewer {
		width: 100%;
		height: min(75vh, 640px);
		box-shadow: 0 0 8px #00000070;
	}
	div#sketchfab_viewer {
		text-align: center;
		padding-top: 20vh;
		background-image: url('~assets/sketchfab.png');
		background-repeat: no-repeat;
		background-position: center;
	}

	section.users {
		background-color: var(--light-background);
		text-align: center;
	}
	#as_user_list > a {
		display: inline-block;
		height: 110px;
		min-width: 220px;
		margin: 8px;
		padding: 16px;
		text-align: center;
		color: var(--light-subtle);
		transition: background-color 300ms ease, transform 300ms ease;
	}
	#as_user_list {
		text-align: center;
	}
	#as_user_list > a:hover {
		background-color: var(--light-ui);
		transform: translateY(-3px);
	}
	#as_user_list > a > img {
		height: 60px;
		display: block;
		margin: auto;
		margin-bottom: 4px;
	}

	.dark-mode #as_user_list .oreville_studios img {
		filter: invert(1);
	}
	html:not(.dark-mode) #as_user_list img.logo_dark_mode {
		display: none;
	}
	html.dark-mode #as_user_list img.logo_light_mode {
		display: none;
	}


	section.features {
		background-color: var(--light-ui);
		box-shadow: 0 0 20px #080b0d14;
	}
	.content.split {
		display: flex;
		padding: 0;
		border-bottom: 1px solid var(--light-border);
		min-height: 360px;
	}
	.content.split:nth-child(even) {
		flex-direction: row-reverse;
	}
	.content.split > * {
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 50%;
	}
	.content.split > * > img {
		max-width: 100%;
		max-height: 100%;
		display: block;
		margin: auto;
		max-height: 360px;
	}
	.text_body {
		padding: 20px 32px;
	}
	section.features p {
		font-size: 1.1em;
		color: var(--light-subtle);
	}
	@media only screen and (max-width: 600px) {
		.content.split {
			flex-direction: column !important;
		}
	}

</style>
