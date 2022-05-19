

import Scroll from '../controllers/Scroll';



export default class Utils {


	/**
	 * Promise deferred object
	 * ======================================================================
	 */
	static Deferred() {
		return new function () {
			this.resolve = null;
			this.reject = null;

			this.promise = new Promise((resolve, reject) => {
				this.resolve = resolve;
				this.reject = reject;
			});
		};
	}


	/**
	 * REMOVE HTTP FROM URL
	 * ======================================================================
	 */
	/*static stripString(url, disallowed) {
		for (let i = 0; i < disallowed.length; i++) {
			let disal = disallowed[i];
			if (url.indexOf(disal) === 0) {
				return url.replace(disal, '');
			}
		}

		return url;
	}*/


	/**
	 * String trim
	 * ======================================================================
	 */
	static trim(str, characters, flags) {

		function escapeRegex(string) {
			return string.replace(/[\[\](){}?*+\^$\\.|\-]/g, "\\$&");
		}

		flags = flags || "g";
		if (typeof str !== "string" || typeof characters !== "string" || typeof flags !== "string") {
			throw new TypeError("argument must be string");
		}

		if (!/^[gi]*$/.test(flags)) {
			throw new TypeError("Invalid flags supplied '" + flags.match(new RegExp("[^gi]*")) + "'");
		}

		characters = characters.replace(/[\[\](){}?*+\^$\\.|\-]/g, "\\$&");

		return str.replace(new RegExp("^[" + characters + "]+|[" + characters + "]+$", flags), '');
	}


	/**
	 * Find a tag name in a node list
	 * ======================================================================
	 */
	static findParent(tagname, el) {
		while (el) {
			if ((el.nodeName || el.tagName).toLowerCase() === tagname.toLowerCase()) {
				return el;
			}
			el = el.parentNode;
		}
		return null;
	}


	/**
	 * is function
	 * ======================================================================
	 */
	static isFunction(functionToCheck) {
		let getType = {};
		return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	}


	/**
	 * Get offset
	 * ======================================================================
	 */
	static offset(elt) {
		let rect = elt.getBoundingClientRect();
		return {
			top : rect.top + Scroll.yI,
			left: rect.left + Scroll.xI
		}
	}


	/**
	 * Shuffle an array
	 * ======================================================================
	 */
	static shuffle(array) {
		let currentIndex = array.length,
			temporaryValue,
			randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}


	/**
	 * Wrap
	 * ======================================================================
	 */
	static wrap(el, wrapper) {
		el.parentNode.insertBefore(wrapper, el);
		wrapper.appendChild(el);
	}


	/**
	 * Wrap inner
	 * ======================================================================
	 */
	static wrapInner(parent, wrapper) {
		parent.appendChild(wrapper);
		while (parent.firstChild !== wrapper) {
			wrapper.appendChild(parent.firstChild);
		}
	}


	/**
	 * Find closest match in array
	 * ======================================================================
	 */
	static closestValueInArray( search, values ) {
		let currentValue = values[ 0 ];
		let diff         = Math.abs( search - currentValue );
		for ( let index = 0; index < values.length; index++ ) {
			let newdiff = Math.abs( search - values[ index ] );
			if ( newdiff < diff ) {
				diff         = newdiff;
				currentValue = values[ index ];
			}
		}
		return currentValue;
	}


	/**
	 * Find closest match in array, returns index
	 * ======================================================================
	 */
	static closestIndexInArray( search, values ) {
		let currentValue = values[ 0 ],
			currentIndex = 0;
		let diff         = Math.abs( search - currentValue );
		for ( let index = 0; index < values.length; index++ ) {
			let newdiff = Math.abs( search - values[ index ] );
			if ( newdiff < diff ) {
				diff         = newdiff;
				currentValue = values[ index ];
				currentIndex = index;
			}
		}
		return currentIndex;
	}


}

