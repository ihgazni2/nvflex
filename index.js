const convert = require('color-convert')
const {get_clrd,parse,playout} = require('./cellfunc.js')
const {sedfs2html} = require('./whtml.js')
const {zones2znds,znds2tree} = require('./zonefunc.js')
const {dcp} = require('./util.js')


function get_dflt_cfg(s) {
    let {zones,cmat} = parse(s)
    let clrd = get_clrd(cmat)
    let nclrd = {}
    for(let k in clrd) {
        nclrd[k] = '#'+convert.ansi256.hex(clrd[k])
    }
    let width = 100;
    let height = 100 * (cmat.length/cmat[0].length);
    let cfg = {
        root:{tag:'div',style:{height:height+'vw',width:width+'vw','box-sizing':'border-box','background-color':'#000022'}}
    }
    for(let k in nclrd) {
        cfg[k] = {
            attrib:{
                style:{
                    'background-color':nclrd[k],
                    'box-sizing':'border-box',
                    'height':'calc(100% - 2vw)',
                    'width':'calc(100% - 2vw)',
                    'border-radius':'1vw',
                    'border':'solid 0.1vw #ffffff'
                }
            },
            tag:'div',
            text:''
        }
    }
    return(cfg)
}


function append_leafs(tree) {
    var sdfs=tree.$sdfs()
    var leafs = sdfs.filter(r=>r.$is_leaf())
    leafs.forEach(
        r=>{
            let leaf = r.$append_child()
            leaf.zone = dcp(r.zone)
            delete r.zone.rune
            r.zone.type='row'
        }
    )
    return(tree)
}

function s2html(s,cfg) {
    if(cfg === undefined) {cfg = get_dflt_cfg(s) }
    let {zones,cmat} = parse(s)
    let znds = zones2znds(zones)
    let tree = znds2tree(znds)
    tree = append_leafs(tree)
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



