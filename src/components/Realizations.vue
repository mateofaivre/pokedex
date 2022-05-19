<template>
	<div class="realizations__menu" id="realizations">
		<div class="realizations__menu--wrapper">
			<div class="realizations__menu--item" v-for="index in 10" :key="index" @mouseenter="playVideo" @mouseleave="stopVideo">
				<figure>
					<!--										<img src="https://folks-folks.com/wp-content/uploads/2022/01/MRT6071-scaled-e1642762609595.jpg" alt=""/>-->

					<video loop muted :src=" '/assets/videos/' + realizations.slide.videos[index - 1]"/>
					<!--					<div class="realizations__menu&#45;&#45;item&#45;&#45;video" style="padding:56.25% 0 0 0;position:relative;">-->
					<!--						<iframe src="https://player.vimeo.com/video/223557114?h=83155e32df&autoplay=1&loop=1&title=0&byline=0&portrait=0" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>-->
					<!--					</div>-->
				</figure>
			</div>
		</div>
	</div>
</template>

<script>
import gsap from "gsap";
import realizations from "../assets/json/realizations.json"


export default {
	name:       "Realizations",
	components: {
		// Slider
	},
	data() {
		return {
			realizations
		}
	},
	mounted() {
		let recaptchaScript = document.createElement( 'script' )
		recaptchaScript.setAttribute( 'src', 'https://player.vimeo.com/api/player.js' )
		document.head.appendChild( recaptchaScript )


		/*--------------------
Vars
--------------------*/
		const $menu   = document.querySelector( '.realizations__menu' )
		const $items  = document.querySelectorAll( '.realizations__menu--item' )
		// const $images = document.querySelectorAll( '.realizations__menu--item img' )
		const $images = document.querySelectorAll( '.realizations__menu--item video' )
		// const $images = document.querySelectorAll( '.realizations__menu--item--video' )
		let menuWidth = $menu.clientWidth
		let itemWidth = $items[ 0 ].clientWidth
		let wrapWidth = $items.length * itemWidth

		let scrollSpeed = 0
		let oldScrollY  = 0
		let scrollY     = 0
		let y           = 0


		/*--------------------
		Lerp
		--------------------*/
		const lerp = ( v0, v1, t ) => {
			return v0 * ( 1 - t ) + v1 * t
		}


		/*--------------------
		Dispose
		--------------------*/
		const dispose = ( scroll ) => {
			gsap.set( $items, {
				x:         ( i ) => {
					return i * itemWidth + scroll
				},
				modifiers: {
					x: ( x, target ) => {
						const s = gsap.utils.wrap( -itemWidth, wrapWidth - itemWidth, parseInt( x ) )
						return `${s}px`
					}
				}
			} )
		}
		dispose( 0 )


		/*--------------------
		Wheel
		--------------------*/
		const handleMouseWheel = ( e ) => {
			scrollY -= e.deltaY * 0.9
		}


		/*--------------------
		Touch
		--------------------*/
		let touchStart         = 0
		let touchX             = 0
		let isDragging         = false
		const handleTouchStart = ( e ) => {
			touchStart = e.clientX || e.touches[ 0 ].clientX
			isDragging = true
			$menu.classList.add( 'is-dragging' )
		}
		const handleTouchMove  = ( e ) => {
			if ( !isDragging ) {
				return
			}
			touchX     = e.clientX || e.touches[ 0 ].clientX
			scrollY += ( touchX - touchStart ) * 2.5
			touchStart = touchX
		}
		const handleTouchEnd   = () => {
			isDragging = false
			$menu.classList.remove( 'is-dragging' )
		}


		/*--------------------
		Listeners
		--------------------*/
		$menu.addEventListener( 'mousewheel', handleMouseWheel )

		$menu.addEventListener( 'touchstart', handleTouchStart )
		$menu.addEventListener( 'touchmove', handleTouchMove )
		$menu.addEventListener( 'touchend', handleTouchEnd )

		$menu.addEventListener( 'mousedown', handleTouchStart )
		$menu.addEventListener( 'mousemove', handleTouchMove )
		$menu.addEventListener( 'mouseleave', handleTouchEnd )
		$menu.addEventListener( 'mouseup', handleTouchEnd )

		$menu.addEventListener( 'selectstart', () => {
			return false
		} )


		/*--------------------
		Resize
		--------------------*/
		window.addEventListener( 'resize', () => {
			menuWidth = $menu.clientWidth
			itemWidth = $items[ 0 ].clientWidth
			wrapWidth = $items.length * itemWidth
		} )


		/*--------------------
		Render
		--------------------*/
		const render = () => {
			requestAnimationFrame( render )
			y = lerp( y, scrollY, .1 )
			dispose( y )

			scrollSpeed = y - oldScrollY
			oldScrollY  = y

			gsap.to( $items, {
				skewX:  -scrollSpeed * .2,
				rotate: scrollSpeed * .01,
				scale:  1 - Math.min( 100, Math.abs( scrollSpeed ) ) * 0.003
			} )
		}
		render()
	},
	methods: {
		playVideo( event ) {
			let video = event.currentTarget.querySelector( 'video' )
			video.play();
		},
		stopVideo( event ) {
			let video = event.currentTarget.querySelector( 'video' )
			video.pause();
		}
	}
}
</script>

<style scoped lang="scss">
.realizations__menu {
	overflow: hidden;
	cursor: grab;
	width: 100%;
	position: relative;
	z-index: 1;
	height: 40vh;
	margin-bottom: 100px;

	&.is-dragging {
		cursor: grabbing;
	}

	&--wrapper {
		counter-reset: count;
		display: flex;
		position: absolute;
		z-index: 1;
		height: 100%;
		top: 0;
		left: 0;
		width: 100%;
	}

	&--item {
		counter-increment: count;
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 30vw;
		height: 100%;
		padding: 0 1.5vw;
		//margin: 0 1.5vw;
		overflow: hidden;

		@media (max-width: $mobileMax) {
			width: 50vw;
			height: 50vw;
			padding: 0 2.5vw;
		}

		&:nth-child(n+10):before {
			content: counter(count);
		}

		figure {
			position: absolute;
			z-index: 1;
			display: block;
			user-select: none;
			-webkit-appearance: none;
			padding: 0;
			top: 0;
			//inset: 0;
			border: none;
			outline: none;
			box-shadow: none;
			cursor: pointer;
			width: 100%;
			height: 100%;
			overflow: hidden;
			pointer-events: none;
			transform-origin: center;

			img, video, .realizations__menu--item--video {
				position: absolute;
				z-index: 1;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				object-fit: cover;
				vertical-align: middle;
				transform-origin: center;
			}

			&:before {
				position: absolute;
				z-index: 2;
				bottom: 1vw;
				left: 1vw;
				display: inline-block;
				//content: "0" counter(count);
				color: #ffffff;
				font-size: 3vw;
			}
		}
	}
}

@media (max-width: $mobileMax) {
	.realizations__menu {
		margin-bottom: 20px;
	}
}


</style>
