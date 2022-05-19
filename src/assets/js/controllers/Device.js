

const MobileDetect = require( 'mobile-detect' );



export default new class Device {
	
	
	constructor() {
		this.IS_DESKTOP	= null;
		this.IS_MOBILE	= null;
		this.IS_TABLET	= null;
		this.IS_PHONE	= null;
	}
	
	
	init( $html = $( 'html' ) ) {
		this._initDOM( $html );
		this._initEl();
	}
	
	
	_initDOM( $html ) {
		this.$html = $html;
	}
	
	
	_initEl() {
		this.md = new MobileDetect( window.navigator.userAgent );
		
		this._setValues();
		this._setBodyClass();
	}
	
	
	_setValues() {
		this.IS_MOBILE	= this.md.mobile() !== null;
		this.IS_PHONE	= this.md.phone() !== null;
		this.IS_TABLET	= this.IS_MOBILE && !this.IS_PHONE;
		this.IS_DESKTOP	= !this.IS_MOBILE;
	}
	
	
	_setBodyClass() {
		if ( this.IS_DESKTOP === true ) {
			this.$html[0].classList.remove( 'mobile' );
			this.$html[0].classList.add( 'desktop' );
		}
		else if ( this.IS_MOBILE === true ) {
			this.$html[0].classList.remove( 'desktop' );
			this.$html[0].classList.add( 'mobile' );
		}
	}
	
	
}

