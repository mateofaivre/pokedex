

import CustomEvent from 'lib/CustomEvent';

import Scroll from 'controllers/Scroll';
import Device from 'controllers/Device';

import Math_ from 'utils/Math';



export default new class Screen extends CustomEvent {
	
	
	constructor() {
		super();
		
		this.E = {
			RESIZE:				'resize',
			RESIZE_FORCED:		'resizeforced',
			WINDOW_OUT:			'windowout',
			WINDOW_IN :			'windowin',
			ORIENTATION_CHANGE:	'orientationchange'
		};
		this.eh = {};
		
		this.MOBILE_WIDTH_MAX	= 939;
		this.MOBILE_HEIGHT_MAX	= 599;
		this.PHONE_WIDTH_MAX	= 559;
		
		this.IS_DESKTOP			= null;
		this.IS_MOBILE			= null;
		this.IS_TABLET			= null;
		this.IS_PHONE			= null;
		
		this.DPR = window.devicePixelRatio;
		
		this.wW		= null; // window width
		this.wH		= null; // window height
		this.bW		= null; // body width
		this.bH		= null; // body height
		this.cX		= null; // center X
		this.cY		= null; // center Y
		this.vR		= null; // viewport ratio
		this.hypo	= null; // screen hypotenuse
		this.pbW	= null; // previous body width
		
		this.canResize			= true;
		this.hasRequestedResize	= false;
		this.isWindowFocused	= true;
	}
	
	
	init( $window = $( window ), $body = $( document.body ), $pageWrap = $body ) {
		this._initDOM( $window, $body, $pageWrap );
		this._initEl();
		this._bindEvents();
		
		this._processResize();
	}
	
	
	_initDOM( $window, $body, $pageWrap ) {
		this.$window	= $window;
		this.$body		= $body;
		this.$pageWrap	= $pageWrap;
	}
	
	
	_initEl() {}
	
	
	_bindEvents() {
		this.eh.resize = this._resize.bind( this );
		this.$window.on( 'resize', this.eh.resize );
		// this.eh.blur = this._windowOut.bind( this );
		// this.$window.on( 'blur' , this.eh.blur );
		// this.eh.focus = this._windowIn.bind( this );
		// this.$window.on( 'focus' , this.eh.focus );
	}
	
	
	_resize() {
		if ( this.canResize ) {
			window.requestAnimationFrame( () => {
				this._processResize();
				this.canResize = false;
			} );
			
			this.stoResize = setTimeout(() => {
				if ( this.hasRequestedResize ) {
					this.hasRequestedResize = false;
					this._processResize();
				}
				this.canResize = true;
			}, 300);
		}
		else
			this.hasRequestedResize = true;
	}
	
	triggerCustomResize() {
		this.emit(this.E.CUSTOM_RESIZE);
	}
	
	
	_processResize() {
		this._setResizeProps();
		this._setValues();
		
		this.emit( this.E.RESIZE_FORCED );
		
		if ( Device.IS_DESKTOP === false && this.pbW == this.bW )
			return;
		
		this.emit( this.E.RESIZE );
		
		this.pbW = this.bW;
	}
	
	
	_setResizeProps() {
		this.wW		= this.$window.innerWidth();
		this.wH		= this.$window.outerHeight();
		this.bW		= this.$body.width();
		this.bH		= this.$body.height();
		this.cX		= Math.round( this.bW / 2 );
		this.cY		= Math.round( this.wH / 2 );
		this.vR		= this.bW / this.wH;
		this.hypo	= Math.ceil( Math_.getHypotenuse( this.bW, this.wH ) );
		
		this._setScrollHeight();
		this._setVar();
	}
	
	
	_setScrollHeight() {
		Scroll.setScrollHeight( this.bH - this.wH );
	}
	
	
	_setVar() {
		const vh = this.wH * 0.01;
		document.documentElement.style.setProperty( '--vh', `${ vh }px` );
	}
	
	
	_setValues() {
		this.IS_MOBILE	= this.bW <= this.MOBILE_WIDTH_MAX || this.wH <= this.MOBILE_HEIGHT_MAX;
		this.IS_PHONE	= this.bW <= this.PHONE_WIDTH_MAX || this.wH <= this.PHONE_WIDTH_MAX;
		this.IS_TABLET	= this.IS_MOBILE && !this.IS_PHONE;
		this.IS_DESKTOP	= !this.IS_MOBILE;
	}
	
	
	_windowOut() {
		this.isWindowFocused = false;
		
		this.emit( this.E.WINDOW_OUT );
	}
	
	
	_windowIn() {
		this.isWindowFocused = true;
		
		this.emit( this.E.WINDOW_IN );
	}
	
	
	setBodyHeight( bodyH = this.$pageWrap.height() ) {
		this.bH = bodyH;
		this._setScrollHeight();
		
		if ( Device.IS_DESKTOP )
			this.$body[0].style.height = bodyH + 'px';
		else
			this.$body[0].style.height = '';
	}
	
	
}

