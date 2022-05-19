

import CustomEvent from 'lib/CustomEvent';

import Config from 'configs/Config';

import Screen from 'controllers/Screen';

import Math_ from 'utils/Math';



export default class AbstractView extends CustomEvent {
	
	
	constructor() {
		super();
		
		this.eh		= {}; // event handler
		this.tw		= {}; // tween
		this.tl		= {}; // timeline
		this.sto	= {}; // set timeout
		this.si		= {}; // set interval
		
		this.isInit	= false;
	}
	
	
	get isInit() {
		return this._isInit;
	}
	
	
	set isInit( value ) {
		this._isInit = value;
		
		if ( value )
			this.resize();
	}
	
	
	init( $wrapper = null, transState ) {
		this.initDOM( $wrapper );
		this.initEl( transState );
		this.initTl();
		this.bindEvents();
		
		this.resize();
	}
	
	
	initDOM( $wrapper ) {}
	
	
	initEl( transState ) {}
	
	
	initTl() {}
	
	
	bindEvents() {}
	
	
	unbindEvents() {}
	
	
	show() {
		// console.log( 'AbstractView.show() — ', this.constructor.name );
	}
	
	
	hide() {
		// console.log( 'AbstractView.hide() — ', this.constructor.name );
	}
	
	
	resize() {
		// console.log( 'AbstractView.resize() — ', this.constructor.name );
	}
	
	
	raf() {
		// console.log( 'AbstractView.raf() — ', this.constructor.name );
	}
	
	
	/*getImgSrc( $img ) {
		let src = null;
		
		if ( Screen.DPR >= 3 )
			src = $img.getAttribute( 'data-src-3x' );
		
		if ( !src && Screen.DPR >= 2 )
			src = $img.getAttribute( 'data-src-2x' );
		
		if ( !src )
			src = $img.getAttribute( 'data-src' );
		
		
		return src;
	}*/
	
	
	destroy() {
		this.unbindEvents();
		
		this.destroyGSAP();
		this.destroyTimer();
	}
	
	
	destroyGSAP() {
		/* tween */
		for ( const tween in this.tw )
			this.killTween( tween );
		
		/* timeline */
		for ( const timeline in this.tl )
			this.killTimeline( timeline );
		
		this.tl = {};
		this.tw = {};
	}
	
	
	killTween( twName ) {
		if ( !this.tw[ twName ] ) {
			if ( !Config.IS_PROD )
				console.warn( `You're trying to kill a tween named "${ twName }" that doesn't exist.` );
			
			return;
		}
		
		this.tw[ twName ].kill();
		
		this.tw[ twName ] = null;
	}
	
	
	killTimeline( tlName ) {
		if ( !this.tl[ tlName ] ) {
			if ( !Config.IS_PROD )
				console.warn( `You're trying to kill a timeline named "${ tlName }" that doesn't exist.` );
			
			return;
		}
		
		this.tl[ tlName ].pause();
		this.tl[ tlName ].clear();
		this.tl[ tlName ].kill();
		
		this.tl[ tlName ] = null;
	}
	
	
	
	destroyTimer() {
		/* setTimeout */
		for ( const sto in this.sto )
			clearTimeout( this.sto[ sto ] );
		
		/* setInterval */
		for ( const si in this.si )
			clearInterval( this.si[ si ] );
	}
	
	
}

