<template>
	<div>
		<content class="content">
			
			<h1>About</h1>

			<h2>AI Stomatology (AS)</h2>
			<p>{{ $t('main_desc') }} To make tooth modeling easy and accessible for dentists.</p>

			<h2>Contributors</h2>
			<p>The illustrations on this website were contributed by 
				<a href="https://github.com/alpinebuster" target="_blank" rel="noopener">alpinebuster</a>.
			</p>

			<h2>Contact Development Team</h2>
			<p>For help with AS, please use the help channels on the AS Chat Server.</p>
			<p><a target="_blank" rel="noopener" href="https://chat.alpinebuster.top/as">Chat Server</a></p>
		</content>
	</div>
</template>

<script>
export default {
	head () {
		return {
			meta: [
				{ hid: 'robots', name: 'robots', content: 'noindex' }
			]
		}
	}
}
</script>
