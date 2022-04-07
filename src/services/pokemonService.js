import axios from "axios";
import Pokemon from "../models/pokemon";


export default class PokemonService {
	getPokemons() {
		return new Promise( resolve => {
			const result = [];
			axios.get( 'https://pokeapi.co/api/v2/pokemon?limit=100' ).then( response => {
				response.data.results.forEach( p => {
					// On découpe l'URL pour chaque '/'
					const urlFragments = p.url.split( '/' );
					
					// L'id du pokémon est contenu avant le dernier '/'
					const pokemonId     = urlFragments[ urlFragments.length - 2 ];
					// const pokemonSprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/" + pokemonId + ".png";
					const pokemonSprite = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemonId + ".png";
					const pokemon       = new Pokemon( pokemonId, p.name );
					
					pokemon.sprite = pokemonSprite;
					pokemon.gif    = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/" + pokemonId + ".gif";
					
					result.push( pokemon );
				} )
				
				// On retourne le tableau de pokémons.
				resolve( result );
			} )
		} )
	}
	
	
	getPokemon( id ) {
		return new Promise( resolve => {
			const searchInput = document.querySelector( '.search--input' )
			
			axios.get( 'https://pokeapi.co/api/v2/pokemon/' + id )
				.then( response => {
					console.log( 'singulier' )
					searchInput.classList.remove( "search--input--error" )
					
					// Contient les données du pokémon
					const pokemonData = response.data;
					
					const types = pokemonData.types.map( t => {
						return t.type.name
					} )
					
					const weight = ( pokemonData.weight / 10 );
					const height = ( pokemonData.height / 10 );
					const pv     = pokemonData.stats[ 0 ].base_stat;
					
					// Mappe le nom de chaque ability pour le récupérer sous forme de tableau.
					const abilities = pokemonData.abilities.map( a => {
						return a.ability.name;
					} )
					
					// Instancie le pokémon.
					const result = new Pokemon( pokemonData.id, pokemonData.name );
					// On affecte les sprites.
					result.sprites.push( pokemonData.sprites.other[ 'official-artwork' ].front_default, pokemonData.sprites.other.dream_world.front_default, pokemonData.sprites.other.home.front_default, pokemonData.sprites.other.home.front_shiny )
					console.log( result.sprites )
					
					result.sprites.forEach( sprite => {
							if ( sprite == null ) {
								result.sprites.splice( result.sprites.indexOf(sprite), 1 )
							}
						}
					)
					
					console.log(result.sprites)
					
					// On affecte les types.
					result.types     = types;
					result.weight    = weight;
					result.height    = height;
					result.pv        = pv;
					result.abilities = abilities;
					
					const pokemonId = result.id.toString().padStart( 3, "0" );
					const soundUrl  = `https://www.pokebip.com/pokedex/cris/6g/${pokemonId}.mp3`
					result.sound    = soundUrl;
					
					resolve( result );
				} )
				.catch( function ( error ) {
					console.log( error )
					searchInput.classList.add( "search--input--error" )
				} )
		} );
	}
}