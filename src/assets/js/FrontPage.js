import FrontPageSlider from "./introSlider";
import AbstractPage from "./abstracts/AbstractPage";


export default class FrontPage extends AbstractPage {


	constructor() {
		super();
	}


	initDOM( $wrapper ) {
		super.initDOM( $wrapper );
	}


	initEl(state = null) {
		super.initEl(state);
		this.$intro_slider = new FrontPageSlider(this.$pageCont.find('.fp_intro_slider'));

	}


	initTl() {}




	setAssetsToLoad() {
		this.assetsToLoad = [
			// { name: FILE_NAME, url: Config.THEME_URL + '/assets/dist/img/IMG' }
		];
	}


	/*resize() {
		super.resize();
	}*/


	/*raf() {
		super.raf();
	}*/


	destroy() {
		this.$intro_slider.destroy();
		super.destroy();
	}


}

