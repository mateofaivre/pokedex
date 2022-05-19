


export default class Easing {
	
	
	static linear( t ) {
		return t;
	}
	
	
	static easeInQuad( t ) {
		return t * t;
	}
	
	
	static easeOutQuad( t ) {
		return t * ( 2 - t );
	}
	
	
	static easeInOutQuad( t ) {
		return t < 0.5 ?
				2 * t * t :
				-1 + ( 4 - 2 * t ) * t;
	}
	
	
	static easeInCubic( t ) {
		return t * t * t;
	}
	
	
	static easeOutCubic( t ) {
		return ( --t ) * t * t + 1;
	}
	
	
	static easeInOutCubic( t ) {
		return t < 0.5 ?
				4 * t * t * t :
				( t - 1 ) * ( 2 * t - 2 ) * ( 2 * t - 2 ) + 1;
	}
	
	
	static easeInQuart( t ) {
		return t * t * t * t;
	}
	
	
	static easeOutQuart( t ) {
		return 1 - ( --t ) * t * t * t;
	}
	
	
	static easeInOutQuart( t ) {
		return t < 0.5 ?
				8 * t * t * t * t :
				1 - 8 * ( --t ) * t * t * t;
	}
	
	
	static easeInQuint( t ) {
		return t * t * t * t * t;
	}
	
	
	static easeOutQuint( t ) {
		return 1 + ( --t ) * t * t * t * t;
	}
	
	
	static easeInOutQuint( t ) {
		return t < 0.5 ?
				16 * t * t * t * t * t :
				1 + 16 * ( --t ) * t * t * t * t;
	}
	
	
}

