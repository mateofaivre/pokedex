

import Config from 'configs/Config';


export default new class DebugController {
	
	
	constructor() {
		this.HAS_FPS_STATS		= false;
		this.HAS_MEMORY_STATS	= false;
		
		this.scripts = {
			fpsStats: {
				name: 'FPSStats',
				scripts: {
					library: {
						url:	'vendor/stats.js',
						loaded:	false
					},
					util: {
						url:	'app/utils/debug/FPSStats.js',
						loaded:	false
					}
				}
			},
			memoryStats: {
				name: 'MemoryStats',
				scripts: {
					library: {
						url:	'vendor/memory-stats.js',
						loaded:	false
					},
					util: {
						url:	'app/utils/debug/MemoryStats.js',
						loaded:	false
					}
				}
			},
			datGUI: {
				name: 'DatGUI',
				scripts: {
					library: {
						url:	'vendor/dat.gui.js',
						loaded:	false
					},
					util: {
						url:	'app/utils/debug/DatGUI.js',
						loaded:	false
					}
				}
			}
		};
	}
	
	
	init() {
		this._loadFPSStatsScripts( Config.DEBUG.FPS_STATS );
		this._loadMemoryStatsScripts( Config.DEBUG.MEMORY_STATS );
		this._loadDatGUIScripts( Config.DEBUG.DEBUG_STATS );
	}
	
	
	_loadFPSStatsScripts( isSet ) {
		if ( isSet && Config.IS_DEV )
			this._addScript( this.scripts.fpsStats );
	}
	
	
	_loadMemoryStatsScripts( isSet ) {
		if ( isSet && Config.IS_DEV )
			this._addScript( this.scripts.memoryStats );
	}
	
	
	_loadDatGUIScripts( isSet ) {
		if ( isSet && Config.IS_DEV )
			this._addScript( this.scripts.datGUI );
	}
	
	
	_addScript( obj ) {
		const scripts = obj.scripts;
		
		for ( const type in scripts ) {
			const scriptType	= scripts[ type ];
			const script		= document.createElement( 'script' );
			
			script.onload = () => {
				scriptType.loaded = true;
				this._checkScriptsLoading( obj );
			};
			
			script.src = Config.THEME_URL + '/assets/src/js/' + scriptType.url;
			document.body.appendChild( script );
		}
	}
	
	
	_checkScriptsLoading( obj ) {
		if ( obj.name == 'FPSStats' && obj.scripts.library.loaded && obj.scripts.util.loaded )
			this._initFPSStats();
		else if ( obj.name == 'MemoryStats' && obj.scripts.library.loaded && obj.scripts.util.loaded )
			this._initMemoryStats();
		else if ( obj.name == 'DatGUI' && obj.scripts.library.loaded && obj.scripts.util.loaded )
			this._initDatGUI();
	}
	
	
	_initFPSStats() {
		this.fpsStats = LA_FPSStats;
		this.fpsStats.init();
		
		this.HAS_FPS_STATS = true;
	}
	
	
	_initMemoryStats() {
		this.memoryStats = LA_MemoryStats;
		this.memoryStats.init();
		
		this.HAS_MEMORY_STATS = true;
	}
	
	
	_initDatGUI() {
		this.datGUI = LA_DatGUI;
		this.datGUI.init();
	}
	
	
	rafStart() {
		if ( this.HAS_FPS_STATS && Config.IS_DEV )
			this.fpsStats.begin();
	}
	
	
	rafEnd() {
		if ( this.HAS_FPS_STATS && Config.IS_DEV )
			this.fpsStats.end();
		
		if ( this.HAS_MEMORY_STATS && Config.IS_DEV )
			this.memoryStats.update();
	}
	
	
}

