
import $ from 'cash-dom';
import Main from './Main';
// import Device from './Device';

import Math_ from 'utils/Math';



export default new class Scroll {


	constructor() {
		this.eh = {};

		this.y		= null; // scroll Y
		this.yI		= null; // scroll Y with inertia
		this.prevYI	= 0; 	// previous scroll Y with inertia
		this.dYI	= 0; 	// delta with previous scroll Y with inertia
		this.h		= null; // scroll height

		this.SCROLL_INERTIA	= 0.09;

		this._needUpdate	= true;
	}


	init( $window = $( window ) ) {
		this._initDOM( $window );
		this._initEl();
		this._bindEvents();

		this._disableScrollRestoration();
	}


	_initDOM( $window ) {
		this.$window = $window;
	}


	_initEl() {}


	_bindEvents() {
		// Main.on( Main.E.RAF, this._raf, this );
	}


	_disableScrollRestoration() {
		if ( 'scrollRestoration' in history )
			history.scrollRestoration = 'manual';
	}


	_raf() {
		if ( !this._needUpdate )
			return;

		this.y	= this.$window[0].scrollY || this.$window[0].pageYOffset;
		this.yI	= Math_.getInertia( this.y, this.yI, this.SCROLL_INERTIA );
		// this.yI	= Device.IS_DESKTOP ? Math_.getInertia( this.y, this.yI, this.SCROLL_INERTIA ) : this.y;

		this.dYI	= this.yI - this.prevYI;
		this.prevYI	= this.yI;

		// console.log( `🎡 y: ${ this.y }` );
		// console.log( `🎡 yI: ${ this.yI }` );
	}


	setScrollY( scrollY ) {
		this.y	= scrollY;
		this.yI	= scrollY;

		this.$window[0].scrollTo( 0, scrollY );
	}


	setScrollHeight( height ) {
		this.h = height;
	}


	set needUpdate( value ) {
		this._needUpdate = value;
	}


}

