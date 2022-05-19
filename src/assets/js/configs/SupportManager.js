

import Utils from 'utils/Utils';

import ImgSupport from 'configs/ImgSupport';



export default new class SupportManager {
	
	
	constructor() {
		this.deferred = null;
	}
	
	
	init() {
		const deferred = Utils.Deferred();
		
		Promise.all( [
			ImgSupport.init()
		]).then( () => {
			deferred.resolve();
		} );
		
		
		return deferred.promise;
	}
	
	
}

