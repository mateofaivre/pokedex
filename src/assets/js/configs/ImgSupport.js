

import Utils from 'utils/Utils';



export default new class ImgSupport {
	
	
	constructor() {
		this.deferred		= null;
		
		this.kTestImages	= {
			lossy:		'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
			lossless:	'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
			alpha:		'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
			animation:	'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA'
		};
		this.webpFeatures	= [];
		this.nbFeatures		= null;
		this.posFeature		= 0;
		
		this.WEBP = {};
	}
	
	
	init() {
		this.deferred = Utils.Deferred();
		
		this._setFeatures();
		this._setWebpSupport();
		
		return this.deferred.promise;
	}
	
	
	_setFeatures() {
		for ( const feature in this.kTestImages ) {
			this.nbFeatures++;
			
			this.webpFeatures.push( feature );
			
			this.WEBP[ feature.toUpperCase() ] = null;
		}
	}
	
	
	_setWebpSupport() {
		const feature = this.webpFeatures[ this.posFeature ];
		
		this._checkWebpFeature( feature, ( feature, isSupported ) => {
			this.posFeature++;
			
			this.WEBP[ feature.toUpperCase() ] = isSupported;
			
			if ( this.posFeature < this.nbFeatures )
				this._setWebpSupport();
			else
				this._onCheckSupportComplete();
		} );
	}
	
	
	_checkWebpFeature( feature, callback ) {
		const img = new Image();
		
		img.onload = () => {
			const result = img.width > 0 && img.height > 0;
			callback( feature, result );
		};
		img.onerror = () => callback( feature, false );
		
		img.src = 'data:image/webp;base64,' + this.kTestImages[ feature ];
	}
	
	
	_onCheckSupportComplete() {
		this.deferred.resolve();
	}
	
	
}

