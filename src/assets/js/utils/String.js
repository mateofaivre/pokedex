


export default class String_ {
	
	
	static removeFirstSpecificChar( string, char ) {
		if ( string.substr( 0, 1 ) == char )
			string = string.substr( 1 );
		
		
		return string;
	}
	
	
	static removeLastSpecificChar( string, char ) {
		if ( string.substr( string.length - 1, 1 ) == char )
			string = string.substr( 0, string.length - 1 );
		
		
		return string;
	}
	
	
	static strip( url, patterns ) {
		for ( let i = 0; i < patterns.length; i++ ) {
			const disal = patterns[ i ];
			
			if ( url.indexOf( disal ) === 0 )
				return url.replace( disal, '' );
		}
		
		
		return url;
	}
	
	
	static convertToUrl( string ) {
		const link	= document.createElement( 'a' );
		link.href	= string;
		
		
		return link;
	}
	
	
	static removeProtocol( url ) {
		return this.strip( url, [ 'http:', 'https:' ] );
	}
	
	
	static getPath( string, baseUrl ) {
		let path	= string.replace( baseUrl, '' );
		
		path		= path.split( '#' )[0]; // remove #hash
		path		= path.split( '?' )[0]; // remove ?search
		
		path		= this.removeFirstSpecificChar( path, '/' );
		path		= this.removeLastSpecificChar( path, '/' );
		
		
		return path;
	}
	
	
	static getSearch( string ) {
		const url	= this.convertToUrl( string );
		
		let search	= url.search.split( '?' )[1] || '';
		
		search		= this.removeFirstSpecificChar( search, '/' );
		search		= this.removeLastSpecificChar( search, '/' );
		
		
		return search;
	}
	
	
	static getHash( string ) {
		const url	= this.convertToUrl( string );
		
		let hash	= url.hash.split( '#' )[1] || '';
		
		hash		= this.removeFirstSpecificChar( hash, '/' );
		hash		= this.removeLastSpecificChar( hash, '/' );
		
		
		return hash;
	}
	
	
	static getSearchParams( string ) {
		const url		= this.convertToUrl( string );
		const params	= {};
		
		if ( url.search.length > 1 ) {
			for ( let aItKey, nKeyId = 0, aCouples = url.search.substr(1).split( '&' ); nKeyId < aCouples.length; nKeyId++ ) {
				aItKey			= aCouples[ nKeyId ].split( '=' );
				
				let key			= decodeURI( aItKey[0] );
				key				= this.removeFirstSpecificChar( key, '/' );
				key				= this.removeLastSpecificChar( key, '/' );
				
				let value		= aItKey.length > 1 ? decodeURI( aItKey[1] ) : '';
				value			= this.removeFirstSpecificChar( value, '/' );
				value			= this.removeLastSpecificChar( value, '/' );
				
				params[ key ]	= value;
			}
		}
		
		
		return params;
	}
	
	
	static getHashParams( string ) {
		const url	= this.convertToUrl( string );
		let params	= [];
		
		if ( url.hash.length > 1 ) {
			let hashes	= decodeURI( url.hash.substr(1) );
			hashes		= this.removeFirstSpecificChar( hashes, '/' );
			hashes		= this.removeLastSpecificChar( hashes, '/' );
			
			params		= hashes.split( '/' );
		}
		
		
		return params;
	}
	
	
	static getUrlInfos( url, SITE_URL ) {
		const urlInfos			= {};
		urlInfos.base			= SITE_URL;
		urlInfos.full			= this.removeProtocol( url );
		urlInfos.path			= this.getPath( urlInfos.full, this.removeProtocol( SITE_URL ) );
		urlInfos.pathParams		= urlInfos.path.split( '/' );
		urlInfos.search			= this.getSearch( urlInfos.full );
		urlInfos.searchParams	= this.getSearchParams( urlInfos.full );
		urlInfos.hash			= this.getHash( urlInfos.full );
		urlInfos.hashParams		= this.getHashParams( urlInfos.full );
		
		
		return urlInfos;
	}
	
	
}

