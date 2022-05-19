<template>
	<div class="pricing__wrapper" id="pricings">
		<div class="pricing__inner">
			<div class="pricing__titles">
				<div class="pricing__title title--2">
					{{ pricing.titles.title }}
				</div>
				<div class="pricing__subtitle text" v-html="pricing.titles.subtitle">
				</div>
			</div>

			<div class="pricing">
				<div class="pricing__square" v-for="index in pricing.package.name.length" :key="index">
					<div class="pricing__square--name">
						{{ pricing.package.name[ index - 1 ] }}
					</div>
					<div class="pricing__square--price">
						{{ pricing.package.price[ index - 1 ] }}
					</div>
					<div class="pricing__square--presentation text">
						{{ pricing.package.presentation[ index - 1 ] }}
					</div>
					<div class="pricing__square--duration">
						{{ pricing.package.duration[ index - 1 ] }}
					</div>
					<div class="pricing__square--content">
						<ul class="pricing__square--items">
							<li class="pricing__square--item" v-for="z in pricing.package.content[ index - 1 ].length" :key="z">
								<Tick class="pricing__square--tick"/>
								{{ pricing.package.content[ index - 1 ][ z - 1 ] }}
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div class="pricing__options">
				<div class="pricing__options--titles">
					<div class="pricing__title title--3">
						{{ pricing.options.titles.title }}
					</div>
					<div class="pricing__subtitle text">
						{{ pricing.options.titles.subtitle }}
					</div>
				</div>

				<div class="pricing__options--content">
					<ul class="pricing__options--items">
						<li class="pricing__options--item" v-for="i in pricing.options.option.name.length" :key="i">
							<span>+</span>
							{{ pricing.options.option.name[ i - 1 ] }} : {{ pricing.options.option.price[ i - 1 ] }}
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import pricing from "../assets/json/pricing.json"
import Tick from "../assets/svg/tick.svg"
import $ from "cash-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin( ScrollTrigger );


export default {
	name:       "Pricing",
	components: {
		Tick
	},
	data() {
		return {
			pricing
		}
	},
	mounted() {
		this.$wrapper  = $( '.pricing__wrapper' )
		this.$text     = this.$wrapper;
		this.$textAnim = this.$wrapper.find( '.pricing__inner' );

		ScrollTrigger.saveStyles( this.$image );
		ScrollTrigger.matchMedia( {
			"(min-width: 961px)": () => {
				this.killTween( );
				this.pricingTween = gsap.from( this.$textAnim,
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
				this.killTween(  );
				this.pricingTween = gsap.set( this.$textAnim, { clearProps: "transform,opacity" } );
			}
		} );
	},
	methods: {
		killTween() {
			if ( !this.pricingTween ) {
				return;
			}

			this.pricingTween.kill();

			this.pricingTween = null;
		}
	}
}
</script>

<style scoped lang="scss">
.pricing__wrapper {
	color: $black;
	max-width: 800px;
	margin: 0 auto 90px auto;
}

.pricing__titles {
	margin-bottom: 45px;
}

.pricing__title {
	margin-bottom: 20px;
}

.pricing__subtitle {

}

.pricing {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	margin-bottom: 55px;
}

.pricing__square {
	width: 350px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	border: 3px solid $black;
	height: 470px;
	padding: 40px 26px;
	background-color: $white;
	z-index: 1;
	position: relative;

	$border-width: 3px;

	&::before, &::after {
		content: "";
		position: absolute;
		background-color: $gdn-pink;
		border-bottom: $border-width solid $black;
	}

	&::before {
		bottom: -16px;
		left: 16px;
		height: calc(10px + #{$border-width});
		width: 100%;
		border-left: $border-width solid $black;
	}

	&::after {
		top: 16px;
		right: -16px;
		width: calc(10px + #{$border-width});
		height: 100%;
		border-top: $border-width solid $black;
		border-right: $border-width solid $black;
	}
}

.pricing__square--name {
	font: 700 38px/40px $voyage;
	margin-bottom: 30px;
}

.pricing__square--price {
	margin-bottom: 20px;
	font-size: 38px;
	color: $gdn-pink;
	letter-spacing: 1px;
	font-weight: 500;
	text-align: center;
}

.pricing__square--presentation {
	width: 100%;
	line-height: 24px;
	text-align: center;
	margin-bottom: 20px;
}

.pricing__square--duration {
	font-size: 24px;
	//font-style: italic;
	margin-bottom: 15px;
	font-weight: 500;
}


.pricing__square--items, .pricing__options--items {
	padding: 0;
}

.pricing__square--item, .pricing__options--item {
	position: relative;
	padding-left: 40px;
	font-size: 20px;

	&:not(:last-of-type) {
		margin-bottom: 10px;
	}
}

.pricing__square--tick {
	position: absolute;
	left: 0;
	top: calc(50% - 1px);
	transform: translate3d(0, -50%, 0);
	width: 24px;
	height: 24px;
	color: $gdn-pink;
}

.pricing__options--titles {
	margin-bottom: 30px;
}

.pricing__options--item {
	padding: 0;

	span {
		font-size: 25px;
		font-weight: 700;
		color: $gdn-pink;
		margin-right: 12px;
	}
}

@media (max-width: $mobileMax) {
	.pricing__wrapper {
		max-width: 88%;
	}

	.pricing {
		flex-direction: column;
		row-gap: 55px;
	}

	.pricing__square {
		width: 100%;
		padding: 35px 22px;
	}
}


</style>
