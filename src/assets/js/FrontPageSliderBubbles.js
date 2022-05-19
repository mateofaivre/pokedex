// import $ from "cash-dom";
// import { gsap } from "gsap";
//
//
// let $wrapper = $( ".intro_slider" );
//
//
// let colors     = [ "red", "blue", "green" ];
// let color      = colors[ 0 ];
// let width      = 100;
// let height     = 100;
// let size       = 100;
// let numCircles = 4;
// let circles    = [];
//
// let $canvas = document.createElement( 'canvas' );
// $canvas     = $( $canvas );
// $canvas.appendTo( $wrapper );
// let ctx = $canvas[ 0 ].getContext( '2d' );
// for ( let i = 0; i < numCircles; i++ ) {
// 	circles[ i ]      = {};
// 	circles[ i ].x    = Math.random();
// 	circles[ i ].y    = Math.random();
// 	circles[ i ].dx   = ( Math.random() - 0.5 ) * 2 / ( 500 + ( Math.random() * 2000 ) );
// 	circles[ i ].dy   = ( Math.random() - 0.5 ) * 2 / ( 500 + ( Math.random() * 2000 ) );
// 	circles[ i ].size = Math.random() * 0.6 + 0.3;
// }
// let $noiseImg = new Image();
// let noisePattern;
// $noiseImg.addEventListener( 'load', () => {
// 	noisePattern = ctx.createPattern( $noiseImg, 'repeat' );
// } );
//
//
// //load noise
// // $noiseImg.addEventListener('load', () => {
// // 	Screen.on(Screen.E.RESIZE, this._resize, this);
// // 	Main.on(Main.E.RAF, this._raf, this);
// // });
// // $noiseImg.src = GRH_Config.IMG_DIR + 'noise.png';
//
//
// moveBubbles();
// updateCanvas(noisePattern);
//
//
// function moveBubbles() {
// 	for ( let i = 0; i < numCircles; i++ ) {
// 		if ( circles[ i ].x + circles[ i ].dx > 1 || circles[ i ].x + circles[ i ].dx < 0 ) {
// 			circles[ i ].dx = -circles[ i ].dx;
// 		}
// 		if ( circles[ i ].y + circles[ i ].dy > 1 || circles[ i ].y + circles[ i ].dy < 0 ) {
// 			circles[ i ].dy = -circles[ i ].dy;
// 		}
// 		circles[ i ].x += circles[ i ].dx;
// 		circles[ i ].y += circles[ i ].dy;
// 	}
// }
//
//
// function updateCanvas() {
// console.log(noisePattern)
// 	// Clear
// 	ctx.moveTo( 0, 0 );
// 	ctx.clearRect( 0, 0, width, height );
//
// 	// // Background color
// 	ctx.globalCompositeOperation = 'source-over';
// 	ctx.globalAlpha              = 1;
// 	ctx.moveTo( 0, 0 );
// 	ctx.beginPath();
// 	ctx.fillStyle = color;
// 	ctx.rect( 0, 0, width, height );
// 	ctx.fill();
//
// 	// Noise
// 	ctx.moveTo( 0, 0 );
// 	ctx.beginPath();
// 	ctx.globalAlpha = 0.02;
// 	ctx.fillStyle   = noisePattern;
// 	ctx.rect( 0, 0, width, width );
// 	ctx.fill();
//
//
// 	// Circles
// 	ctx.globalAlpha              = 1;
// 	ctx.fillStyle                = 'black';
// 	ctx.globalCompositeOperation = 'xor';
// 	ctx.beginPath();
// 	for ( let i = 0; i < numCircles; i++ ) {
// 		ctx.moveTo( circles[ i ].x * width, circles[ i ].y * height );
// 		ctx.arc( circles[ i ].x * width, circles[ i ].y * height, circles[ i ].size * ( size / 2 ), 0, 2 * Math.PI );
// 	}
// 	ctx.fill();
// }
//
//
// function changeColor( index ) {
// 	gsap.to( this, {
// 		duration: 1,
// 		color:    colors[ index ]
// 	} );
// }
