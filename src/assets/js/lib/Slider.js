import {gsap} from "gsap";
import {Draggable} from "gsap/Draggable";
import AbstractView from 'abstracts/AbstractView';
import Screen from 'controllers/Screen';
import Utils from 'utils/Utils';

export default class Slider extends AbstractView {


	/**
	 * Initialize a new slider
	 * @param $wrapper CashDomElement
	 * @returns {Slider}
	 */
	constructor($wrapper) {
		super();

		this.$wrapper = $wrapper;

		this.currentIndex = 0;

		// dimensions
		this.sliderWidth = 100;
		this.wrapperWidth = 100;
		this.itemWidths = [];
		this.itemPositions = [];

		this.init();
	}


	init() {
		this._setOptions();
		super.init();
	}


	_setOptions() {
		this.loop = this.$wrapper[0].getAttribute('data-loop') === 'true';
		this.pagination = this.$wrapper[0].getAttribute('data-pagination') === 'true';
		this.auto = (this.$wrapper[0].getAttribute('data-auto') && parseInt(this.$wrapper[0].getAttribute('data-auto')) > 0) ? this.$wrapper[0].getAttribute('data-auto') : false;
		this.autoForced = !!(this.$wrapper[0].getAttribute('data-auto-forced') && (this.$wrapper[0].getAttribute('data-auto-forced') === '1' || this.$wrapper[0].getAttribute('data-auto-forced') === 1));
		this.zoom = this.$wrapper[0].getAttribute('data-zoom') === 'true';
		this.autoAlternate = true;
	}


	initDOM() {
		this.$container = this.$wrapper.find('.slider-container');
		this.$items = this.$container.find('.slider-item');
		this.$pagination = this.$wrapper.find('.slider-pagination');
		this.$pagItems = this.$pagination.find('.slider-pagination-item');
		this.$prev = this.$wrapper.find('.slider-btn-prev');
		this.$next = this.$wrapper.find('.slider-btn-next');
		this.$autoProgress = this.$wrapper.find('.slider-auto-progress');
	}


	initEl() {
		super.initEl();

		if (this.zoom) {
			this._initZoom();
		}

		this._setTrigger();

		if (this.$items.length > 1) {
			this._initDraggableManager();
		} else {
			if (this.$pagination.length) {
				this.$pagination.addClass("hidden");
			}

			if (this.$prev.length) {
				this.$prev.addClass("hidden");
			}

			if (this.$next.length) {
				this.$next.addClass("hidden");
			}

		}
	}

	bindEvents() {
		if (this.$items.length < 2) {
			return;
		}
		this.prevClickHandler = this._prevClick.bind(this);
		this.nextClickHandler = this._nextClick.bind(this);
		this.paginationClickHandler = this._paginationClick.bind(this);
		this.pauseAutoHandler = this._pauseAuto.bind(this);
		this.resumeAutoHandler = this._resumeAuto.bind(this);
		this.startAutoHandler = this._startAuto.bind(this);

		if (this.$prev) {
			this.$prev.on('click', this.prevClickHandler);
		}

		if (this.$next) {
			this.$next.on('click', this.nextClickHandler);
		}

		if (this.pagination) {
			this.$pagItems.on('click', this.paginationClickHandler);
		}

		if (this.auto) {
			this._startAuto();
			if (!this.autoForced) {
				this.$wrapper.on('mouseenter', this.pauseAutoHandler);
				this.$wrapper.on('mouseleave', this.resumeAutoHandler);
			}
		}

		Screen.on(Screen.E.RESIZE, this.resize, this);
	}

	destroy() {
		if (this.zoom) {
			this.lightGallery.destroy();
		}
		super.destroy();
	}

	_setTrigger() {
		this.$trigger = this.$wrapper;
	}

	_initDraggableManager() {
		let draggableParams = {
			type: 'x',
			trigger: this.$trigger,
			inertia: true,
			dragClickables: true,
			allowContextMenu: true,
			zIndexBoost: false,
			snap: (value) => {
				return this._getSnap(value);
			},
			onDrag: this._update,
			onThrowUpdate: this._update,
			callbackScope: this
		};

		if (this.loop) {
			this._createLoop();
		}

		if (this.pagination) {
			draggableParams.onThrowComplete = this._updatePagination;
		}

		this.$proxy = document.createElement('div');
		this.draggable = Draggable.create(this.$proxy, draggableParams)[0];

	}

	_getSnap(value) {
		const adjustedValue = value % this.sliderWidth;
		let snapValue;
		if (value > 0) {
			snapValue = -Utils.closestValueInArray(this.sliderWidth - adjustedValue, this.itemPositions);
			snapValue += this.sliderWidth + (value - adjustedValue);
		} else {
			snapValue = -Utils.closestValueInArray(-adjustedValue, this.itemPositions);
			snapValue += (value - adjustedValue);
		}

		return snapValue;
	}

	_initZoom() {
		// light gallery
		lightGallery(this.$wrapper[0], {
			selector: '.slider-item-link',
			hash: false,
			download: false,
			zoom: true,
		});
		this.lightGallery = window.lgData[this.$wrapper[0].getAttribute('lg-uid')];
	}


	resize() {
		if (this.$items.length < 2) {
			return;
		}
		this.wrapperWidth = this.$wrapper[0].offsetWidth;
		this.sliderWidth = 0;
		this.itemWidths = [];
		this.itemPositions = [];

		this._getItemsDimensions();

		if (this.loop) {
			this.tw.resize = gsap.set(this.$container, {
				x: -this.sliderWidth,
				overwrite: false,
				onComplete: this.draggable.update,
				callbackScope: this.draggable
			});
		} else {
			this.draggable.applyBounds({
				minX: -(this.sliderWidth - this.wrapperWidth),
				maxX: 0
			});
			this.tw.resize = gsap.set(this.$container, {
				x: 0,
				overwrite: false,
				onComplete: this.draggable.update,
				callbackScope: this.draggable
			});
		}

		if (this.pagination) {
			this._updatePagination();
		}
	}

