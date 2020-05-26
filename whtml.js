function is_stag(sedfs,i) {
    let cond = (sedfs[i].$open_at === i)
    return(cond)
}


function is_etag(sedfs,i) {
    let cond = (sedfs[i].$close_at === i)
    return(cond)
}


function creat_css_str(style,indent) {
    let css = ""
    for(let k in style) {
        css = css+ indent + k+':'+style[k]+';' + '\n'
    }
    return(css)
}


function creat_attrib_str(attrib,indent) {
    let s = ''
    for(let k in attrib) {
        if(k === 'style') {
            let style_indent = '    ' + indent
            s = s + style_indent + 'style="' + '\n'
            s = s + creat_css_str(attrib['style'],style_indent+'    ')
            s = s + style_indent + '"' + '\n' 
        } else {
            let attr_indent =  '    ' + indent
            s = s + attr_indent +k+'='+'"'+attrib[k].toString()+'"' + '\n' 
        }
    }
    return(s)
}


function calc_hw(cfg,nd) {
    //计算非root 容器的 高宽
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
    //计算flex:? 的值
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



function creat_inline_container_attrib(cfg,nd) {
    let rune = nd.zone.rune
    let attrib = {}
    attrib.style = {}
    //
    let hw = calc_hw(cfg,nd)
    if(hw.length <=0 ) {
        //root container
        attrib.style['width'] = cfg.root.attrib.style.width
        attrib.style['height'] = cfg.root.attrib.style.height
        attrib.style['box-sizing'] = cfg.root.attrib.style['box-sizing']
        attrib.style['background-color'] = cfg.root.attrib.style['background-color']
    } else {
        //non-root container
        attrib.style[hw[0]] = hw[1]
    }
    //
    attrib.style.display = 'flex'
    attrib.style['justify-content'] = 'space-around'
    attrib.style['align-items'] = 'center'
    let type = nd.zone.type
    if(type === 'row') {
        attrib.style['flex-direction'] = 'column'
    } else {
        attrib.style['flex-direction'] = 'row'
    }
    attrib.style.flex = calc_flex(nd)
    return(attrib)

}



function creat_stag(cfg,nd) {
    let tag = ''
    let rune = nd.zone.rune
    let depth = nd.$depth()
    if(rune !== undefined) {
        tag = cfg[rune].tag? cfg[rune].tag:cfg.root.tag
        tag = '    '.repeat(depth) + '<'+tag + '\n'
        let attrib = cfg[rune].attrib
        attrib = creat_attrib_str(attrib,'    '.repeat(depth))
        tag = tag + attrib+'\n'
        tag = tag + '    '.repeat(depth) +'>' +'\n'
    } else {
        tag = cfg.root.tag
        tag = '    '.repeat(depth) + '<'+tag + '\n'
        let attrib = creat_inline_container_attrib(cfg,nd)
        attrib = creat_attrib_str(attrib,'    '.repeat(depth))
        tag = tag + attrib+'    '.repeat(depth) +'>' +'\n'
    }
    //text 看作 node的属性
    //tail 看作 node的属性
    //如果text 当作 独立textnode 不需要下面
    if( cfg[rune] && cfg[rune].text) {
        let text = cfg[rune].text
        tag = tag + '\n' 
        tag = tag + '    '.repeat(depth+1) + text +'\n'
    }
    if( cfg[rune] && cfg[rune].tail) {
        let tail = cfg[rune].tail
        tag = tag + '\n'
        tag = tag + '    '.repeat(depth) + tail +'\n'
    }    
    return(tag)
}


function creat_etag(cfg,nd) {
    /*
     * 如果text 当作独立的textnode, 创建tree的时候需要标注类型 是否为textnode
     */
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

function sedfs2inline_html(cfg,sedfs) {
    /*
     * var oTextNode = document.createTextNode("XXXX")
     * oTextNode.nodeType 3
     * oTextNode.TEXT_NODE 3
     *
     * 如果使用独立textnode
     *
     * 需要加入一个判断is_txt
     *
     * Node.ELEMENT_NODE
     * Node.TEXT_NODE
     * Node.COMMENT_NODE
     *
     *
     * Node.DOCUMENT_NODE
     * Node.CDATA_SECTION_NODE
     * Node.DOCUMENT_TYPE_NODE                        <!DOCTYPE html>
     * Node.DOCUMENT_FRAGMENT_NODE                    
     *     DocumentFragment 不是真实 DOM 树的一部分，它的变化不会触发 DOM 树的重新渲染，且不会导致性能等问题 
     * Node.PROCESSING_INSTRUCTION_NODE               <?xml-stylesheet ... ?>
     */
    let html =''
    for(let i=0;i<sedfs.length;i++) {
        if(is_stag(sedfs,i)) {
            html = html + creat_stag(cfg,sedfs[i])
        } else {
            html = html + creat_etag(cfg,sedfs[i])
        }
    }
    html = html.replace(/\n+/g,'\n')
    return(html)
}


module.exports = {
    is_stag,
    is_etag,
    creat_stag,
    creat_etag,
    creat_css_str,
    creat_attrib_str,
    creat_inline_container_attrib,
    calc_hw,
    calc_flex,
    sedfs2inline_html,
}
