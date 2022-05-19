<template>
	<div class="header__wrapper">
		<!-- Header -->
		<header id="header">
			<Logo/>
			<Menu/>
		</header>
		<input type="checkbox" id="header_mobile_switch">
		<nav id="header_mobile_toolbar">
			<Logo/>
			<Mobile/>
		</nav>
		<header id="header_mobile">
			<div class="header_mobile-inner">
				<Menu/>
			</div>
		</header>
	</div>
</template>

<script>
import Logo from "./Logo"
import Menu from "./Menu"
import Mobile from "./Mobile"


export default {
	name:       "Header",
	components: {
		Logo, Menu, Mobile
	},
	data() {
		return {}
	},
	created() {
		window.addEventListener( "scroll", this._checkSticky );
	},
	mounted() {

	},
	destroyed() {
		window.removeEventListener( "scroll", this._checkSticky );
	},
	methods: {
		_checkSticky() {
			let header = document.querySelector( "#header" );

			// Get the offset position of the navbar
			let sticky = header.offsetTop + 100;

			if ( window.pageYOffset > sticky ) {
				header.classList.add( "sticky" );
			} else {
				header.classList.remove( "sticky" );
			}
		}
	}
}
</script>

<style lang="scss">
#header {
	& {
		color: $white;
		display: flex;
		margin: auto;
		position: fixed;
		top: 50px;
		right: 50px;
		bottom: auto;
		left: 50px;
		z-index: 100;
		width: auto;
		height: 110px;
		transition: transform 300ms $transitionEase, height 300ms $transitionEase;

		&:after {
			background-color: $white;
			content: "";
			display: block;
			margin: auto;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			z-index: -1;
			height: 100%;
			transform-origin: top left;
			transform: scaleY(0);
			box-shadow: rgba(0, 0, 0, 0.1) 0px 25px 20px -20px;
			transition: transform 300ms $transitionEase, left 300ms $transitionEase, right 300ms $transitionEase;
		}

		//&.front-page:not(.sticky) {
		//	&:after {
		//		transform: scaleY(0);
		//	}
		//}

		&.sticky {
			color: $black;
			height: 90px;
			transform: translateY(-50px);

			&:after {
				transform: scaleY(1);
				left: -50px;
				right: -50px;
			}
		}
	}

	@media (max-width: $mobileMax) {
		display: none;
	}

}

#header_mobile {
	& {
		color: $black;
		background-color: $white;
		overflow: hidden;
		overscroll-behavior: contain;
		overflow-y: scroll;
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 100;
		transition: transform 300ms $transitionEase;

		.header_mobile-inner {
			display: flex;
			flex-direction: column;
			margin: auto;
			position: absolute;
			top: 50px;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 100;
			width: 100%;
			height: auto;
			min-height: calc(100vh - 50px + 1px);
			transition: transform 300ms $transitionEase;
		}

		#header_mobile_switch:not(:checked) ~ & {
			transform: translateX(-100%);

			.header_mobile-inner {
				transform: translateX(100%);
			}
		}

		#header_mobile_switch:checked ~ & {
			transform: translateX(0);

			.header_mobile-inner {
				transform: translateX(0);
			}
		}
	}

	@media (min-width: $mobileMin) {
		display: none;
	}
}

#header_mobile_toolbar {

	& {
		color: $black;
		background-color: $white;
		display: flex;
		position: fixed;
		top: 0;
		left: 0;
		z-index: $menu_mobile_depth;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 65px;
		box-shadow: rgba(0, 0, 0, 0.1) 0px 25px 20px -20px;
	}

	.header__toolbar {
		display: flex;
		align-items: center;
		height: 100%;
	}

	.search__link {
		display: none;
		margin-right: 32px;
		transition: color 300ms $transitionEase;

		.icon {
			width: 18px;
			height: 18px;
		}

		@media (min-width: $mobileMin) {
			&:hover {
				color: $highlight;
			}
		}

	}

	.account__link {
		//margin-right: 32px;
		margin-right: 12px;
		transition: color 300ms $transitionEase;

		.icon {
			width: 18px;
			height: 18px;
		}

		@media (min-width: $mobileMin) {
			&:hover {
				color: $highlight;
			}
		}
	}

	.cart__link {
		display: none;
		margin-right: 12px;
		transition: color 300ms $transitionEase;

		@media (min-width: $mobileMin) {
			&:hover {
				color: $highlight;
			}
		}

		.icon {
			width: 18px;
			height: 18px;
		}

		.cart__counter {
			display: none;
		}
	}

	.header_mobile_toolbar-button {
		position: relative;
		width: 50px;
		height: 50px;

		.line {
			background-color: $black;
			display: block;
			margin: auto;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 1;
			width: 20px;
			height: 2px;
			transform-origin: center;
			transition: transform 300ms $transitionEase;

			&:nth-child(1) {
				transform: translateY(-4px);
			}

			&:nth-child(2) {
				transform: translateY(4px);
			}
		}

		#header_mobile_switch:checked ~ & {
			.line:nth-child(1) {
				transform: translateY(0) rotate(-45deg);
			}

			.line:nth-child(2) {
				transform: translateY(0) rotate(45deg);
			}
		}
	}


	@media (min-width: $mobileMin) {
		display: none;
	}
}

#header_mobile_switch {
	display: none;
}
</style>
