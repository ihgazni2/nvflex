const ndfunc = require('./ndfunc.js')



class Node {
    constructor() {
        this._fstch = null
        this._lsib = undefined
        this._rsib = undefined
        this._parent = undefined
    }
    
}


class Root extends Node {
    constructor() {
        super();
        this._fstch = null
        this._lsib = null
        this._rsib = null
        this._parent = null
    }
}










