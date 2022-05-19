<template>
	<div class="about__wrapper" id="about">
		<div class="about">
			<div class="about--content__wrapper">
				<div class="about--content">
					<div class="about--title title--3">
						{{ about.title }}
					</div>
					<div class="about__text text">
						{{ about.text }}
					</div>
				</div>
			</div>
			<div class="about--img">
				<img :src=" '/assets/img/' + about.img" alt="">
			</div>

		</div>
	</div>
</template>

<script>
import about from "../assets/json/about.json"
import $ from 'cash-dom';

import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin( ScrollTrigger )

export default {
	name: "About",
	data() {
		return {
			about
		}
	},
	mounted() {
		this.$wrapper        = $( '.about__wrapper' )
		this.$textImageInner = this.$wrapper.find( '.about' );
		this.$image          = this.$wrapper.find( '.about--img' );
		this.$text           = this.$wrapper.find( '.about--content__wrapper' );
		this.$textAnim       = this.$wrapper.find( '.about--content' );


		ScrollTrigger.saveStyles( this.$image );
		ScrollTrigger.matchMedia( {
			"(min-width: 961px)": () => {
				this.killTween();
				this.text = gsap.from( [ this.$textAnim, this.$image ],
					{
						scrollTrigger: {
							trigger:       this.$textImageInner,
							start:         'top bottom',
							toggleActions: 'restart none none none',
							// markers:       true
						},
						lazy: false,
						y:             200,
						opacity:       0,
						duration:      1.5,
						ease:          'power2.out'

					}
				);
			},
			"(max-width: 960px)": () => {
				this.killTween();
				this.text = gsap.set( this.$textAnim, { clearProps: "transform,opacity" } );
			}
		} );
	},
	methods: {
		killTween( ) {
			if ( !this.text ) {
				console.log("not defined")
				return;
			}

			this.text.kill();

			this.text = null;
		}
	},
	destroyed() {
	}
}
</script>

<style scoped lang="scss">
.about__wrapper {
	color: $black;
	max-width: 1100px;
	margin: 100px auto 150px auto;
}

.about {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: fit-content;
	width: -moz-fit-content;
	column-gap: 40px;
}

.about--content__wrapper {
	max-width: calc(50% - 40px);
}

.about--content {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	row-gap: 20px;
	width: 100%;
}

.about--title {

}

.about--img {
	max-width: calc(50% - 40px);
	position: relative;

	img {
		width: 100%;
	}
}

@media (max-width: $mobileMax) {
	.about__wrapper {
		margin: 70px auto 130px auto;
	}

	.about {
		flex-direction: column;
		row-gap: 30px;
	}

	.about--content__wrapper {

	}

	.about--content__wrapper, .about--img {
		max-width: 100%;
		padding: 0px 15px;
	}
}

</style>
