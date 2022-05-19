

import Utils from 'utils/Utils';



export default new class Config {


	constructor() {

	}


	init() {
		const deferred = Utils.Deferred();

		this._setConfig();
		this._setEnvVar();
		this._setDebug();

		this._showCreditsLog();


		deferred.resolve();
		return deferred.promise;
	}


	_setConfig() {
		// for ( const varName in GRH_Config )
		// 	this[ varName ] = GRH_Config[ varName ];
	}


	_setEnvVar() {
		this.IS_DEV		= this.IS_DEV == 'true';
		this.IS_PREPROD	= this.IS_PREPROD == 'true';
		this.IS_PROD	= this.IS_PROD == 'true';
	}


	_setDebug() {
		this.DEBUG				= {};
		this.DEBUG.FPS_STATS	= true;
		this.DEBUG.MEMORY_STATS	= false;
		this.DEBUG.DEBUG_STATS	= false;

		this.DEBUG.IS_NEEDED	= this._isDebugControllerNeeded();
	}


	_isDebugControllerNeeded() {
		let needDebugController = false;

		for ( const varName in this.DEBUG ) {
			if ( this.DEBUG[ varName ] ) {
				needDebugController = true;

				break;
			}
		}


		return needDebugController;
	}


	_showCreditsLog() {
		const styleLog1 = 'padding: 0px; color:#000000; line-height:30px; font-size: 18px; font-family: georgia, serif; font-style: italic;';
		const styleLog2 = 'padding: 0px; color:#000000; line-height:20px; font-size: 12px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen-Sans", "Ubuntu", "Cantarell", "Helvetica Neue", sans-serif;';

		console.log( '%c\nwww.lesanimals.digital\n%cStudio de créations digitales\n\n', styleLog1, styleLog2 );
	}


}

