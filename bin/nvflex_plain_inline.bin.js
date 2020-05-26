#!/usr/bin/env node

var yargs = require('yargs');
var {s2inline_html,playout,get_inline_dflt_cfg} = require('../index.js')
var {rfile,wfile,rjson,wjson} = require('../util.js')

argv = yargs.argv

var input = argv['input']
var s;

try {
    s  = rfile(input)
} catch(e) {
    s = input
}

var output = argv['output']

if(output) {
    
} else {
    /*
    output = s
    output = output.replace(/\n/g,'_')
    */
    output = 'plain'
}



console.log("the layout string is:\n")
console.log(s)

console.log("the layout is:\n")
playout(s)

var cfg = argv['cfg']
try {
    cfg = rjson(cfg)
} catch(e) {
    cfg = undefined 
}
wjson(output+'.cfg.json',cfg)
console.log(cfg)
console.log("the layout cfg:\n")
console.log(output+'.cfg.json')


var d = s2inline_html({tem:s,cfg:cfg,mode:'plain'})
wfile(output+'.html',d.html)


console.log("the generated html:\n")
console.log(output+'.html')

