

import CustomEvent from 'lib/CustomEvent';

import Scroll from 'controllers/Scroll';

import MainLoader from 'components/statics/main-loader/js/MainLoader';

import Utils from 'utils/Utils';



export default new class TransitionController extends CustomEvent {
	
	
	constructor() {
		super();
		
		this.E = {
			INIT_BLOCKS: 'init_blocks',
			DESTROY_BLOCKS: 'destroy_blocks',
			TRANSITION_COMPLETE: 'transition_complete'
		};
	}
	
	
	out( isFirstLoad, infos, current, prev, isSubpage ) {
		const deferred = Utils.Deferred();
		
		this._playOut( deferred, isFirstLoad, infos, current, prev, isSubpage );
		
		
		return deferred.promise;
	}
	
	
	_playOut( deferred, isFirstLoad, infos, current, prev, isSubpage ) {
		const delay = this._getDelay( isFirstLoad, infos, current.id, prev.id );
		
		if ( isFirstLoad ) {
			Promise.all( [
				MainLoader.hide( isFirstLoad, infos.transState )
			] ).then( () => {
				current.page.show( infos.transState, delay, isFirstLoad, isSubpage );
				this._onOutComplete( deferred, isFirstLoad, infos, current, prev );
			} );
		}
		else {
			prev.page.isInit = false;
			
			Promise.all( [
				MainLoader.hide( isFirstLoad ),
				current.page.show( infos.transState, delay, isFirstLoad, isSubpage )
			] ).then( () => {
				this._onOutComplete( deferred, isFirstLoad, infos, current, prev );
			} );
			
			
			/*if ( infos.transState != '_NEED_TO_SCROLL_' ) {
				const y			= this._getScrollTo( infos, prev );
				this.scrollY	= Scroll.yI;
				const duration	= Math.min( 1, Math.abs( this.scrollY - y ) / 200 );
				
				this.tlScroll = gsap.timeline()
					.to( this, { duration:duration, scrollY:y, ease:'power2.inOut', onUpdate:() => {
						Scroll.setScrollY( this.scrollY );
					}, onComplete:this._onScrollComplete.bind( this, deferred, isFirstLoad, infos, current, prev, delay ) }, 0 );
			}*/
		}
	}
	
	
	_onOutComplete( deferred, isFirstLoad, infos, current, prev ) {
		Scroll.setScrollY( 0 );
		this.emit(this.E.INIT_BLOCKS);
		
		// if ( infos.transState == '_STATE_' )
			// 	current.doSomething();
		
		deferred.resolve();
	}
	
	
	in( isFirstLoad, infos, current, prev, isSubpage ) {
		const deferred = Utils.Deferred();
		
		this._playIn( deferred, isFirstLoad, infos, current, prev, isSubpage );
		
		
		return deferred.promise;
	}
	
	
	_playIn( deferred, isFirstLoad, infos, current, prev, isSubpage ) {
		Promise.all( [
			MainLoader.show()
		] ).then( () => {
			this._onInComplete( deferred, isFirstLoad, infos, current, prev )
		} );
	}
	
	
	_onInComplete( deferred, isFirstLoad, infos, current, prev ) {
		this.emit( this.E.DESTROY_BLOCKS, current.$dom );
		deferred.resolve();
	}
	
	
	_getDelay( isFirstLoad, infos, currentId, prevId ) {
		const transState = infos.transState;
		
		let delay = 0;
		
		// if ( transState == '_STATE_' )
		// 	delay = set specific delay;
		
		
		return delay;
	}
	
	
	_getScrollTo( infos, prev ) {
		let y = 0;
		
		// if ( infos.transState == '_STATE_' )
		// 	y = set specific y;
		
		
		return y;
	}
	
	
	/*_onScrollComplete( deferred, isFirstLoad, infos, current, prev, delay ) {
		prev.page.isInit = false;
		current.page.init( current.$dom, infos.transState );
		
		Promise.all( [
			prev.page.hide( infos.transState ),
			current.page.show( infos.transState, delay )
		] ).then( () => {
			this._onOutComplete( deferred, isFirstLoad, infos, current, prev );
		} );
	}*/
	
	
}

