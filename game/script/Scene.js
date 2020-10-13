
class TitleScene {
    // 頂点
    _vssource = `
    attribute vec2 a_position;
    attribute vec3 a_color;
    uniform mat3 rot;
    uniform mat3 scale;
    uniform mat3 move;    
    varying vec3 v_color;

    void main() {
        gl_Position = vec4(move * scale * rot * vec3(a_position, 1), 1);
        v_color = a_color;
    }
    `;
    // フラグメント
    _fssource = `
    precision mediump float;
    uniform mat3 trans_color;
    varying vec3 v_color;

    void main() {
        gl_FragColor = vec4(trans_color*v_color, 1);
    }
    `;
    constructor(gl) {
        this._gl = gl; 
        this._init();
    }

    _init() {
        /////////////////// WebGLの初期設定
        this._gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this._program = createProgram(this._gl, this._vssource, this._fssource);
        this._gl.useProgram(this._program); // プログラム変わらないならここでいいのでは

        this._programInfo = {
            attrib: {
                a_position: this._gl.getAttribLocation(this._program, "a_position"),
                a_color: this._gl.getAttribLocation(this._program, "a_color"),
            },
            uniform: {
                rot: this._gl.getUniformLocation(this._program, "rot"),
                move: this._gl.getUniformLocation(this._program, "move"),
                scale: this._gl.getUniformLocation(this._program, "scale"),
                trans_color: this._gl.getUniformLocation(this._program, "trans_color"),
            },
        }
        this._buffer = {
            // attrib毎に
            a_position: this._gl.createBuffer(),
            a_color: this._gl.createBuffer(),
            }
        // これ以降は描画毎にやるほうがいいかも
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._buffer.a_position);
        const base_position = [
            0, 0.7,
            0, 0,
            0.5, 0,
        ];
        this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(base_position), this._gl.STATIC_DRAW);
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._buffer.a_color);
        const base_color = [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1,
        ];
        this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(base_color), this._gl.STATIC_DRAW);
        //////////////////////

        // それ以外
        this.rad = 0;
    }

    renderScene() {
        // データ保存可能にする
        this._gl.enableVertexAttribArray(this._programInfo.attrib.a_position);
        this._gl.enableVertexAttribArray(this._programInfo.attrib.a_color);

        // 描画
        this._render();        
    }

    _render() {
        resize(this._gl.canvas);
        this._gl.viewport(0, 0, this._gl.canvas.width, this._gl.canvas.height);
        this._gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this._gl.clear(this._gl.COLOR_BUFFER_BIT);
        
        // データ取得
        // ARRAY_BUFFERからデータを取る
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._buffer.a_position);
        this._gl.vertexAttribPointer(this._programInfo.attrib.a_position, 2, this._gl.FLOAT, false, 0, 0);
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._buffer.a_color);
        this._gl.vertexAttribPointer(this._programInfo.attrib.a_color, 3, this._gl.FLOAT, false, 0, 0);

        // uniformにデータをセットする
        // trans_color
        const r = Math.sin(this.rad * (Math.PI / 30) + Math.PI * 2/3) + 1/3;
        const g = Math.sin(this.rad * (Math.PI / 30)                ) + 1/3;
        const b = Math.sin(this.rad * (Math.PI / 30) - Math.PI * 2/3) + 1/3;
        // WebGLでは"列優先"なので"行優先"に(お好みで)
        const trans = new Matrix([
            r, g, b,
            b, r, g,
            g, b, r,
        ]).transpose();
        this._gl.uniformMatrix3fv(this._programInfo.uniform.trans_color, /*false only*/ false, new Float32Array(trans.getMatrix()));
        
        //rot
        // WebGLでは"列優先"なので"行優先"に(お好みで)
        const rot = new Matrix([
            Math.cos(this.rad * (Math.PI / 60)), -Math.sin(this.rad * (Math.PI / 60)), 0,
            Math.sin(this.rad * (Math.PI / 60)), Math.cos(this.rad * (Math.PI / 60)), 0,
            0, 0, 1,
        ]).transpose();
        this._gl.uniformMatrix3fv(this._programInfo.uniform.rot, /*false only*/ false, new Float32Array(rot.getMatrix()));
        
        // move
        // WebGLでは"列優先"なので"行優先"に(お好みで)
        const move = new Matrix([
            1, 0, /*move x*/ Math.cos(this.rad * (Math.PI / 180)),
            0, 1, /*move y*/ 0,
            0, 0, 1,
        ]).transpose();
        this._gl.uniformMatrix3fv(this._programInfo.uniform.move, /*false only*/ false, new Float32Array(move.getMatrix()));

        // scale
        // WebGLでは"列優先"なので"行優先"に(お好みで)
        const scale = new Matrix([
            /*scale x*/ 740/1200, 0, 0,
            0, /*scale y*/ 1, 0,
            0, 0, 1,
        ]).transpose();
        this._gl.uniformMatrix3fv(this._programInfo.uniform.scale, /*false only*/ false, new Float32Array(scale.getMatrix()));

        // draw
        this._gl.drawArrays(this._gl.TRIANGLES, 0, 3);

        // その他
        this.rad = (this.rad + 1) % 360;
        this.framenum = requestAnimationFrame(this._render.bind(this));
    }
}