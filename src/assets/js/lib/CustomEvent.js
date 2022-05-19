

const EventEmitter = require( 'eventemitter3' );

import Config from 'configs/Config';



export default class CustomEvent {
	
	
	constructor() {
		this.e	= null;
		this.E	= {};
	}
	
	
	on( name, fct, context ) {
		if ( this.e === null ) // if the custom event doesn't exist, create it
			this.e = new EventEmitter();
		
		this.e.on( name, fct, context ); // add the listener to the custom event
	}
	
	
	once( name, fct, context ) {
		if ( this.e === null ) // if the custom event doesn't exist, create it
			this.e = new EventEmitter();
		
		this.e.once( name, fct, context ); // add the listener to the custom event
	}
	
	
	off( name, fct, context ) {
		if ( !Config.IS_PROD && this.e._events[ name ] === undefined ) {
			console.warn( `You're trying to kill a event from "${ context.constructor.name }" that doesn't exist, which refer to the following fonction:\n\n${ fct }` );
			
			return;
		}
		
		const nbEvents = this.e._events[ name ].length;
		
		this.e.removeListener( name, fct, context );
		
		if ( !Config.IS_PROD && this.e._events[ name ] !== undefined && nbEvents == this.e._events[ name ].length )
			console.warn( `The "${ name }" event, added in ${ context.constructor.name }, wasn't destroy.` );
	}
	
	
	emit( name, params ) {
		if ( this.e !== null )
			this.e.emit( name, params );
	}
	
	
}

