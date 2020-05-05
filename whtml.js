function is_stag(sedfs,i) {
    let cond = (sedfs[i].$open_at === i)
    return(cond)
}


function is_etag(sedfs,i) {
    let cond = (sedfs[i].$close_at === i)
    return(cond)
}

function creat_root_flex(cfg,nd) {
    let indent = '    '.repeat(nd.$depth()+2) // depth + tag-indent + style-indent
    let type = nd.zone.type
    let flex = indent + 'display:flex;' + '\n'
    if(type === 'row') {
        flex = flex + indent + 'flex-direction:column;' + '\n'
        flex = flex + indent + 'justify-content:space-around;' + '\n'
        flex = flex + indent + 'align-items:center;' + '\n'
    } else {
        flex = flex + indent + 'flex-direction:row;' + '\n'
        flex = flex + indent + 'justify-content:space-around;' + '\n'
        flex = flex + indent + 'align-items:center;'  +'\n'       
    }
    flex =  flex + indent + 'flex:'+calc_flex(nd)+';' +'\n'
    let hw = calc_hw(cfg,nd)
    if(hw.length >0 ) {
        flex =  flex + indent + hw[0] +':'+ hw[1]+';' +'\n'
    } else {
        flex =  flex + indent  +'width:'+ cfg.root.style.width +';' +'\n'
        flex =  flex + indent  +'height:'+ cfg.root.style.height +';' +'\n'
    }
    return(flex)
}


function creat_css(style,indent) {
    let css = ""
    for(let k in style) {
        css = css+ indent + k+':'+style[k]+';' + '\n'
    }
    return(css)
}

function creat_attrib(attrib,indent) {
    let s = ''
    for(let k in attrib) {
        if(k === 'style') {
            let style_indent = '    ' + indent
            s = s + style_indent + 'style="' + '\n'
            s = s + creat_css(attrib['style'],style_indent+'    ')
            s = s + style_indent + '"' + '\n' 
        } else {
            let attr_indent =  '    ' + indent
            s = s + attr_indent +k+'='+'"'+attrib[k].toString()+'"' + '\n' 
        }
    }
    return(s)
}

function calc_hw(cfg,nd) {
    let p = nd.$parent()
    let depth = nd.$depth()
    let indent = '    '.repeat(depth+2)
    if(p !== null ) {
        let type = p.zone.type
        if(type === 'col') {
            return(['height','100%'])
        } else {
            return(['width','100%'])
        }
    } else {
        let hwratio = (nd.zone.b - nd.zone.t + 1) / (nd.zone.b - nd.zone.t + 1)
        return([])
    }
}


function calc_flex(nd) {
    let p = nd.$parent()
    if(p !== null ) {
        let type = p.zone.type 
        if(type === 'col') {
            let flex = nd.zone.r - nd.zone.l + 1
            return(flex)
        } else {
            let flex = nd.zone.b - nd.zone.t + 1
            return(flex)
        }
    } else {
        return(1)
    }
}


function creat_stag(cfg,nd) {
    let tag = ''
    let rune = nd.zone.rune
    let depth = nd.$depth()
    if(rune !== undefined) {
        tag = cfg[rune].tag? cfg[rune].tag:cfg.root.tag
        tag = '    '.repeat(depth) + '<'+tag + '\n'
        let flex =  calc_flex(nd)
        let attrib = cfg[rune].attrib
        attrib['style']['flex'] = flex
        let hw = calc_hw(cfg,nd)
        if(hw.length >0 ) {
            attrib['style'][hw[0]] = hw[1]
        } else {
            attrib['style'].height = cfg.root.style.height
            attrib['style'].width = cfg.root.style.width      
        }
        attrib = creat_attrib(attrib,'    '.repeat(depth))
        tag = tag + attrib+'\n'
        tag = tag + '    '.repeat(depth) +'>' +'\n'
    } else {
        tag = cfg.root.tag
        tag = '    '.repeat(depth) + '<'+tag + '\n'
        let attrib =  '    '.repeat(depth+1) + 'style="' + '\n' 
        attrib = attrib +  creat_root_flex(cfg,nd) + '\n'
        attrib = attrib +  '    '.repeat(depth+1) + '"' +'\n'
        tag = tag + attrib+'    '.repeat(depth) +'>' +'\n'
    }
    if( cfg[rune] && cfg[rune].text) {
        let text = cfg[rune].text
        tag = tag + '\n' 
        tag = tag + '    '.repeat(depth+1) + text +'\n'
    }
    return(tag)
}


function creat_etag(cfg,nd) {
    let tag = ''
    let rune = nd.zone.rune
    let depth = nd.$depth()
    if(rune !== undefined) {
        tag = cfg[rune].tag? cfg[rune].tag:cfg.root.tag
        tag = '    '.repeat(depth) + '</'+tag + '>\n'
    } else {
        tag = cfg.root.tag
        tag = '    '.repeat(depth) + '</'+tag + '>\n'
    }
    return(tag)
}

function sedfs2html(cfg,sedfs) {
    let html =''
    for(let i=0;i<sedfs.length;i++) {
        if(is_stag(sedfs,i)) {
            html = html + creat_stag(cfg,sedfs[i])
        } else {
            html = html + creat_etag(cfg,sedfs[i])
        }
    }
    return(html)
}


module.exports = {
    is_stag,
    is_etag,
    creat_stag,
    creat_etag,
    creat_css,
    creat_attrib,
    creat_root_flex,
    calc_flex,
    sedfs2html,
}
