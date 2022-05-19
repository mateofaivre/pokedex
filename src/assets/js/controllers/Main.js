// import CustomEvent from 'lib/CustomEvent';
// import $ from 'cash-dom';
// import gsap from "gsap";
// import Config from 'configs/Config';
//
// import Device from 'controllers/Device';
// import Screen from 'controllers/Screen';
// import Scroll from 'controllers/Scroll';
// // import Mouse from 'controllers/Mouse';
// // import Orientation from 'controllers/Orientation';
// import ComponentsManager from 'controllers/ComponentsManager';
//
// import Utils from 'utils/Utils';
// import DebugController from 'utils/debug/DebugController';
//
// import MainLoader from 'components/statics/main-loader/js/MainLoader';
//
//
//
// export default new class Main extends CustomEvent {
//
//
// 	constructor() {
// 		super();
//
// 		this.E = {
// 			INIT_STATIC_VIEW: 'init_static_view',
// 			RAF:              'raf'
// 		};
//
// 		this.INERTIA = 0.09;
// 	}
//
//
// 	init() {
// 		const deferred = Utils.Deferred();
//
// 		this._initDOM();
// 		this._initEl();
// 		this._bindEvents();
//
// 		this._initStaticViews();
//
// 		this._resize();
//
//
// 		deferred.resolve();
// 		return deferred.promise;
// 	}
//
//
// 	_initDOM() {
// 		this.$window   = $( window );
// 		this.$html     = $( 'html' );
// 		this.$title    = this.$html.find( 'head title' );
// 		this.$body     = $( document.body );
// 		this.$mainCont = $( document.getElementById( 'main_container' ) );
// 		this.$pageWrap = $( document.getElementById( 'page_wrapper' ) );
// 	}
//
//
// 	_initEl() {
// 		Screen.init( this.$window, this.$body, this.$pageWrap );
// 		Scroll.init( this.$window );
// 		// Mouse.init( this.$window, Screen.cX, Screen.cY );
// 		// Touch.init( this.$window, Screen.cX, Screen.cY );
// 		// Orientation.init( this.$window, this.$body, 15, 15, false, false );
//
// 		Device.init( this.$html );
// 		ComponentsManager.init();
// 	}
//
//
// 	_bindEvents() {
// 		Screen.on( Screen.E.RESIZE, this._resize, this );
// 		gsap.ticker.add( () => this._raf() );
// 	}
//
//
// 	_initStaticViews() {
// 		this.emit( this.E.INIT_STATIC_VIEW );
// 	}
//
//
// 	_resize() {
// 		this.INERTIA = Device.IS_DESKTOP ? 0.09 : 0.15;
// 	}
//
//
// 	_raf() {
// 		DebugController.rafStart();
//
// 		this.emit( this.E.RAF );
//
// 		DebugController.rafEnd();
// 	}
//
//
// };
//
