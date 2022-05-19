import Page from 'components/pages/page/js/Page';
import FrontPageSlider from "./FrontPageSlider";
import FrontPageInstagram from "./FrontPageInstagram";
import FrontPageAboutSlider from "./FrontPageAboutSlider";
import Form from 'components/partials/form/js/Form';
import AbstractPage from "abstracts/AbstractPage";
import SliderBeforeAfter from "./SliderBeforeAfter";


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
		if (this.$pageCont.find('.fp_instagram').length) {
			this.$instagram = new FrontPageInstagram(this.$pageCont.find('.fp_instagram'));
			// this.$instagram.once(this.$instagram.E.LOADED, this.lazyloader.update, this);
		}
		this.$about_slider = new FrontPageAboutSlider(this.$pageCont.find('.fp_performances'));
		this.$before_after_slider = new SliderBeforeAfter(this.$pageCont.find('.realizations__wrapper'));
		
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
		if (this.$instagram) {
			this.$instagram.destroy();
		}
		this.$about_slider.destroy();
		this.$before_after_slider.destroy();
		super.destroy();
	}
	
	
}

