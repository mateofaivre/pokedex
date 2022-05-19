


export default class Matrix4 {
	
	
	// https://github.com/mdn/webgl-examples/blob/gh-pages/tutorial/gl-matrix.js
	
	
	/**
	 * Creates a new identity mat4
	 *
	 * @returns {mat4} a new 4x4 matrix
	 */
	static create() {
		// var out = new glMatrix.ARRAY_TYPE(16);
		const out = new Float32Array(16);
		
		out[0]	= 1;
		out[1]	= 0;
		out[2]	= 0;
		out[3]	= 0;
		out[4]	= 0;
		out[5]	= 1;
		out[6]	= 0;
		out[7]	= 0;
		out[8]	= 0;
		out[9]	= 0;
		out[10]	= 1;
		out[11]	= 0;
		out[12]	= 0;
		out[13]	= 0;
		out[14]	= 0;
		out[15]	= 1;
		
		
		return out;
	}
	
	
	/**
	 * Generates a orthogonal projection matrix with the given bounds
	 *
	 * @param {mat4} out mat4 frustum matrix will be written into
	 * @param {number} left Left bound of the frustum
	 * @param {number} right Right bound of the frustum
	 * @param {number} bottom Bottom bound of the frustum
	 * @param {number} top Top bound of the frustum
	 * @param {number} near Near bound of the frustum
	 * @param {number} far Far bound of the frustum
	 * @returns {mat4} out
	 */
	static ortho( out, left, right, bottom, top, near, far ) {
		const lr = 1 / ( left - right );
		const bt = 1 / ( bottom - top );
		const nf = 1 / ( near - far );
		
		out[0]	= -2 * lr;
		out[1]	= 0;
		out[2]	= 0;
		out[3]	= 0;
		out[4]	= 0;
		out[5]	= -2 * bt;
		out[6]	= 0;
		out[7]	= 0;
		out[8]	= 0;
		out[9]	= 0;
		out[10]	= 2 * nf;
		out[11]	= 0;
		out[12]	= ( left + right ) * lr;
		out[13]	= ( top + bottom ) * bt;
		out[14]	= ( far + near ) * nf;
		out[15]	= 1;
		
		
		return out;
	}
	
	
	/**
	 * Translate a mat4 by the given vector
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to translate
	 * @param {vec3} v vector to translate by
	 * @returns {mat4} out
	 */
	static translate( out, a, v ) {
		const x = v[0],
			  y = v[1],
			  z = v[2];
		const a00 = void 0,
			  a01 = void 0,
			  a02 = void 0,
			  a03 = void 0;
		const a10 = void 0,
			  a11 = void 0,
			  a12 = void 0,
			  a13 = void 0;
		const a20 = void 0,
			  a21 = void 0,
			  a22 = void 0,
			  a23 = void 0;
		
		if ( a === out ) {
			out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
			out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
			out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
			out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
		} else {
			a00 = a[0];
			a01 = a[1];
			a02 = a[2];
			a03 = a[3];
			a10 = a[4];
			a11 = a[5];
			a12 = a[6];
			a13 = a[7];
			a20 = a[8];
			a21 = a[9];
			a22 = a[10];
			a23 = a[11];
			
			out[0]	= a00;
			out[1]	= a01;
			out[2]	= a02;
			out[3]	= a03;
			out[4]	= a10;
			out[5]	= a11;
			out[6]	= a12;
			out[7]	= a13;
			out[8]	= a20;
			out[9]	= a21;
			out[10]	= a22;
			out[11]	= a23;
			
			out[12] = a00 * x + a10 * y + a20 * z + a[12];
			out[13] = a01 * x + a11 * y + a21 * z + a[13];
			out[14] = a02 * x + a12 * y + a22 * z + a[14];
			out[15] = a03 * x + a13 * y + a23 * z + a[15];
		}
		
		
		return out;
	}
	
	
	/**
	 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
	 *
	 * @param {mat4} out the receiving matrix
	 * @param {mat4} a the matrix to scale
	 * @param {vec3} v the vec3 to scale the matrix by
	 * @returns {mat4} out
	 **/
	static scale( out, a, v ) {
		const x = v[0],
			  y = v[1],
			  z = v[2];
		
		out[0]	= a[0] * x;
		out[1]	= a[1] * x;
		out[2]	= a[2] * x;
		out[3]	= a[3] * x;
		out[4]	= a[4] * y;
		out[5]	= a[5] * y;
		out[6]	= a[6] * y;
		out[7]	= a[7] * y;
		out[8]	= a[8] * z;
		out[9]	= a[9] * z;
		out[10]	= a[10] * z;
		out[11]	= a[11] * z;
		out[12]	= a[12];
		out[13]	= a[13];
		out[14]	= a[14];
		out[15]	= a[15];
		
		
		return out;
	}
	
	
}

