const fs = require("fs")

function dcp(d) {
    return(JSON.parse(JSON.stringify(d)))
}

function kvlist2d(kl,vl) {
    let d = {}
    for(let i=0;i<kl.length;i++) {
        d[kl[i]] = vl[i]
    }
    return(d)
}

function rfile(fn) {
    let buf = fs.readFileSync(fn)
    let s = buf.toString()
    return(s)
}

function wfile(fn,s) {
    fs.writeFileSync(fn,s)
}

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


module.exports = {
    dcp,
    kvlist2d,
    rfile,
    wfile,
    rjson,
    wjson,
}
