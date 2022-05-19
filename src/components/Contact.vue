<template>
	<div class="contact__wrapper" id="contact">
		<div class="contact__inner">
			<div class="contact__title title--2">
				Discutons de votre projet
			</div>
			<div class="contact">
				<a href="mailto:bonjour@gordon.com" target="_blank" class="contact__link">bonjour@gordon.com</a>
			</div>
		</div>
	</div>
</template>

<script>
import $ from "cash-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger"


gsap.registerPlugin( ScrollTrigger );

export default {
	name: "Contact",
	mounted() {
		this.$wrapper  = $( '.contact__wrapper' )
		this.$text     = this.$wrapper;
		this.$textAnim = this.$wrapper.find( '.contact__inner' );

		ScrollTrigger.saveStyles( this.$image );
		ScrollTrigger.matchMedia( {
			"(min-width: 961px)": () => {
				this.killTween();
				this.contactTween = gsap.from( this.$textAnim,
					{
						scrollTrigger: {
							trigger:       this.$text,
							start:         'top bottom',
							toggleActions: 'restart none none none'
							// markers: 		true
						},
						lazy:          false,
						y:             200,
						opacity:       0,
						duration:      1.5,
						ease:          'power2.out'
					}
				);
			},
			"(max-width: 960px)": () => {
				this.killTween();
				this.contactTween = gsap.set( this.$textAnim, { clearProps: "transform,opacity" } );
			}
		} );
	},
	methods: {
		killTween() {
			if ( !this.contactTween ) {
				return;
			}

			this.contactTween.kill();

			this.contactTween = null;
		}
	}
}
</script>

<style scoped lang="scss">
.contact__wrapper {
	width: 100%;
	margin-bottom: 150px;
	padding: 0px 0px 30px 0px;
	overflow: hidden;
}

.contact__title {
	color: $black;
	width: fit-content;
	width: -moz-fit-content;
	width: 1080px;
	margin: 0 auto 50px auto;
	text-align: left;
}

.contact {
	max-width: 1080px;
	padding: 100px 0px;
	margin: 0 auto;
	position: relative;
	border: 3px solid $black;
	background-color: $white;
	z-index: 1;
	display: flex;
	justify-content: center;
	align-items: center;

	$border-width: 3px;

	&::before, &::after {
		content: "";
		position: absolute;
		border-bottom: $border-width solid $gdn-pink;
		border-bottom: $border-width solid $gdn-pink;
	}

	&::before {
		bottom: -16px;
		left: 16px;
		height: calc(10px + #{$border-width});
		width: 100%;
		border-left: $border-width solid $gdn-pink;
	}

	&::after {
		top: 16px;
		right: -16px;
		width: calc(10px + #{$border-width});
		height: 100%;
		border-top: $border-width solid $gdn-pink;
		border-right: $border-width solid $gdn-pink;
	}

	.contact__link {
		color: $gdn-pink;
		text-decoration: none;
		text-align: center;
		width: fit-content;
		width: -moz-fit-content;
		margin: 0 auto;
		font: 700 50px/60px $voyage;
		transition: color .3s $transitionEase;

		@media (min-width: $mobileMin) {
			&:hover {
				color: $white;

				&::before {
					opacity: 1;
					transform: translateY(0);
				}

				&::after {
					background-color: $gdn-pink;
				}
			}
		}


		&::after {
			content: "";
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
			transition: background-color .3s $transitionEase, opacity .3s $transitionEase;
		}

		//&::before {
		//	content: "";
		//	position: absolute;
		//	inset: 0;
		//	width: 100%;
		//	height: 100%;
		//	background-color: $gdn-pink;
		//	opacity: 0;
		//	z-index: -1;
		//	transform: translateY(calc(-100%));
		//	transition: transform .3s $transitionEase, opacity .3s $transitionEase;
		//}
	}
}

@media (max-width: $mobileMax) {
	.contact__wrapper {
		padding-left: 15px;
		padding-right: 15px;
		margin-bottom: 100px;
	}

	.contact__title {
		width: 100%;
	}

	.contact {
		padding: 26px 0px;
		max-width: 90%;

		.contact__link {
			font-size: 25px;
			line-height: 35px;
		}
	}


}


</style>
