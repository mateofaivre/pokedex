<template>
	<footer>
		<div class="footer__top">
			<div class="footer__top--left footer__logo">
				<span class="logo">Gordon<span class="logo--bottom">Wedding Films</span></span>
			</div>
			<div class="footer__top--right footer__company">
				<div class="footer__company--name">
					Échangeons 👋🏼
				</div>
				<div class="footer__company--address">
					<div>18 Boulevard Rembrandt</div>
					<div>21000 Dijon</div>
				</div>
				<div class="footer__company--social">
					<a href="https://instagram.com">Instagram</a>
					•
					<a href="https://facebook.com">Facebook</a>
				</div>
			</div>
		</div>
		<div class="footer__bottom">
			<div class="footer__bottom--inner">
				<div class="footer__bottom--left">
					<span>© Gordon Wedding Films 2022</span>
					<span><a href="#mentions-legales">Mentions légales</a></span>
				</div>
				<div class="footer__bottom--right">
					<a href="https://mateofaivre.fr">Fateal Studio</a>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
import Hand from "../assets/svg/hand.svg"
import Insta from "../assets/svg/instagram.svg"
import Facebook from "../assets/svg/facebook.svg"


export default {
	name:       "Footer",
	components: {
		Hand, Insta, Facebook
	}
}
</script>

<style scoped lang="scss">


footer {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 300px;
	background-color: $gdn-pink;
	color: $white;
	position: relative;

	a {
		color: $white;
		transition: color .3s $transitionEase;

		@media (min-width: $mobileMin) {
			&:hover {
				color: $black;
			}
		}

	}
}

.footer__top, .footer__bottom--inner {
	max-width: 1080px;
	margin: 0 auto;
}

.footer__top {
	height: 75%;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.footer__logo {
	margin-top: -10px;
}

.footer__bottom {
	height: 25%;
	width: 100%;
	background-color: #bf5e5f;
}

.footer__bottom--inner {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.footer__bottom--left {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	height: 100%;
	column-gap: 20px;
}

.footer__bottom--right {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}

.footer__company {
	font-size: 18px;
}

.footer__company--name {
	font-weight: 500;
	margin-bottom: 7px;
}

.footer__company--address {
	margin-bottom: 15px;
}

.footer__company--social {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	column-gap: 10px;
	width: 100%;
}

@media (max-width: $mobileMax) {

	.footer__top {
		flex-direction: column;
		justify-content: center;
		align-items: center;
		row-gap: 20px;
		width: fit-content;
		width: -moz-fit-content;
		margin: 0 auto;
	}

	.footer__logo {
		.logo {
			font-size: 30px;
			line-height: 35px;
		}

		.logo--bottom {
			font-size: 8px;
		}
	}

	.footer__company {
		text-align: center;
	}

	.footer__bottom {
		padding: 0 15px;
	}

	.footer__bottom--inner {
		font-size: 14px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		row-gap: 6px;
	}


	.footer__bottom--left, .footer__bottom--right {
		height: auto;
	}

	.footer__bottom--right {
		justify-content: flex-start;
	}
}
</style>
