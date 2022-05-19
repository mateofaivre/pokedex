import Lazyload from 'vanilla-lazyload';
import AbstractView from 'abstracts/AbstractView';

export default class Lazyloader extends AbstractView {
	
	constructor($container, selector = '.img_lazy') {
		super();
		
		this.$container = $container;
		this.SELECTOR = selector;
		this.lazyloader = [];
		
		this.init();
	}
	
	
	initEl() {
		this.lazyloader = new Lazyload({
			elements_selector: this.SELECTOR,
			class_loaded: 'img_loaded',
		});
	}
	
	bindEvents() {
		super.bindEvents();
		this.$container.on('forceLoadImages', (event) => {
			this.lazyloader.update();
		});
	}
	
	update() {
		if (this.lazyloader) {
			this.lazyloader.update();
		}
	}
	
	
	destroy() {
		super.destroy();
		this.lazyloader.destroy();
	}
	
};

