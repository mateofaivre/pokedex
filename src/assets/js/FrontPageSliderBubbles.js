import AbstractView from 'abstracts/AbstractView';
import Screen from "controllers/Screen";
import Main from "controllers/Main";
import {gsap} from "gsap";

export default class FrontPageSliderBubbles extends AbstractView {
	constructor($wrapper, colors) {
		super();
		this.$wrapper = $wrapper;
		this.colors = colors;
		this.color = this.colors[0];
		this.width = 100;
		this.height = 100;
		this.size = 100;
		this.numCircles = 4;
		this.circles = [];
		this.init();
	}

	initEl() {
		super.initEl();
		this.$canvas = document.createElement('canvas');
		this.$canvas = $(this.$canvas);
		this.$canvas.appendTo(this.$wrapper);
		this.ctx = this.$canvas[0].getContext('2d');
		for (let i = 0; i < this.numCircles; i++) {
			this.circles[i] = {};
			this.circles[i].x = Math.random();
			this.circles[i].y = Math.random();
			this.circles[i].dx = (Math.random() - 0.5) * 2 / (500 + (Math.random() * 2000));
			this.circles[i].dy = (Math.random() - 0.5) * 2 / (500 + (Math.random() * 2000));
			this.circles[i].size = Math.random() * 0.6 + 0.3;
		}
		this.$noiseImg = new Image();
		this.$noiseImg.addEventListener('load', () => {
			this.noisePattern = this.ctx.createPattern(this.$noiseImg, 'repeat');
		});
		this._resize();
	}

	bindEvents() {
		super.bindEvents();
		this.$noiseImg.addEventListener('load', () => {
			Screen.on(Screen.E.RESIZE, this._resize, this);
			Main.on(Main.E.RAF, this._raf, this);
		});
		this.$noiseImg.src = GRH_Config.IMG_DIR + 'noise.png';
	}


	_resize() {
		this.width = this.$wrapper.width();
		this.height = this.$wrapper.height();
		this.size = Math.min(this.width, this.height);
		this.$canvas[0].width = this.width * window.devicePixelRatio;
		this.$canvas[0].height = this.height * window.devicePixelRatio;
		this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
	}

	_raf() {
		this._moveBubbles();
		this._updateCanvas();
	}

	_moveBubbles() {
		for (let i = 0; i < this.numCircles; i++) {
			if (this.circles[i].x + this.circles[i].dx > 1 || this.circles[i].x + this.circles[i].dx < 0) {
				this.circles[i].dx = -this.circles[i].dx;
			}
			if (this.circles[i].y + this.circles[i].dy > 1 || this.circles[i].y + this.circles[i].dy < 0) {
				this.circles[i].dy = -this.circles[i].dy;
			}
			this.circles[i].x += this.circles[i].dx;
			this.circles[i].y += this.circles[i].dy;
		}
	}

	_updateCanvas() {

		// Clear
		this.ctx.moveTo(0, 0);
		this.ctx.clearRect(0, 0, this.width, this.height);

		// // Background color
		this.ctx.globalCompositeOperation = 'source-over';
		this.ctx.globalAlpha = 1;
		this.ctx.moveTo(0, 0);
		this.ctx.beginPath();
		this.ctx.fillStyle = this.color;
		this.ctx.rect(0, 0, this.width, this.height);
		this.ctx.fill();

		// Noise
		this.ctx.moveTo(0, 0);
		this.ctx.beginPath();
		this.ctx.globalAlpha = 0.02;
		this.ctx.fillStyle = this.noisePattern;
		this.ctx.rect(0, 0, this.width, this.width);
		this.ctx.fill();


		// Circles
		this.ctx.globalAlpha = 1;
		this.ctx.fillStyle = 'black';
		this.ctx.globalCompositeOperation = 'xor';
		this.ctx.beginPath();
		for (let i = 0; i < this.numCircles; i++) {
			this.ctx.moveTo(this.circles[i].x * this.width, this.circles[i].y * this.height);
			this.ctx.arc(this.circles[i].x * this.width, this.circles[i].y * this.height, this.circles[i].size * (this.size / 2), 0, 2 * Math.PI);
		}
		this.ctx.fill();
	}

	changeColor(index) {
		gsap.to(this, {
			duration: 1,
			color: this.colors[index]
		});
	}

}
