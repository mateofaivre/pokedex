

import Utils from 'utils/Utils';



export default class ScrollAnimator {
	
	
	/*********************************** FIRST INIT ***********************************/
	constructor(options) {

		this.coords = {
			min: 0,
			max: 0
		};
		this.scroll = 0;
		this.isBigEnough = true;
		this.isActive = true;
		this.wWidth = window.innerWidth;
		this.wHeight = window.innerHeight;
		this.isMin = null;
		this.isMax = null;
		this.isPaused = false;
		this.rafIndex = -1;
		this.hasOnMinFunction = false;
		this.hasOnMaxFunction = false;
		this.hasOnOutsideFunction = false;
		this.hasOnInsideFunction = false;
		this.hasOnUpdateFunction = false;
		this.isInside = null;

		this.options = Object.assign({
			target         : null,
			tween          : null,
			direction      : 'y',
			ease           : Linear.easeNone,
			min            : 0,
			max            : 1,
			minSize        : 0,
			speed          : 0,
			defaultProgress: 1,
			debug          : false,
			onMin          : null,
			onMax          : null,
			onOutside      : null,
			onInside       : null,
			onUpdate       : null
		}, options);

		if (this.options.target === null || this.options.target.length < 1) {
			console.error("Scroll Animator: no target specified");
		}

		if (this.options.tween === null) {
			console.error("Scroll Animator: no tween specified");
		}

		if (this.options.onMin && Utils.isFunction(this.options.onMin)) {
			hasOnMinFunction = true;
		}

		if (this.options.onMax && Utils.isFunction(this.options.onMax)) {
			hasOnMaxFunction = true;
		}

		if (this.options.onOutside && Utils.isFunction(this.options.onOutside)) {
			hasOnOutsideFunction = true;
		}

		if (this.options.onInside && Utils.isFunction(this.options.onInside)) {
			hasOnInsideFunction = true;
		}

		if (this.options.onUpdate && Utils.isFunction(this.options.onUpdate)) {
			hasOnUpdateFunction = true;
		}

		/*********************************** RESIZE ***********************************/
		window.addEventListener('resize', this.update.bind(this));
		window.addEventListener('scrollanimator:resize', this.update.bind(this));
		window.addEventListener('scrollanimator:tick', this.updatePosition.bind(this));


		this.allowScrollUpdate = true;
		this.update();
		this.repaint();
	};

	/*********************************** UPDATE POSITION ***********************************/
	updatePosition(fast) {

		// not allowed to update
		if (!this.isActive || !this.isBigEnough) {
			return;
		}


		let
			// get tween speed
			time = (fast === undefined || !fast) ? this.options.speed : 0,

			// prepare percent variable
			percent;

		// if we have no coordinates,
		// we stop there
		if (!this.coords) {
			return;
		}

		// this.scroll = this.options.direction === 'y' ? window.pageYOffset : window.pageXOffset;
		this.scroll = this.options.direction === 'y' ? window.Scrollbar.scrollTop : window.Scrollbar.scrollLeft;

		// Get percent
		percent = 1 - (this.scroll - this.coords.max) / (this.coords.min - this.coords.max);

		// Before the content
		if (percent <= 0 && this.isMin !== true) {
			this.isMin = true;
			if (this.hasOnMinFunction) {
				this.options.onMin();
			}
			// this.options.target.trigger("fateal:scrollanimator:min");
		}
		else if (percent > 0 && this.isMin !== false) {
			this.isMin = false;
		}

		// After the content
		if (percent >= 1 && this.isMax !== true) {
			this.isMax = true;
			if (this.hasOnMaxFunction) {
				this.options.onMax();
			}
			// this.options.target.trigger("fateal:scrollanimator:max");
		}
		else if (percent <= 1 && this.isMax !== false) {
			this.isMax = false;
		}

		// Check if we are outside
		if ((this.isMin === true || this.isMax === true) && this.isInside !== false) {
			this.isInside = false;
			if (this.hasOnOutsideFunction) {
				this.options.onOutside();
			}
			// this.options.target.trigger("fateal:scrollanimator:outside");
		}

		// Check if we are inside
		else if (percent <= 1 && percent >= 0 && this.isInside !== true) {
			this.isInside = true;
			if (this.hasOnInsideFunction) {
				this.options.onInside();
			}
			// this.options.target.trigger("fateal:scrollanimator:inside");
		}

		// Do we really need to update the tween ?
		if (this.isInside === false) {
			if (this.isMax) {
				// Force Max
				percent = 1;
			}
			else {
				// Force Min
				percent = 0;
			}
		}

		percent = Math.max(0, percent);
		this.debug(percent);

		// Update the tween
		if (time > 0) {
			gsap.to(this.options.tween, {duration: time, progress: percent, ease: this.options.ease});
		}
		else {
			gsap.set(this.options.tween, {progress: percent, ease: this.options.ease});
		}
	}

