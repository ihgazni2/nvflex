const convert = require('color-convert')
const {get_clrd,parse,playout} = require('./cellfunc.js')
const {sedfs2html} = require('./whtml.js')
const {zones2znds,znds2tree} = require('./zonefunc.js')

function get_dflt_cfg(s) {
    let {zones,cmat} = parse(s)
    let clrd = get_clrd(cmat)
    let nclrd = {}
    for(let k in clrd) {
        nclrd[k] = '#'+convert.ansi256.hex(clrd[k])
    }
    let width = 50;
    let height = 50 * (cmat.length/cmat[0].length);
    let cfg = {
        root:{tag:'div',style:{height:height+'vw',width:width+'vw'}}
    }
    for(let k in nclrd) {
        cfg[k] = {attrib:{type:'button',style:{'background-color':nclrd[k]}},tag:'button',text:''}
    }
    return(cfg)
}

function s2html(s,cfg) {
    if(cfg === undefined) {cfg = get_dflt_cfg(s) }
    let {zones,cmat} = parse(s)
    let znds = zones2znds(zones)
    let tree = znds2tree(znds)
    let sedfs = tree.$sedfs()
    let html = sedfs2html(cfg,sedfs)
    return({
        cfg:cfg,
        html:html
    })
}



module.exports = {
    playout,
    s2html,
    get_dflt_cfg
}



