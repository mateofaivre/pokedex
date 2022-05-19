<template>
	<div class="logo__wrapper">
		<h1 class="header__logo">
			<a class="header__logo_link" href="#" @click="stateMenu">
				<span class="logo">Gordon<span class="logo--bottom">Wedding Films</span></span>
			</a>
		</h1>
	</div>
</template>

<script>


export default {
	name:       "Logo",
	components: {},
	methods: {
		stateMenu() {
			let inputMenu = document.querySelector( '#header_mobile_switch' )

			if ( inputMenu.checked != false ) {
				inputMenu.checked = false
			}
		}
	}
}
</script>

<style scoped lang="scss">
#header {
	.header__logo {
		display: flex;
		align-items: center;
		margin-left: 200px;
		margin-right: auto;
		height: 100%;
		transition: transform .3s $transitionEase;

		.header__logo_link {
			width: 100%;
			transition: color 300ms $transitionEase;
			color: inherit;
			text-decoration: none;

			@media (min-width: $mobileMin) {
				&:hover {
					color: $black;
				}
			}

			.logo--bottom {
				transition: opacity .3s $transitionEase;
			}

		}

		@media (max-width: $mediumMax) {
			margin-left: 40px;
		}
	}

	&.sticky {
		.header__logo {
			transform: scale(0.68) translateY(5px);

			.header__logo_link {
				@media (min-width: $mobileMin) {
					&:hover {
						color: $gdn-pink;
					}
				}


				.logo--bottom {
					opacity: 0;
				}
			}
		}
	}
}

#header_mobile_toolbar {
	.header__logo {
		display: flex;
		align-items: center;
		margin-left: 20px;
		margin-right: auto;
		height: 100%;

		.header__logo_link {
			width: 100%;
			height: 40px;
			color: inherit;
			transition: color 300ms $transitionEase;
			text-decoration: none;

			.logo {
				font-size: 30px !important;
				line-height: 35px !important;
			}

			.logo--bottom {
				display: none;
			}

			@media (min-width: $mobileMin) {
				&:hover {
					color: $highlight;
				}
			}
		}
	}
}

</style>
