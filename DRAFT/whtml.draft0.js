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
        flex =  flex + indent  +'box-sizing:'+ cfg.root.style['box-sizing'] +';' +'\n'
        flex =  flex + indent  +'background-color:'+ cfg.root.style['background-color'] +';' +'\n'
    }
    return(flex)
}


function creat_stag(cfg,nd) {
    let tag = ''
    let rune = nd.zone.rune
    let depth = nd.$depth()
    if(rune !== undefined) {
        tag = cfg[rune].tag? cfg[rune].tag:cfg.root.tag
        tag = '    '.repeat(depth) + '<'+tag + '\n'
        //let flex =  calc_flex(nd)
        let attrib = cfg[rune].attrib
        //attrib['style']['flex'] = flex
        /*
        let hw = calc_hw(cfg,nd)
        if(hw.length >0 ) {
            attrib['style'][hw[0]] = hw[1]
        } else {
            attrib['style'].height = cfg.root.style.height
            attrib['style'].width = cfg.root.style.width
        }
        */
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
    if( cfg[rune] && cfg[rune].text) {
        let text = cfg[rune].text
        tag = tag + '\n'
        tag = tag + '    '.repeat(depth+1) + text +'\n'
    }
    return(tag)
}

