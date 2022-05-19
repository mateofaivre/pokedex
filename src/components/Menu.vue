<template>
	<!-- Menu -->
	<nav class="header__menu">
		<ul class="header__menu_list">
			<li class="header__menu_item" v-for="index in 4" :key="index">
				<a :href="menuItems.items.link[ index - 1 ]" class="header__menu_item_link" @click="stateMenu">{{ menuItems.items.title[ index - 1 ] }}</a>
			</li>
		</ul>
	</nav>
</template>

<script>
import menuItems from "../assets/json/menu.json"


export default {
	name: "Menu",
	data() {
		return {
			menuItems
		}
	},
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
	.header__menu {
		display: flex;
		align-items: center;
		margin-left: auto;
		margin-right: 31px;
		height: 100%;
	}

	.header__menu_list {
		display: flex;
		align-items: center;
		height: 100%;
	}

	.header__menu_item {
		margin-left: 33px;
		position: relative;
	}

	.header__menu_item {
		&:last-of-type .header__menu_item_link {
			padding: 10px 23px;
			background: $white;
			color: $black;
			border-radius: 1px;

			&::after {
				display: none;
			}

			@media (min-width: $mobileMin) {
				&:hover {
					color: $gdn-pink;
				}
			}

		}

		.header__menu_item_link {
			color: inherit;
			font-size: 20px;
			text-decoration: none;
			transition: color 300ms $transitionEase, background-color .3s $transitionEase;

			&:after {
				background-color: currentColor;
				border-radius: 100%;
				content: "";
				display: block;
				opacity: 0;
				position: absolute;
				bottom: -22px;
				left: calc(50% - 3px);
				width: 6px;
				height: 6px;
				transform: translateY(10px);
				transition: opacity 300ms $transitionEase, transform 300ms $transitionEase;
			}

			@media (min-width: $mobileMin) {
				&:hover {
					color: $black;

					&:after {
						opacity: 1;
						transform: translateY(0);
					}
				}
			}

		}

		&.current_page_parent .header__menu_item_link:after,
		&.current-page-ancestor .header__menu_item_link:after,
		&.current_page_item .header__menu_item_link:after {
			opacity: 1;
			transform: translateY(0);
		}
	}

	&.sticky {
		.header__menu_item {
			&:last-of-type .header__menu_item_link {
				background-color: $black;
				color: $white;
			}

			.header__menu_item_link {
				@media (min-width: $mobileMin) {
					&:hover {
						color: $gdn-pink;
					}
				}

				&:after {
					bottom: -10px;
				}
			}

		}
	}

	@media (max-width: $mobileMax) {
		.header__menu {
			margin-left: auto;
			margin-right: auto;
			height: auto;
		}
		.header__menu_list {
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		.header__menu_item {
			margin-left: 0;
			margin-bottom: 10px;
		}
	}
}

#header_mobile {
	.header__menu {
		flex: none;
		margin: auto 0;
		padding: 20px;
		font-size: 30px;
		line-height: 60px;
	}

	.header__menu_item {
		&:not(:last-of-type) {
			margin-bottom: 10px;
		}
	}

	.header__menu_item_link {
		color: $black;
		font-size: 40px;
		line-height: 50px;
		text-decoration: none;
	}
}

#header_mobile_toolbar {

}


</style>
