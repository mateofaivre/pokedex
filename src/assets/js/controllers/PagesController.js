import CustomEvent from 'lib/CustomEvent';

import Config from 'configs/Config';

import TransitionController from 'controllers/TransitionController';
import Main from 'controllers/Main';

import AbstractPage from 'abstracts/AbstractPage';

import TrackingGA from 'components/statics/tracking-ga/js/TrackingGA';

import Utils from 'utils/Utils';
import String_ from 'utils/String';


export default new class PagesController extends CustomEvent {
	
	
	constructor() {
		super();
		
		this.E = {
			UPDATE_DOM: 'updatedom'
		};
		
		this.pages = {};
		this.infos = {};
		
		this.isFirstLoad   = true;
		this.isFreezed     = true;
		this.isLoading     = true;
		this.nextUrlToLoad = null;
		
		this.prev    = {};
		this.current = {};
	}
	
	
	addPage( slug, classReference ) {
		this.pages[ slug ] = classReference;
	}
	
	
	init() {
		this._initDOM();
		this._initEl();
	}
	
	
	_initDOM() {
		this.$adminBar = $( document.getElementById( 'wpadminbar' ) );
	}
	
	
	_initEl() {
		this.hasAdmin = this.$adminBar.length > 0;
	}
	
	
	changePage( url, updatePushState ) {
		if ( !this.isFirstLoad && this.isFreezed ) {
			this.nextUrlToLoad = url;
			return;
		}
		
		this.freezed = true;
		this.loading = true;
		
		this.prev.url    = this.current.url || null;
		this.current.url = url;
		
		if ( this.isFirstLoad ) {
			this._initStaticViews();
			
			this._setView( Main.$pageWrap );
			this._setInfos( this.prev.id, this.current.id );
			
			this.current.page.on( this.current.page.E.ASSETS_LOADING_COMPLETE, this._onAssetsLoadingComplete, this );
			this.current.page.init( this.current.$dom, this.infos.transState );
			this.current.page.load();
		}
		else {
			if ( updatePushState )
				history.pushState( {}, null, this.current.url );
			
			this._loadPage( url );
		}
	}
	
	
	_initStaticViews() { // can be customized — can be usefull to init views before Config, Main & SupportManager init
		
	}
	
	
	_setView( $wrapper ) {
		this.prev.id   = this.current.id || null;
		this.prev.page = this.current.page || null;
		this.prev.$dom = this.current.$dom || null;
		
		this.current.$dom = $wrapper.find( '.page_container' );
		this.current.id   = this.current.$dom[ 0 ].getAttribute( 'data-view-id' );
		
		if ( this.pages[ this.current.id ] === undefined )
			this.current.page = new AbstractPage();
		else
			this.current.page = new this.pages[ this.current.id ]();
	}
	
	
	_setInfos( prevId, currentId ) { // can be customized
		this.infos = {
			transState: this._getTransitionState( prevId, currentId )
		};
	}
	
	
	_getTransitionState( prevId, currentId ) { // can be customized
		let transState = 'default';
		
		// if ( prevId === null && currentId == 'front_page' )
		// 	transState = 'home';
		
		
		return transState;
	}
	
	
	_loadPage( url ) {
		this.isSubpage = this._getSubpageChange( this.prev.url, this.current.url );
		
		Promise.all( [
			TransitionController.in( this.isFirstLoad, this.infos, this.current, this.prev, this.isSubpage ),
			this._ajaxLoad( url )
		] ).then( () => {
			this.current.page.on( this.current.page.E.ASSETS_LOADING_COMPLETE, this._onAssetsLoadingComplete, this );
			this.current.page.init( this.current.$dom, this.infos.transState );
			this.current.page.load();
		} );
	}
	
	
	_getSubpageChange( prevUrl, url ) {
		const prevUrlInfos = String_.getUrlInfos( prevUrl, Config.SITE_URL );
		const urlInfos     = String_.getUrlInfos( url, Config.SITE_URL );
		
		
		return prevUrlInfos.pathParams[ 0 ] === urlInfos.pathParams[ 0 ];
	}
	
	
	_ajaxLoad( url ) {
		const deferred = Utils.Deferred();
		
		const XHRt = new XMLHttpRequest();
		XHRt.open( 'GET', url, true );
		XHRt.onload       = () => {
			this._onAjaxLoadComplete( deferred, $( XHRt.response ) );
		};
		XHRt.responseType = 'document';
		XHRt.send();
		
		
		return deferred.promise;
	}
	
	
	_onAjaxLoadComplete( deferred, $currentFullDom ) {
		this._setView( $currentFullDom );
		this._setInfos( this.prev.id, this.current.id );
		this._updateDom( $currentFullDom );
		this._updateContent( 'add-current' );
		
		deferred.resolve();
	}
	
	
	_updateDom( $currentFullDom ) { // can be customized
		this._updateAdmin( $currentFullDom );
		this._updateGlobal( $currentFullDom );
		this._updateMenuClass( '#main_menu li', $currentFullDom );
		// this._updateLangLink( '.menu-lg-link', $currentFullDom );
		
		this.emit( this.E.UPDATE_DOM );
	}
	
	
	_updateAdmin( $currentFullDom ) {
		if ( this.hasAdmin )
			this.$adminBar[ 0 ].innerHTML = $currentFullDom.find( '#wpadminbar' )[ 0 ].innerHTML;
	}
	
	
	_updateGlobal( $currentFullDom ) {
		Main.$body[ 0 ].className  = $currentFullDom[ 0 ].body.className;
		Main.$title[ 0 ].innerHTML = $currentFullDom[ 0 ].title;
	}
	
	
	_updateMenuClass( selector, $currentFullDom ) {
		const $menuLinks    = Main.$mainCont.find( selector );
		const $newMenuLinks = $currentFullDom.find( selector );
		
		for ( let i = 0; i < $menuLinks.length; i++ )
			$menuLinks[ i ].className = $newMenuLinks[ i ].className;
	}
	
	
	_updateLangLink( selector, $currentFullDom ) {
		const $lgLinks    = Main.$mainCont.find( selector );
		const $newLgLinks = $currentFullDom.find( selector );
		
		for ( let i = 0; i < $lgLinks.length; i++ )
			$lgLinks[ i ].href = $newLgLinks[ i ].href;
	}
	
	
	_onAssetsLoadingComplete() {
		this.current.page.off( this.current.page.E.ASSETS_LOADING_COMPLETE, this._onAssetsLoadingComplete, this );
		
		this.loading = false;
		
		TransitionController.out( this.isFirstLoad, this.infos, this.current, this.prev, this.isSubpage ).then( () => {
			this._onTransitionComplete();
		} );
	}
	
	
	_onTransitionComplete() {
		this.freezed = false;
		
		if ( this.isFirstLoad )
			this.isFirstLoad = false;
		else {
			this._destroyPage();
			this._updateContent( 'remove-prev' );
			this._checkUrl();
		}
		
		this.current.page.isInit = true;
	}
	
	
	_updateContent( action ) {
		if ( action === 'add-current' ) {
			Main.$pageWrap[ 0 ].classList.add( 'transition' );
			Main.$pageWrap.append( this.current.$dom );
		}
		else if ( action === 'remove-prev' ) {
			this.prev.$dom.remove();
			Main.$pageWrap[ 0 ].classList.remove( 'transition' );
		}
	}
	
	
	_destroyPage() {
		if ( this.prev.page ) {
			this.prev.page.destroy();
			this.prev.page = null;
		}
	}
	
	
	_checkUrl() {
		if ( this.nextUrlToLoad ) {
			this._loadPage( this.nextUrlToLoad, false );
			this.nextUrlToLoad = null;
		}
		else {
			const params = {
				url:   this.current.url,
				title: Main.$title[ 0 ].innerHTML
			};
			
			TrackingGA.updateGA( params );
		}
	}
	
	
	updateSearch() {
		this.current.page.updateSearch();
	}
	
	
	updateHash() {
		this.current.page.updateHash();
	}
	
	
	set isFreezed( value ) {
		this._isFreezed = value;
	}
	
	
	get isFreezed() {
		return this._isFreezed;
	}
	
	
	set nextUrlToLoad( value ) {
		this._nextUrlToLoad = value;
	}
	
	
	get nextUrlToLoad() {
		return this._nextUrlToLoad;
	}
	
	
	set freezed( value ) {
		if ( value ) {
			Main.$html[ 0 ].classList.add( 'freezed' );
			this.isFreezed = true;
		}
		else {
			this.isFreezed = false;
			Main.$html[ 0 ].classList.remove( 'freezed' );
		}
		
	}
	
	
	set loading( value ) {
		if ( value ) {
			Main.$html[ 0 ].classList.add( 'loading' );
			this.isLoading = true;
		}
		else {
			this.isLoading = false;
			Main.$html[ 0 ].classList.remove( 'loading' );
		}
		
	}
	
	
};

