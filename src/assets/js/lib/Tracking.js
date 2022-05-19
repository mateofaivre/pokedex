export default new class Tracking {
	constructor() {
	}

	// Optimisation
	addDataToLayer(vars) {
		window.dataLayer = window.dataLayer || [];
		dataLayer.push(vars);
	}
};
