<template>
	<div class="intro_slider">
		<div class="intro_slider-slide" v-for="index in introSlider.imgs.length" :key="index" :data-color="introSlider.colors[ index - 1 ]">
			<div class="intro_slider-title_wrapper">
				<h2 class="intro_slider-title">{{ introSlider.titles[ index - 1 ] }}</h2>
				<!--				<a href="#contact" class="intro_slider-contact">Contact</a>-->
			</div>
			<figure class="intro_slider-image">
				<picture>
					<img :src=" '/assets/img/' + introSlider.imgs[ index - 1 ]" data-src="" alt="" class="img-lazy">
				</picture>
				<noscript><img src="" alt=""></noscript>
			</figure>
		</div>
		<span class="intro_slider-counter">
			<canvas class="canvas__counter"></canvas>
		</span>
		<span class="intro_slider-bubbles">
			<canvas class="intro_slider-bubbles--canvas" v-aware @raf="_moveBubbles(), _updateCanvasBubbles()"></canvas>
		</span>
	</div>

</template>

<script>
import introSlider from "../assets/json/intro-slider.json";
import $ from "cash-dom";
import { gsap } from "gsap";
import SplitText from "gsap/SplitText";
import Bubbles from '../assets/js/FrontPageSliderBubbles'


export default {
	name: "IntroSlider",
	data() {
		return {
			introSlider,
			circlesBubbles:    "",
			numCirclesBubbles: Number,
			ctxBubbles:        "",
			colorBubbles:      String,
			widthBubbles:      Number,
			heightBubbles:     Number,
			sizeBubbles:       Number,
			colors:            String
		}
	},
	mounted() {
		//constructor
		let $wrapper = $( ".intro_slider" )

		this.colors      = [];
		let bubbles      = null;
		let timer        = null;
		let slides       = [];
		let previous     = 1;
		let active       = 0;
		let alternate    = true;
		let progressBar  = { completionEnd: 0, completionStart: 0 };
		let progressSize = 70;

		//init DOM
		$wrapper.find( '.intro_slider-slide' ).each( ( index, slide ) => {
			const $slide = $( slide );
			slides.push( {
				slide: $slide,
				image: $slide.find( '.intro_slider-image' ),
				title: $slide.find( '.intro_slider-title' )
			} )
		} );
		let $counter = $wrapper.find( '.intro_slider-counter' );

		//init el
		let max = slides.length - 1;

		for ( let i = 0; i < slides.length; i++ ) {
			this.colors.push( slides[ i ].slide.attr( 'data-color' ) );

			slides[ i ].split = new SplitText( slides[ i ].title[ 0 ], { type: "lines, chars" } );

			if ( i > 0 ) {
				gsap.set( slides[ i ].split.chars, { y: 40, autoAlpha: 0 } );
				gsap.set( slides[ i ].image, { autoAlpha: 0 } );
			} else {
				slides[ i ].slide.addClass( 'active' );
			}
		}
		this._initBubbles();


		let ctx = initCounter();
		this._startTimer( timer, progressBar, active, slides, ctx, max, alternate, progressSize );


		function initCounter() {
			// let $canvas = document.createElement( 'canvas' );
			let $canvas = document.querySelector( '.canvas__counter' );
			$canvas     = $( $canvas );
			$canvas.appendTo( $counter );
			$canvas[ 0 ].width = $canvas[ 0 ].height = progressSize * window.devicePixelRatio;
			let ctx            = $canvas[ 0 ].getContext( '2d' );
			ctx.scale( window.devicePixelRatio, window.devicePixelRatio );
			return ctx;
		}

	},
	methods: {
		_next( active, slides, ctx, max, timer, progressBar, alternate, progressSize ) {
			let previous = active;
			active++;
			if ( active > max ) {
				active = 0;
			}

			// Set previous and actives
			const $previousSlide = slides[ previous ]
			const $currentSlide  = slides[ active ];

			$previousSlide.slide.removeClass( 'active' );
			$currentSlide.slide.addClass( 'active' );

			this._changeBubblesColor( active );

			gsap.timeline()

				.set( $previousSlide.image, { clearProps: 'zIndex' }, 0 )
				.set( $currentSlide.split.chars, { y: 40, autoAlpha: 0 }, 0 )
				.set( $currentSlide.image, { zIndex: 2 }, 0 )

				.to( $currentSlide.image, { duration: 2, autoAlpha: 1, zIndex: 2 }, 0 )
				.to( $currentSlide.split.chars, { duration: 0.8, y: 0, autoAlpha: 1, stagger: 0.02 }, 0.5 )

				.to( $previousSlide.split.chars, { duration: 0.5, y: -60, autoAlpha: 0, stagger: 0.01 }, 0 )
				.set( $previousSlide.image, { autoAlpha: 0 } );

			this._startTimer( timer, progressBar, active, slides, ctx, max, alternate, progressSize );
		},
		_startTimer( timer, progressBar, active, slides, ctx, max, alternate, progressSize ) {
			if ( timer ) {
				timer.kill();
			}
			progressBar.completionEnd = progressBar.completionStart = 0.001;
			timer                     = gsap.timeline( {
				onComplete: () => {
					this._next( active, slides, ctx, max, timer, progressBar, alternate, progressSize );
				}
			} );
			if ( alternate ) {
				timer.to( progressBar, {
					duration:      6,
					completionEnd: 1,
					ease:          "none",
					onUpdate:      () => {
						this._updateCanvas( ctx, progressBar, progressSize );
					}
				} );
			} else {
				timer.to( progressBar, {
					duration:        6,
					completionStart: 1,
					ease:            "none",
					onUpdate:        () => {
						this._updateCanvas( ctx, progressBar, progressSize );
					}
				} );
			}
			alternate = !alternate;
		},
		_updateCanvas( ctx, progressBar, progressSize ) {
			ctx.clearRect( 0, 0, progressSize, progressSize );

			ctx.beginPath();
			ctx.lineWidth   = 1;
			ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
			ctx.arc( progressSize / 2, progressSize / 2, progressSize / 2 - 2,
				0,
				2 * Math.PI
			);
			ctx.stroke();
			ctx.closePath();

			ctx.beginPath();
			ctx.lineWidth   = 2;
			ctx.strokeStyle = '#FFFFFF';
			ctx.arc( progressSize / 2, progressSize / 2, progressSize / 2 - 2,
				( Math.PI / 180 ) * ( ( 360 * progressBar.completionStart ) - 90 ),
				( Math.PI / 180 ) * ( ( 360 * progressBar.completionEnd ) - 90 )
			);
			ctx.stroke();
			ctx.closePath();
		},


		//bubbles
		_initBubbles() {
			this.$wrapperBubbles   = $( '.intro_slider-bubbles' );
			this.colorsBubbles     = this.colors;
			this.colorBubbles      = this.colorsBubbles[ 0 ];
			this.widthBubbles      = 100;
			this.heightBubbles     = 100;
			this.sizeBubbles       = ( ( this.$wrapperBubbles.width() ) / 1.2 );
			this.numCirclesBubbles = 4;
			this.circlesBubbles    = [];

			// let $canvas = document.createElement( 'canvas' );
			// $canvas.setAttribute( "class", 'test' )
			this.$canvasBubbles = $( '.intro_slider-bubbles--canvas' );
			this.$canvasBubbles.appendTo( this.$wrapperBubbles );
			this.ctxBubbles = this.$canvasBubbles[ 0 ].getContext( '2d' );
			for ( let i = 0; i < this.numCirclesBubbles; i++ ) {
				this.circlesBubbles[ i ]      = {};
				this.circlesBubbles[ i ].x    = Math.random();
				this.circlesBubbles[ i ].y    = Math.random();
				this.circlesBubbles[ i ].dx   = ( Math.random() - 0.5 ) * 2 / ( 500 + ( Math.random() * 2000 ) );
				this.circlesBubbles[ i ].dy   = ( Math.random() - 0.5 ) * 2 / ( 500 + ( Math.random() * 2000 ) );
				this.circlesBubbles[ i ].size = Math.random() * 0.6 + 0.3;
			}
			let $noiseImg = new Image();
			$noiseImg.addEventListener( 'load', () => {
				this.noisePattern = this.ctxBubbles.createPattern( $noiseImg, 'repeat' );
			} );

			$noiseImg.src = '/assets/img/noise.png';


			this._resizeBubbles();

			// this.$noiseImg.addEventListener('load', () => {
			// 	Screen.on(Screen.E.RESIZE, this._resize, this);
			// 	Main.on(Main.E.RAF, this._raf, this);
			// });

		},
		_moveBubbles() {
			for ( let i = 0; i < this.numCirclesBubbles; i++ ) {
				if ( this.circlesBubbles[ i ].x + this.circlesBubbles[ i ].dx > 1 || this.circlesBubbles[ i ].x + this.circlesBubbles[ i ].dx < 0 ) {
					this.circlesBubbles[ i ].dx = -this.circlesBubbles[ i ].dx;
				}
				if ( this.circlesBubbles[ i ].y + this.circlesBubbles[ i ].dy > 1 || this.circlesBubbles[ i ].y + this.circlesBubbles[ i ].dy < 0 ) {
					this.circlesBubbles[ i ].dy = -this.circlesBubbles[ i ].dy;
				}
				this.circlesBubbles[ i ].x += this.circlesBubbles[ i ].dx;
				this.circlesBubbles[ i ].y += this.circlesBubbles[ i ].dy;
			}
		},
		_updateCanvasBubbles() {
			//colorBubbles, width, height, numCircles, circles, noisePattern, size
			//Clear
			this.ctxBubbles.moveTo( 0, 0 );
			this.ctxBubbles.clearRect( 0, 0, this.widthBubbles, this.heightBubbles );
			// Background color
			this.ctxBubbles.globalCompositeOperation = 'source-over';
			this.ctxBubbles.globalAlpha              = 1;
			this.ctxBubbles.moveTo( 0, 0 );
			this.ctxBubbles.beginPath();
			this.ctxBubbles.fillStyle = this.colorBubbles;
			this.ctxBubbles.rect( 0, 0, this.widthBubbles, this.heightBubbles );
			this.ctxBubbles.fill();

			// Noise
			this.ctxBubbles.moveTo( 0, 0 );
			this.ctxBubbles.beginPath();
			this.ctxBubbles.globalAlpha = 0.02;
			this.ctxBubbles.fillStyle   = this.noisePattern;
			this.ctxBubbles.rect( 0, 0, this.widthBubbles, this.widthBubbles );
			this.ctxBubbles.fill();


			// Circles
			this.ctxBubbles.globalAlpha              = 1;
			this.ctxBubbles.fillStyle                = 'black';
			this.ctxBubbles.globalCompositeOperation = 'xor';
			this.ctxBubbles.beginPath();
			for ( let i = 0; i < this.numCirclesBubbles; i++ ) {
				this.ctxBubbles.moveTo( this.circlesBubbles[ i ].x * this.widthBubbles, this.circlesBubbles[ i ].y * this.heightBubbles );
				this.ctxBubbles.arc( this.circlesBubbles[ i ].x * this.widthBubbles, this.circlesBubbles[ i ].y * this.heightBubbles, this.circlesBubbles[ i ].size * ( this.sizeBubbles / 2 ), 0, 2 * Math.PI );
			}
			this.ctxBubbles.fill();
		},
		_changeBubblesColor( index ) {
			// gsap.to( this.$refs, {
			// 	duration: 1,
			// 	color:    this.colorsBubbles[ index ]
			// } );
		},
		_resizeBubbles() {
			this.widthBubbles               = this.$wrapperBubbles.width();
			this.heightBubbles              = this.$wrapperBubbles.height();
			this.size                       = Math.min( this.widthBubbles, this.heightBubbles );
			this.$canvasBubbles[ 0 ].width  = this.widthBubbles * window.devicePixelRatio;
			this.$canvasBubbles[ 0 ].height = this.heightBubbles * window.devicePixelRatio;
			this.ctxBubbles.scale( window.devicePixelRatio, window.devicePixelRatio );
		}
	}
}
</script>

