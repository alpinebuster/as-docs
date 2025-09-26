<template>
	<div>
		<div class="content">
			
			<h1>Donate</h1>

			<p>If you want to support AS development and help pay the running cost of the servers, feel free to use the Donate button.
				Include your Chat user name in the donation message to receive a Donator role on the AS Chat Server.</p>

			<div>
				<form target="_blank" action="https://pay.ai-stomatology.tech/c/webscr" method="post" class="form-group">
					<input type="hidden" name="cmd" value="_donations">
					<input type="hidden" name="business" value="alpinebuster@ai-stomatology.tech">
					<input type="hidden" name="item_name" value="AS">
					<input type="hidden" name="item_number" value="as">
					<input type="hidden" name="currency_code" value="USD">
					<input type="hidden" name="amount" id="amount_36a6697fe5eebfeabc64f9e70fb8921e" value="">
					<input type="hidden" name="no_note" value="0">
					<input type="hidden" name="no_shipping" value="1">
					<input type="hidden" name="lc" value="EN_US">
					<input type="hidden" name="bn" value="WPPlugin_SP">
					<input type="hidden" name="return" value="">
					<input type="hidden" name="cancel_return" value="">
					<input class="wpedon_paybuttonimage" type="image" src="https://pay.ai-stomatology.tech/en_US/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="Make your payments. It is free, secure, effective." style="border: none;">
					<img alt="" border="0" style="border:none;display:none;" src="https://pay.ai-stomatology.tech/EN_US/i/pixel.gif" width="1" height="1">
				</form>
			</div>

		</div>
	</div>
</template>

<script>
export default {
	head () {
		return {
			title: 'Donate - AS',
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: 'Donate to AS'
				}
			]
		}
	}
}
</script>
