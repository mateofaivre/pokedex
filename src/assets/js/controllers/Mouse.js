

import CustomEvent from 'lib/CustomEvent';

import Main from 'controllers/Main';

import Math_ from 'utils/Math';



export default new class Mouse extends CustomEvent {
	
	
	constructor() {
		super();
		
		this.E = {
			MOUSE_MOVE:	'mousemove',
			MOUSE_DOWN:	'mousedown',
			MOUSE_UP:	'mouseup'
		};
		this.eh = {};
		
		this.x	= null; // mouse X
		this.y	= null; // mouse Y
		this.xI	= null; // mouse X with inertia
		this.yI	= null; // mouse Y with inertia
		
		this.MOUSE_INERTIA = 0.03;
	}
	
	
	init( $window = $( window ), startX = Math.round( $window.width() / 2 ), startY = Math.round( $window.height() / 2 ) ) {
		this._initDOM( $window );
		this._initEl( startX, startY );
		this._bindEvents();
	}
	
	
	_initDOM( $window ) {
		this.$window = $window;
	}
	
	
	_initEl( startX, startY ) {
		this.setPosition( startX, startY );
	}
	
	
	_bindEvents() {
		// Main.on( Main.E.RAF, this._raf, this );
		
		this.eh.mouseMove = this._mouseMove.bind( this );
		this.$window.on( 'mousemove', this.eh.mouseMove );
		this.eh.mouseDown = this._mouseDown.bind( this );
		this.$window.on( 'mousedown', this.eh.mouseDown );
		this.eh.mouseUp = this._mouseUp.bind( this );
		this.$window.on( 'mouseup', this.eh.mouseUp );
	}
	
	
	_raf() {
		this.xI = Math_.getInertia( this.x, this.xI, this.MOUSE_INERTIA );
		this.yI = Math_.getInertia( this.y, this.yI, this.MOUSE_INERTIA );
		
		// console.log( `🐹 x: ${ this.x } / y: ${ this.y }` );
		// console.log( `🐹 xI: ${ this.xI } / yI: ${ this.yI }` );
	}
	
	
	_mouseMove( e ) {
		this.x = e.clientX;
		this.y = e.clientY;
		
		// console.log( `🐹 Mouse._mouseMove() x: ${ this.x } / y: ${ this.y }` );
		
		this.emit( this.E.MOUSE_MOVE );
	}
	
	
	_mouseDown() {
		this.emit( this.E.MOUSE_DOWN );
	}
	
	
	_mouseUp() {
		this.emit( this.E.MOUSE_UP );
	}
	
	
	setPosition( x, y ) {
		this.x	= x;
		this.y	= y;
		this.xI	= x;
		this.yI	= y;
	}
	
	
}

