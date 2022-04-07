export default class Pokemon {
	
	// ID du pokémon
	id;
	
	// Nom anglais du pokémon
	name;
	
	sprites = [];
	
	// Tableau contenant le nom de chaque type du pokémon.
	types;
	
	
	constructor( id, name ) {
		this.id   = id;
		this.name = name;
		
		this.types = [];
	}
}