import CustomEvent from 'lib/CustomEvent';
import Main from 'controllers/Main';
import TransitionController from 'controllers/TransitionController';


export default new class extends CustomEvent {
	
	constructor() {
		super();
		
		this.classes = {};
	}
	
	
	init() {
		this._bindEvents();
	}
	
	
	register( slug, _class ) {
		this.classes[ slug ] = _class;
	}
	
	
	update( $dom ) {
		$dom.find( '[data-component]' ).not( '[data-component-init]' ).each( ( index, $item ) => this._addComponent( $item ) );
	}
	
	
	destroy( $dom ) {
		if ( $dom._LA_componentJsClass )
			$dom._LA_componentJsClass.destroy();
	}
	
	
	_bindEvents() {
		TransitionController.on( TransitionController.E.INIT_BLOCKS, this._init, this );
		TransitionController.on( TransitionController.E.DESTROY_BLOCKS, this._destroy, this );
	}
	
	
	_init() {
		Main.$body.find( '[data-component]' ).not( '[data-component-init]' ).each( ( index, $item ) => this._addComponent( $item ) );
	}
	
	
	_addComponent( $dom ) {
		if ( !this.classes[ $dom.getAttribute( 'data-component' ) ] ) {
			console.warn( 'Components | Class "' + $dom.getAttribute( 'data-component' ) + '"" not found' );
			
			return;
		}
		
		$dom.setAttribute( 'data-component-init', true );
		
		$dom._LA_componentJsClass = new this.classes[ $dom.getAttribute( 'data-component' ) ]( $( $dom ) );
	}
	
	
	_destroy( $dom ) {
		$dom.find( '[data-component-init]' ).each( ( index, $item ) => $item._LA_componentJsClass.destroy() );
	}
	
	
};