	/*********************************** UPDATE COORDS ***********************************/
	update() {

		this.wWidth = window.innerWidth;
		this.wHeight = window.innerHeight;

		let
			screenDimension = this.options.direction === 'y' ? this.wHeight : this.wWidth,
			offset = this.options.direction === 'y' ? Utils.offset(this.options.target).top : Utils.offset(this.options.target).left,
			itemDimension = this.options.direction === 'y' ? this.options.target.offsetHeight : this.options.target.offsetWidth,
			min = this.options.min,
			max = this.options.max;

		this.coords.min = offset - screenDimension + (screenDimension * min);
		this.coords.max = (offset - screenDimension + itemDimension) + (screenDimension * max);

		this.options.tween.paused(true);
		this.options.tween.progress(this.options.defaultProgress);

		if (this.wWidth < this.options.minSize) {
			this.isBigEnough = false;
			// window.removeEventListener('scroll', this.scrollHandler);
			scrollbar.removeListener(this.scrollHandler.bind(this));
		}
		else {
			this.isBigEnough = true;
			// window.addEventListener('scroll', this.scrollHandler.bind(this), {passive: true});
			window.Scrollbar.addListener(this.scrollHandler.bind(this));
			this.scrollHandler();
			this.updatePosition(true);
		}

		if (this.hasOnUpdateFunction) {
			this.options.onUpdate(this.coords);
		}
		// this.options.target.trigger("fateal:scrollanimator:update", [this.coords]);

	}

	/*********************************** SCROLL ***********************************/
	scrollHandler(event) {
		this.allowScrollUpdate = true;
	}

	repaint() {
		if (this.allowScrollUpdate) {
			this.updatePosition();
			this.allowScrollUpdate = false;
		}
		this.rafIndex = window.requestAnimationFrame(this.repaint.bind(this));
	}

	/*********************************** EXTERNAL UPDATE TWEEN ***********************************/
	updateTween(tween) {
		if (this.options.tween) {
			this.options.tween.kill();
		}
		this.options.tween = tween;
		this.options.tween.paused(true);
		this.options.tween.progress(this.options.defaultProgress);
		this.allowScrollUpdate = true;
		this.update();
	}

	/*********************************** PAUSE / RESUME ***********************************/
	pause() {
		if (!this.isPaused) {
			window.removeEventListener('scroll', this.scrollHandler);
			window.removeEventListener('resize', this.update);
			this.isActive = false;
			window.cancelAnimationFrame(this.rafIndex);
			this.rafIndex = undefined;
			this.isPaused = true;
		}
	}

	resume() {
		if (this.isPaused) {
			if (this.wWidth < this.options.minSize) {
				window.removeEventListener('scroll', this.scrollHandler);
			}
			else {
				window.addEventListener('scroll', this.scrollHandler.bind(this), {passive: true});
			}
			window.addEventListener('resize', this.update.bind(this));
			this.isPaused = false;
			this.repaint();
		}
	}

	/*********************************** DESTROY ***********************************/
	destroy() {
		this.allowScrollUpdate = false;
		window.cancelAnimationFrame(this.rafIndex);
		this.rafIndex = undefined;
		this.isActive = false;
		window.removeEventListener('scroll', this.scrollHandler);
		window.removeEventListener('resize', this.update);
		// window.removeEventListener('fateal:scrollanimator:tick', this.updatePosition);
		if (this.options.tween) {
			this.options.tween.paused(true);
			this.options.tween.progress(this.options.defaultProgress);
			this.options.tween.kill();
		}
	}

	debug(string) {
		if (this.options.debug === true) {
			console.log(string);
		}
	}
	
	
}