	_getItemsDimensions() {
		this.sliderWidth = 0;
		this.$items.each((index, item) => {
			const width = item.offsetWidth + parseFloat(window.getComputedStyle(item).marginRight) + parseFloat(window.getComputedStyle(item).marginLeft);
			this.itemWidths.push(width);
			this.itemPositions.push(this.sliderWidth);
			this.sliderWidth += width;
		});

		this.itemPositions.push(this.sliderWidth);

		if (this.sliderWidth < this.wrapperWidth) {
			this.draggable.disable();
		} else {
			this.draggable.enable();
		}
	}


	_createLoop() {
		// just in case, remove existing clones
		this.$container.find('.clone').remove();

		// before
		const beforeItem = this.$container[0].firstChild;
		for (let i = 0; i < this.$items.length; i++) {
			const $clone = this.$items[i].cloneNode(true);
			$clone.classList.add('clone');
			this.$container[0].insertBefore($clone, beforeItem);
		}

		// after
		for (let i = 0; i < this.$items.length; i++) {
			const $clone = this.$items[i].cloneNode(true);
			$clone.classList.add('clone');
			this.$container[0].appendChild($clone);
		}

		this.$wrapper.trigger(new Event('forceLoadImages', {bubbles: true}));

	}


	_update() {
		let newX = this._getX();
		this.currentIndex = Utils.closestIndexInArray(-newX, this.itemPositions);
		this.tw.move = gsap.set(this.$container, {x: newX - this.sliderWidth, overwrite: false});
		this._updatePagination();
	}


	_prevClick(e = null) {

		if (e) {
			this.draggable.endDrag(e);
			gsap.killTweensOf(this.$trigger);
			gsap.killTweensOf(this.$proxy);
			e.preventDefault();
		}

		if (this.tw.move) {
			this.tw.move.kill();
		}

		this.currentIndex = this.currentIndex - 1 < 0 ? this.$items.length - 1 : this.currentIndex - 1;
		const newX = -this.itemPositions[this.currentIndex];
		const newXOffset = newX - this.sliderWidth;

		if (this.currentIndex === this.$items.length - 1) {
			gsap.set([this.$container, this.$proxy], {
				x: '-=' + this.sliderWidth,
			});
		}
		this.tw.move = gsap.to([this.$container, this.$proxy], {
			duration: 0.8,
			x: newXOffset,
			overwrite: false,
			onStart: this._updatePagination,
			onComplete: this._updateDraggable,
			callbackScope: this
		});

		if (this.auto) {
			this._startAuto();
		}
	}


	_nextClick(e = null) {

		if (e) {
			this.draggable.endDrag(e);
			gsap.killTweensOf(this.$trigger);
			gsap.killTweensOf(this.$proxy);
			e.preventDefault();
		}

		if (this.tw.move) {
			this.tw.move.kill();
		}

		this.currentIndex = this.currentIndex + 1 >= this.$items.length ? 0 : this.currentIndex + 1;
		const newX = -this.itemPositions[this.currentIndex];
		const newXOffset = newX - this.sliderWidth;

		if (this.currentIndex === 0) {
			gsap.set([this.$container, this.$proxy], {
				x: '+=' + this.sliderWidth,
			});
		}
		this.tw.move = gsap.to([this.$container, this.$proxy], {
			duration: 0.8,
			x: newXOffset,
			overwrite: false,
			onStart: this._updatePagination,
			onComplete: this._updateDraggable,
			callbackScope: this
		});

		if (this.auto) {
			this.autoAlternate = !this.autoAlternate;
			gsap.set(this.$autoProgress, {transformOrigin: this.autoAlternate === true ? 'left top' : 'left bottom'});
			this._startAuto();
		}
	}

	_updateDraggable() {
		this.draggable.update();
	}


	_paginationClick(e) {
		e.preventDefault();

		const index = $(e.target).index();
		let adjustedValue = this._getX();
		adjustedValue = adjustedValue + this.itemPositions[index];
		this.draggable.x -= adjustedValue;

		this.tw.move = gsap.to([this.$container, this.$proxy], {
			duration: 0.3,
			x: -(this.sliderWidth + this.itemPositions[index]),
			onStart: this._updatePagination,
			callbackScope: this
		});
	}


	_updatePagination() {
		if (!this.pagination)
			return;

		let adjustedValue = this._getX();
		let currentIndex = Utils.closestIndexInArray(-adjustedValue, this.itemPositions);
		if (currentIndex === this.$items.length) {
			currentIndex = 0;
		}
		const $currentPaginationItem = this.$pagItems[currentIndex];

		this.$pagItems.removeClass('active');
		$currentPaginationItem.classList.add('active');
	}

	_startAuto() {
		if (this.autoTw) {
			this.autoTw.kill();
		}
		this.autoTw = gsap.to(this.$autoProgress, {duration: this.auto, scaleY: this.autoAlternate === true ? 1 : 0, onComplete: this.nextClickHandler, ease: "linear"});
	}

	_pauseAuto() {
		if (this.autoTw) {
			this.autoTw.pause();
		}
	}

	_resumeAuto() {
		if (this.autoTw) {
			this.autoTw.play();
		}
	}


	// Return the x position without the clones offset
	_getX() {
		let x = this.loop ? this.draggable.x % this.sliderWidth : this.draggable.x;

		if (this.loop && x > 0) {
			x -= this.sliderWidth;
		}

		return x;
	}


}

