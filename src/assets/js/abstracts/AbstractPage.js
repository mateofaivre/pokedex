import AbstractView from './AbstractView';

import Main from 'controllers/Main';
import Screen from 'controllers/Screen';
import Scroll from 'controllers/Scroll';
import Device from 'controllers/Device';

import MainLoader from 'components/statics/main-loader/js/MainLoader';

import Lazyloader from 'loaders/Lazyloader';

import Utils from 'utils/Utils';


export default class AbstractPage extends AbstractView {


	constructor() {
		super();

		this.E = {
			ASSETS_LOADING_COMPLETE: 'assetsloadingcomplete'
		};

		this.assetsToLoad = null;
	}


	initDOM( $wrapper ) {
		this.$pageCont = $wrapper;
		this.$content  = this.$pageCont.find( '.page_content' );
	}


	initEl( transState = null ) {
		this.transState = transState;

		this.setAssetsToLoad();

		this.lazyloader = new Lazyloader( this.$pageCont );
	}


	initTl() {
	}


	bindEvents() {
		Main.on( Main.E.RAF, this.raf, this );
		Screen.on( Screen.E.RESIZE, this.resize, this );
		MainLoader.on( MainLoader.E.ASSET_LOAD, this.onAssetLoad, this );
		MainLoader.on( MainLoader.E.ASSETS_LOAD_COMPLETE, this.onAssetsLoadComplete, this );
		MainLoader.on( MainLoader.E.PROGRESS_COMPLETE, this.onProgressComplete, this );
	}


	unbindEvents() {
		Main.off( Main.E.RAF, this.raf, this );
		Screen.off( Screen.E.RESIZE, this.resize, this );
		MainLoader.off( MainLoader.E.ASSET_LOAD, this.onAssetLoad, this );
		MainLoader.off( MainLoader.E.ASSETS_LOAD_COMPLETE, this.onAssetsLoadComplete, this );
		MainLoader.off( MainLoader.E.PROGRESS_COMPLETE, this.onProgressComplete, this );
	}


	setAssetsToLoad() {
		this.assetsToLoad = [
			// { name: FILE_NAME, url: Config.THEME_URL + '/assets/dist/img/IMG' }
		];
	}


	load() {
		if ( this.assetsToLoad.length === 0 )
			this.onProgressComplete();
		else
			MainLoader.load( this.assetsToLoad );
	}


	onAssetLoad( asset ) {
		// console.log( asset );
	}


	onAssetsLoadComplete( assets ) {
		// console.log( assets );
	}


	onProgressComplete() {
		this.emit( this.E.ASSETS_LOADING_COMPLETE );
	}


	show( transState = null, delay = 0, isFirstLoad, isSubpage ) {
		const deferred = Utils.Deferred();

		this.playShow( deferred, transState, delay, isFirstLoad, isSubpage );

		return deferred.promise;
	}


	playShow( deferred, transState, delay, isFirstLoad, isSubpage ) {
		this.onShowComplete( deferred );
	}


	onShowComplete( deferred ) {
		deferred.resolve();
	}


	hide( transState = null, delay = 0, isSubpage ) {
		const deferred = Utils.Deferred();

		this.playHide( deferred, transState, delay, isSubpage );

		return deferred.promise;
	}


	playHide( deferred, transState, delay, isSubpage ) {
		this.onHideComplete( deferred );
	}


	onHideComplete( deferred ) {
		deferred.resolve();
	}


	resize() {
		// if ( !Device.IS_DESKTOP && !Screen.IS_DESKTOP )
		// 	this.tw.scroll = gsap.set( this.$content, { clearProps: 'all' } );
		// Screen.setBodyHeight();
	}


	raf() {
		/*if ( !Device.IS_DESKTOP && !Screen.IS_DESKTOP )
			return;

		this.tw.scroll = gsap.set( this.$content, { y: -Scroll.yI, force3D: true } );*/
	}


	updateSearch() {
		console.log( 'search updated' );
	}


	updateHash() {
		console.log( 'hash updated' );
	}


	destroy() {
		super.destroy();

		if ( this.lazyloader )
			this.lazyloader.destroy();
	}


}

