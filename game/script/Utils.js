function transpose(mat) {
    const new_mat = Array(mat.length);
    n = Math.sqrt(mat.length);
    for(let i=0; i<n; i=(i+1)|0) {
        for(let j=0; j<n; j=(j+1)|0) {
            new_mat[n*i+j] = mat[n*j+i];
        }
    }
    return new_mat;
}

function createProgram(gl, vssource, fssource) {
    const vshader = createShader(gl, gl.VERTEX_SHADER, vssource);
    const fshader = createShader(gl, gl.FRAGMENT_SHADER, fssource);
    const program = gl.createProgram();

    gl.attachShader(program, vshader);
    gl.attachShader(program, fshader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.log("program link failed:\n" + gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
    }
    return program;
}

function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.log("shader compile failed:\n" + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

function resize(canvas) {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
}
