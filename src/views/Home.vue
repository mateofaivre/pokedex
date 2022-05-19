<template>
	<div>
		<IntroSlider/>
		<About/>
		<Realizations/>
		<Pricing/>
		<Contact/>
		<Footer/>
	</div>
</template>

<script>
import IntroSlider from "../components/IntroSlider.vue";
import Contact from "../components/Contact.vue";
import About from "../components/About.vue";
import Pricing from "../components/Pricing";
import Realizations from "../components/Realizations";
import Footer from "../components/Footer";


export default {
	name: 'Home',
	data() {
		return {}
	},
	components: {
		Footer,
		Realizations,
		Pricing,
		IntroSlider, Contact, About
	},
	computed:   {},
	mounted() {

	},
	methods: {}
}
</script>

<style lang="scss" scoped>


</style>
