import CustomEvent from 'lib/CustomEvent';

import Config from 'configs/Config';

import Main from 'controllers/Main';
import PagesController from 'controllers/PagesController';

import Utils from 'utils/Utils';
import String_ from 'utils/String';



export default new class Router extends CustomEvent {
	
	
	constructor() {
		super();
		
		this.currentUrl     = null;
		this.lastTrackedUrl = null;
	}
	
	
	init() {
		PagesController.init();
		
		this._bindEvents();
		
		this._changePage( window.location.href, false );
	}
	
	
	_bindEvents() {
		Main.$window.on( 'popstate', this._onPopState.bind( this ) );
		Main.$window.on( 'hashchange', this._onHashChange.bind( this ) );
		Main.$window.on( 'click', this._clickHandler.bind( this ) );
	}
	
	
	_changePage( url, updatePushState ) {
		this.currentUrl = url;
		
		PagesController.changePage( this.currentUrl, updatePushState );
	}
	
	
	/* On click on any link */
	_clickHandler( e ) {
		const link = Utils.findParent( 'a', e.target );
		
		if ( !link )
			return;
		
		
		const url          = link.getAttribute( 'href' );
		const prevUrlInfos = String_.getUrlInfos( this.currentUrl, Config.SITE_URL );
		const urlInfos     = String_.getUrlInfos( url, Config.SITE_URL );
		const urlChanges   = this._setUrlPartChange( prevUrlInfos, urlInfos );
		
		const clickTester = this._clickTester( e, link );
		
		if ( clickTester && urlChanges.isPageChange ) {
			e.preventDefault();
			this._changePage( url, true );
		}
		else if ( clickTester && urlChanges.isSearchChange ) {
			e.preventDefault();
			
			this.currentUrl = url;
			history.pushState( {}, null, this.currentUrl );
			
			this._changeSearch();
		}
	}
	
	
	/* Check that the link is clickable */
	_clickTester( e, link ) {
		const href = link.getAttribute( 'href' );
		
		// can't push state
		if ( !window.history.pushState )
			return false;
		
		// middle click, cmd click, and ctrl click
		if ( e.which > 1 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey )
			return false;
		
		// ignore target with _blank target
		if ( link.target && link.target === '_blank' )
			return false;
		
		// check if it's the same domain
		if ( window.location.protocol !== link.protocol || window.location.hostname !== link.hostname || href.indexOf( String_.removeProtocol( Config.SITE_URL ) ) < 0 )
			return false;
		
		// ignore case when a hash is being tacked on the current URL
		/*if ( window.location.href.indexOf( href ) > -1 && href.indexOf( '#' ) > -1 )
			return false;*/
		
		// ignore case where there is download attribute
		if ( typeof link.getAttribute( 'download' ) === 'string' ) {
			return false;
		}
		
		// in case you're trying to load the same page
		if ( Utils.trim( this.currentUrl, '/' ) === Utils.trim( href, '/' ) ) {
			e.preventDefault();
			return false;
		}
		
		if ( href.substring( 0, 1 ) === '#' )
			return false;
		
		if ( href.match( /[^/]+(jpg|jpeg|png|gif|pdf|doc|docx|xls|xlsx)$/ ) )
			return false;
		
		if ( link.hasAttribute( 'data-no-ajax' ) )
			return false;
		
		if ( link.classList && ( link.classList.contains( 'fateal-ajax-navigation-next-button' ) || link.classList.contains( 'fateal-ajax-navigation-previous-button' ) ) ) {
			e.preventDefault();
			return false;
		}
		
		/*if ( this.currentView.name === 'error404' ) {
			location.reload();
			return false;
		}*/
		
		if ( href.indexOf( 'wp-admin' ) > 0 || href.indexOf( 'wp-login' ) > 0 )
			return false;
		
		if ( PagesController.isFreezed ) {
			e.preventDefault();
			PagesController.nextUrlToLoad = href;
			return false;
		}
		
		
		return true;
	}
	
	
	_setUrlPartChange( prevUrl, url ) {
		return {
			isPageChange:   prevUrl.path != url.path,
			isSearchChange: prevUrl.search != url.search,
			isHashChange:   prevUrl.hash != url.hash
		};
	}
	
	
	_onPopState( e ) {
		const url          = window.location.href;
		const prevUrlInfos = String_.getUrlInfos( this.currentUrl, Config.SITE_URL );
		const urlInfos     = String_.getUrlInfos( url, Config.SITE_URL );
		const urlChanges   = this._setUrlPartChange( prevUrlInfos, urlInfos );
		
		if ( urlChanges.isPageChange )
			this._changePage( url, false );
		else if ( urlChanges.isSearchChange ) {
			this.currentUrl = url;
			
			this._changeSearch();
		}
	}
	
	
	_onHashChange() {
		const url          = window.location.href;
		const prevUrlInfos = String_.getUrlInfos( this.currentUrl, Config.SITE_URL );
		const urlInfos     = String_.getUrlInfos( url, Config.SITE_URL );
		const urlChanges   = this._setUrlPartChange( prevUrlInfos, urlInfos );
		
		if ( urlChanges.isHashChange && !urlChanges.isPageChange && !urlChanges.isSearchChange ) {
			this.currentUrl = url;
			
			this._changeHash();
		}
	}
	
	
	_changeSearch() {
		PagesController.updateSearch();
	}
	
	
	_changeHash() {
		PagesController.updateHash();
	}
	
	
};

