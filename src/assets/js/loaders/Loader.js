

const fetchLoader = require( 'fetch-loader' );

import AbstractView from 'abstracts/AbstractView';



export default class Loader extends AbstractView {
	
	
	constructor( isOnFileLoad = true, options = {} ) {
		super();
		
		this.isOnFileLoad = isOnFileLoad;
		
		this.E = {
			FILE_LOAD:	'fileload',
			COMPLETE:	'complete'
		};
		
		this.preloader	= null;
		this.data		= [];
		
		this.init( options );
	}
	
	
	init( options ) {
		this._setOptions( options );
		
		super.init();
	}
	
	
	_setOptions( options ) {
		this.options = {
			parallel:	88,
			headreq:	false
		};
		
		Object.assign( this.options, this.options, options );
	}
	
	
	initEl() {
		this.preloader = new fetchLoader();
	}
	
	
	bindEvents() {
		if ( this.isOnFileLoad )
			this.preloader.on( 'file', this._onFileLoad.bind( this ) );
		this.preloader.on( 'complete', this._onComplete.bind( this ) );
	}
	
	
	unbindEvents() {
		if ( this.isOnFileLoad )
			this.preloader.off( 'file', this._onFileLoad.bind( this ) );
		this.preloader.off( 'complete', this._onComplete.bind( this ) );
	}
	
	
	destroy() {
		super.destroy();
		
		this.preloader.reset();
	}
	
	
	load( items ) {
		if ( items.length !== 0 )
			this.preloader.load( items, this.options );
		else
			this._onComplete( null );
	}
	
	
	_onFileLoad( file ) {
		this.emit( this.E.FILE_LOAD, file );
	}
	
	_onComplete( files ) {
		this.emit( this.E.COMPLETE, files );
	}
	
	
};

