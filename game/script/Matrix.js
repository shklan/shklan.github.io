class Matrix {
    constructor(mat) {
        const length = mat.length;
        const dim = Math.trunc(Math.sqrt(length));
        if(dim ** 2 != length)
            throw 'Eroor constructor: input Matrix must be square';

        this._mat = mat;
        this._length = length;
        this._dim = dim;
    }

    getMatrix() {
        return this._mat;
    }

    setMatrix(mat) {
        if (this._length != mat.length) 
            throw 'Error Matrix.setMatrix: matrix size is must be ' + this._mat.length.toString();
        this._mat = mat;
    }

    setValue(i, j, value) {
        this._set(this._dim*i+j, value);
    }

    _set(index, value) {
        if (index < 0 || this._length <= index) 
            throw 'Error Matrix.setVaule: index ' + index + ' is out of range ' + (this._mat.length-1).toString();
        this._mat[index] = value;
    }

    transpose() {
        const new_mat = [];
        const n = this._dim;
        for(let i=0; i<n; i=(i+1)|0)
            for(let j=0; j<n; j=(j+1)|0)
                new_mat.push(this._mat[n*j+i]);
        return new Matrix(new_mat);
    }

    mulMatrix(mat) { // this._mat * mat
        const m = mat.getMatrix();
        if(this._length != m.length)
            throw 'Error Matrix.mulMatrix: matrix size is must be ' + this._length.toString();
        
        const new_mat = [];
        const length = this._length;
        const dim = this._dim;
        
        for(let i=0; i<length; i=(i+1)|0) {
            let new_value = 0;
            const row = Math.trunc(i/dim);
            const column = i%dim;
            for(let j=0; j<dim; j=(j+1)|0) {
                new_value += this._mat[row*dim+j] * m[j*dim+column];
            }
            new_mat.push(new_value);
        }
        return new Matrix(new_mat);
    }

    mulScalar(value) { // this._mat * value        
        const new_mat = [];
        const length = this._length;
        for(let i=0; i<length; i=(i+1)|0)
            new_mat.push(this._mat[i] * value);
        return new Matrix(new_mat);
    }
}