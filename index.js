const convert = require('color-convert')
const {get_clrd,parse,playout} = require('./cellfunc.js')
const {sedfs2inline_html,sedfs2outband_html} = require('./whtml.js')
const {zones2znds,znds2tree} = require('./zonefunc.js')
const {dcp} = require('./util.js')
const cellfunc = require('./cellfunc.js')
const whtml = require('./whtml.js')
const zonefunc = require('./zonefunc.js')

function creat_inline_leaf_cfg(k,cfg,nclrd,mode) {
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
    } else if(mode === 'card') {
        cfg.root.attrib.style['background-color'] = "#ffffff"
        cfg = {
            attrib:{
                style:{
                    'background-color':cfg.root.attrib.style['background-color'],
                    'box-sizing':'border-box',
                    'height':'calc(100% - 2vw)',
                    'width':'calc(100% - 2vw)',
                    'border':'solid 2px #ffffff',
                    'border-radius':'5px',
                    'transition': '0.3s',
                    'box-shadow': '0 4px 8px 0 rgba(0,0,0,0.2)'
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


function creat_outband_leaf_cfg(k,cfg,nclrd,mode) {
    if(mode === 'btn') {
        cfg = {
            attrib:{
                class:'btn-leaf',
                style:{
                    'background-color':nclrd[k],
                }
            },
            tag:'div',
            text:'',
            tail:''
        }
    } else if(mode === 'border'){
        cfg = {
            attrib:{
                class:'border-leaf',
            },
            tag:'div',
            text:'',
            tail:''
        }
    } else if(mode === 'card') {
        cfg.root.attrib.style['background-color'] = "#ffffff"
        cfg = {
            attrib:{
                class:'card-leaf',
            },
            tag:'div',
            text:'',
            tail:''
        }        
    }    else {
        cfg = {
            attrib:{
                class:'plain-leaf',
                style:{
                    'background-color':nclrd[k],
                }
            },
            tag:'div',
            text:'',
            tail:''
        }
    }
    return(cfg)
}




function get_dflt_cfg(d) {
    let s = d.tem
    let mode = (d.mode === undefined)?'btn':d.mode
    let inline = d.inline
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
        cfg[k] = inline?creat_inline_leaf_cfg(k,cfg,nclrd,mode):creat_outband_leaf_cfg(k,cfg,nclrd,mode)
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

function s2html(d) {
    let s = d.tem
    let cfg =d.cfg
    let mode =d.mode
    let inline = d.inline
    if(cfg === undefined) {cfg = get_dflt_cfg(d) }
    let {zones,cmat} = parse(s)
    let znds = zones2znds(zones)
    let tree = znds2tree(znds)
    tree = append_leafs(tree)
    let sedfs = tree.$sedfs()
    let html = inline?sedfs2inline_html(cfg,sedfs):sedfs2outband_html(cfg,sedfs)
    return({
        cfg:cfg,
        html:html
    })
}



module.exports = {
    playout,
    get_dflt_cfg,
    s2html,
    cellfunc,
    zonefunc,
    whtml
}



