// import $ from "cash-dom";
// import { gsap } from "gsap";
//
//
// //constructor
// let $wrapper = document.querySelector( ".intro_slider" )
//
// let colors       = [];
// let bubbles      = null;
// let timer        = null;
// let slides       = [];
// let previous     = 1;
// let active       = 0;
// let alternate    = true;
// let progressBar  = { completionEnd: 0, completionStart: 0 };
// let progressSize = 70;
//
// //init DOM
// $wrapper.find( '.intro_slider-slide' ).each( ( index, slide ) => {
// 	const $slide = $( slide );
// 	slides.push( {
// 		slide: $slide,
// 		image: $slide.find( '.intro_slider-image' ),
// 		title: $slide.find( '.intro_slider-title' )
// 	} )
// } );
// let $counter = $wrapper.find( '.intro_slider-counter' );
//
// //init el
// let max = slides.length - 1;
//
// for ( let i = 0; i < slides.length; i++ ) {
// 	colors.push( slides[ i ].slide.attr( 'data-color' ) );
//
// 	slides[ i ].split = new SplitText( slides[ i ].title[ 0 ], { type: "lines, chars" } );
//
// 	if ( i > 0 ) {
// 		gsap.set( slides[ i ].split.chars, { y: 40, autoAlpha: 0 } );
// 		gsap.set( slides[ i ].image, { autoAlpha: 0 } );
// 	} else {
// 		slides[ i ].slide.addClass( 'active' );
// 	}
// }
//
//
// initCounter();
// let ctx = initCounter();
// startTimer( ctx );
//
//
// function initCounter() {
// 	let $canvas = document.createElement( 'canvas' );
// 	$canvas     = $( $canvas );
// 	$canvas.appendTo( $counter );
// 	$canvas[ 0 ].width = $canvas[ 0 ].height = progressSize * window.devicePixelRatio;
// 	let ctx            = $canvas[ 0 ].getContext( '2d' );
// 	ctx.scale( window.devicePixelRatio, window.devicePixelRatio );
// 	return ctx;
// }
//
//
// function next( ctx ) {
// 	let previous = active;
// 	active++;
// 	if ( active > this.max ) {
// 		active = 0;
// 	}
//
// 	// Set previous and actives
// 	const $previousSlide = slides[ previous ]
// 	const $currentSlide  = slides[ active ];
//
// 	$previousSlide.slide.removeClass( 'active' );
// 	$currentSlide.slide.addClass( 'active' );
//
// 	// this.bubbles.changeColor(this.active);
//
// 	gsap.timeline()
//
// 		.set( $previousSlide.image, { clearProps: 'zIndex' }, 0 )
// 		.set( $currentSlide.split.chars, { y: 40, autoAlpha: 0 }, 0 )
// 		.set( $currentSlide.image, { zIndex: 2 }, 0 )
//
// 		.to( $currentSlide.image, { duration: 2, autoAlpha: 1, zIndex: 2 }, 0 )
// 		.to( $currentSlide.split.chars, { duration: 0.8, y: 0, autoAlpha: 1, stagger: 0.02 }, 0.5 )
//
// 		.to( $previousSlide.split.chars, { duration: 0.5, y: -60, autoAlpha: 0, stagger: 0.01 }, 0 )
// 		.set( $previousSlide.image, { autoAlpha: 0 } );
//
// 	startTimer( ctx );
// }
//
//
// function startTimer( ctx ) {
// 	if ( timer ) {
// 		timer.kill();
// 	}
// 	progressBar.completionEnd = progressBar.completionStart = 0.001;
// 	timer                     = gsap.timeline( {
// 		onComplete: () => {
// 			next( ctx );
// 		}
// 	} );
// 	if ( alternate ) {
// 		timer.to( progressBar, {
// 			duration:      6,
// 			completionEnd: 1,
// 			ease:          "none",
// 			onUpdate:      () => {
// 				updateCanvas( ctx );
// 			}
// 		} );
// 	} else {
// 		timer.to( progressBar, {
// 			duration:        6,
// 			completionStart: 1,
// 			ease:            "none",
// 			onUpdate:        () => {
// 				updateCanvas( ctx );
// 			}
// 		} );
// 	}
// 	alternate = !alternate;
// }
//
//
// function updateCanvas( ctx ) {
// 	console.log( "update canvas" )
// 	ctx.clearRect( 0, 0, progressSize, progressSize );
//
// 	ctx.beginPath();
// 	ctx.lineWidth   = 1;
// 	ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
// 	ctx.arc( progressSize / 2, progressSize / 2, progressSize / 2 - 2,
// 		0,
// 		2 * Math.PI
// 	);
// 	ctx.stroke();
// 	ctx.closePath();
//
// 	ctx.beginPath();
// 	ctx.lineWidth   = 2;
// 	ctx.strokeStyle = '#FFFFFF';
// 	ctx.arc( progressSize / 2, progressSize / 2, progressSize / 2 - 2,
// 		( Math.PI / 180 ) * ( ( 360 * progressBar.completionStart ) - 90 ),
// 		( Math.PI / 180 ) * ( ( 360 * progressBar.completionEnd ) - 90 )
// 	);
// 	ctx.stroke();
// 	ctx.closePath();
// }
