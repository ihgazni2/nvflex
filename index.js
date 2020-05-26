const convert = require('color-convert')
const {get_clrd,parse,playout} = require('./cellfunc.js')
const {sedfs2inline_html} = require('./whtml.js')
const {zones2znds,znds2tree} = require('./zonefunc.js')
const {dcp} = require('./util.js')


function creat_leaf_cfg(k,cfg,nclrd,mode) {
    if(mode === 'btn') {
        cfg = {
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
            text:'',
            tail:''
        }
    } else if(mode === 'border'){
        cfg = {
            attrib:{
                style:{
                    'background-color':cfg.root.attrib.style['background-color'],
                    'box-sizing':'border-box',
                    'height':'calc(100% - 2vw)',
                    'width':'calc(100% - 2vw)',
                    'border-radius':'1vw',
                    'border':'solid 0.1vw #ffffff'
                }
            },
            tag:'div',
            text:'',
            tail:''
        }
    } else {
        cfg = {
            attrib:{
                style:{
                    'background-color':nclrd[k],
                    'box-sizing':'border-box',
                    'height':'100%',
                    'width':'100%',
                }
            },
            tag:'div',
            text:'',
            tail:''
        }
    }
    return(cfg)
}


function get_inline_dflt_cfg(s,mode='btn') {
    let {zones,cmat} = parse(s)
    let clrd = get_clrd(cmat)
    let nclrd = {}
    for(let k in clrd) {
        nclrd[k] = '#'+convert.ansi256.hex(clrd[k])
    }
    let width = 100;
    let height = 100 * (cmat.length/cmat[0].length);
    let cfg = {
        root:{
            tag:'div',
            attrib:{
                style:{
                    height:height+'vw',
                    width:width+'vw',
                    'box-sizing':'border-box',
                    'background-color':'#000022'
                }
            },
            text:'',
            tail:''
        }
    }
    for(let k in nclrd) {
        cfg[k] = creat_leaf_cfg(k,cfg,nclrd,mode) 
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

function s2inline_html(d) {
    let s = d.tem
    let cfg =d.cfg
    let mode =d.mode
    if(cfg === undefined) {cfg = get_inline_dflt_cfg(s,mode) }
    let {zones,cmat} = parse(s)
    let znds = zones2znds(zones)
    let tree = znds2tree(znds)
    tree = append_leafs(tree)
    let sedfs = tree.$sedfs()
    let html = sedfs2inline_html(cfg,sedfs)
    return({
        cfg:cfg,
        html:html
    })
}



module.exports = {
    playout,
    get_inline_dflt_cfg,
    s2inline_html,
}



