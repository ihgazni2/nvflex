const fs = require("fs")

function rjson(fn) {
    let buf = fs.readFileSync(fn)
    let s = buf.toString()
    let d = JSON.parse(s)
    return(d)
}

function wjson(fn,js) {
    let s =JSON.stringify(js)
    fs.writeFileSync(fn,s)
}


function is_int_str(s) {
    let n = parseInt(s)
    let ns = n.toString()
    return(ns === s)
}


module.exports = {
    rjson,
    wjson,
    is_int_str,
}