<style scoped lang="scss">
.intro_slider {
	position: relative;
	overflow: hidden;
	width: 100%;
	height: 100vh;
	max-height: 100vh;
}

.intro_slider-slide {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}


.intro_slider-image {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
	width: 100%;
	height: 100%;
	filter: brightness(0.8);

	img {
		object-fit: cover;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
}

.intro_slider-title_wrapper {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-top: 50px;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 3;
	width: 100%;
	height: 100%;
}

.intro_slider-title {
	font-family: $voyage;
	font-weight: 700;
	font-size: 100px;
	color: #FFFFFF;
	letter-spacing: 0;
	text-align: center;
	line-height: 105px;
	margin-bottom: 100px;
}

.intro_slider-contact {
	color: $black;
	background: $white;
	text-transform: uppercase;
	font-weight: 500;
	letter-spacing: 1.5px;
	font-size: 25px;
	padding: 10px 20px;
	text-decoration: none;
}

.intro_slider-counter {
	display: block;
	position: absolute;
	left: 165px;
	bottom: 165px;
	z-index: 5;
	width: 70px;
	height: 70px;

	&:after {
		background-color: $white;
		border-radius: 100%;
		content: "";
		display: block;
		margin: auto;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		width: 6px;
		height: 6px;
	}

	canvas {
		max-width: 100%;
		max-height: 100%;
	}
}

.intro_slider-bubbles {
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 2;
	width: 100%;
	height: 100%;

	canvas {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
		width: 100%;
		height: 100%;
	}
}

@media (max-width: $mobileMax) {
	.intro_slider-title_wrapper {
		padding-top: 0;
	}
	.intro_slider-title {
		font-size: 40px;
		line-height: 45px;
	}
	.intro_slider-counter {
		left: 10px;
		bottom: 10px;
	}
}

@media (max-width: $smallMax) {
	.intro_slider-title {
		font-size: 32px;
		line-height: 37px;
	}
}

</style>
