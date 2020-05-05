const ndfunc = require('./ndfunc.js')
const cmmn = require('./cmmn.js')

const dflt_sdfs_show_connd = {
    't':'├── ',
    'v':'│   ',
    'l':'└── ',
    'ws':'    '
}

const dflt_edfs_show_connd = {
    't':'├── ',
    'v':'│   ',
    'l':'┌── ',
    'ws':'    '
}



function dflt_calc_conn_map_func(conn) {
    let rslt;
    if(conn==='t') {
        rslt = 'v'
    } else if(conn === 'v') {
        rslt = 'v'
    } else {
        rslt = 'ws'
    }
    return(rslt)
}



function conns2repr(conns,show_connd) {
    conns = conns.map(conn=>show_connd[conn])
    return(conns.join(''))
}


function clear_ui(nodes) {
    for(let id in nodes) {
        delete nodes[id]._ui
    }
}

//sdfs

function dflt_sdfs_calc_conns(nd,nodes) {
    nd._ui = {}
    if(ndfunc.is_root(nd)){
        //跟节点没有前导ui 符号
        nd._ui.conns = []
        nd._ui.display = true
    } else {
        let parent = ndfunc.get_parent(nd,nodes)
        //获取父节点的前导ui 符号序列数组
        let pconns = parent._ui.conns
        let conns = pconns.map(conn=>dflt_calc_conn_map_func(conn))
        let cond = ndfunc.is_lstch(nd)
        if(cond) {
            conns.push('l')
        } else {
            conns.push('t')
        }
        nd._ui.conns = conns
        nd._ui.display = true
    }
    return(nd)
}



function get_sdfs_repr_arr(nd,nodes,f){
    let depth = ndfunc.get_depth(nd,nodes)
    let sdfs = ndfunc.get_deses(nd,nodes,true)
    sdfs = sdfs.map(nd=>dflt_sdfs_calc_conns(nd,nodes))
    let conns_array = sdfs.map(nd=>nd._ui.conns)
    conns_array = conns_array.map(conns=>conns.slice(depth))
    conns_array = conns_array.map(conns=>conns2repr(conns,dflt_sdfs_show_connd))
    let arr = conns_array.map((conns,i)=>(conns+'['+sdfs[i]._id+']'+' : '+sdfs[i]._guid))
    arr = arr.filter((r,i)=>(sdfs[i]._ui.display === true))
    return(arr)
}


function dflt_sdfs_show_callback() {
}


function sdfs_show_all(nd,nodes,f=dflt_sdfs_show_callback){
    let root = ndfunc.get_root(nd,nodes)
    get_sdfs_repr_arr(root,nodes,f)
    let arr = get_sdfs_repr_arr(nd,nodes,f)
    let repr = arr.join('\n')
    console.log(repr)
    clear_ui(nodes)
}

function sdfs_show_root_tree(nodes,f=dflt_sdfs_show_callback){
    let k = cmmn.dict_keys(nodes)[0]
    let nd = ndfunc.get_root(nodes[k],nodes)
    let arr = get_sdfs_repr_arr(nd,nodes,f)
    let repr = arr.join('\n')
    console.log(repr)
    clear_ui(nodes)
}



function sdfs_show_from(nd,nodes,from,f=dflt_sdfs_show_callback){
    let root = ndfunc.get_root(nd,nodes)
    get_sdfs_repr_arr(root,nodes,f)
    let arr = get_sdfs_repr_arr(nd,nodes,f)
    arr = arr.slice(from)
    let repr = arr.join('\n')
    console.log(repr)
    clear_ui(nodes)
}

function sdfs_show_to(nd,nodes,to,f=dflt_sdfs_show_callback){
    let root = ndfunc.get_root(nd,nodes)
    get_sdfs_repr_arr(root,nodes,f)
    let arr = get_sdfs_repr_arr(nd,nodes,f)
    arr = arr.slice(0,to)
    let repr = arr.join('\n')
    console.log(repr)
    clear_ui(nodes)
}


function sdfs_show_from_to(nd,nodes,from,to,f=dflt_sdfs_show_callback){
    let root = ndfunc.get_root(nd,nodes)
    get_sdfs_repr_arr(root,nodes,f)
    let arr = get_sdfs_repr_arr(nd,nodes,f)
    arr = arr.slice(from,to)
    let repr = arr.join('\n')
    console.log(repr)
    clear_ui(nodes)
}


//

function dflt_edfs_show_callback() {
}

function dflt_edfs_calc_conns(nd,nodes) {
    nd._ui = {}
    if(ndfunc.is_root(nd)){
        //跟节点没有前导ui 符号
        nd._ui.conns = []
    } else {
        let parent = ndfunc.get_parent(nd,nodes)
        //获取父节点的前导ui 符号序列数组
        let pconns = parent._ui.conns
        let conns = pconns.map(conn=>dflt_calc_conn_map_func(conn))
        let cond = ndfunc.is_fstch(nd)
        if(cond) {
            conns.push('l')
        } else {
            conns.push('t')
        }
        nd._ui.conns = conns
    }
    return(nd)
}


function get_edfs_repr_arr(nd,nodes,f){
    let depth = ndfunc.get_depth(nd,nodes)
    let edfs = ndfunc.get_edfs(nd,nodes)
    edfs.reverse()
    edfs = edfs.map(nd=>dflt_edfs_calc_conns(nd,nodes))
    edfs.reverse()
    let deses = ndfunc.get_deses(nd,nodes,true)
    let ids = deses.map(r=>r._id)
    edfs = edfs.filter(r=>ids.includes(r._id))
    let conns_array = edfs.map(nd=>nd._ui.conns)
    conns_array = conns_array.map(conns=>conns.slice(depth,conns.length))
    conns_array = conns_array.map(conns=>conns2repr(conns,dflt_edfs_show_connd))
    let arr = conns_array.map((conns,i)=>(conns+edfs[i]._id))
    return(arr)
}


function edfs_show_all(nd,nodes,f=dflt_edfs_show_callback){
    let root = ndfunc.get_root(nd,nodes)
    get_edfs_repr_arr(root,nodes,f)
    let arr = get_edfs_repr_arr(nd,nodes,f)
    let repr = arr.join('\n')
    console.log(repr)
    clear_ui(nodes)
}

function edfs_show_root_tree(nodes,f=dflt_edfs_show_callback){
    let k = cmmn.dict_keys(nodes)[0]
    let nd = ndfunc.get_root(nodes[k],nodes)
    let arr = get_edfs_repr_arr(nd,nodes,f)
    let repr = arr.join('\n')
    console.log(repr)
    clear_ui(nodes)
}

function edfs_show_from(nd,nodes,from,f=dflt_edfs_show_callback){
    let root = ndfunc.get_root(nd,nodes)
    get_edfs_repr_arr(nd,nodes,f)
    let arr = get_edfs_repr_arr(nd,nodes,f)
    arr = arr.slice(0,arr.length-from)
    let repr = arr.join('\n')
    console.log(repr)
    clear_ui(nodes)
}

function edfs_show_to(nd,nodes,to,f=dflt_edfs_show_callback){
    let root = ndfunc.get_root(nd,nodes)
    get_edfs_repr_arr(nd,nodes,f)
    let arr = get_edfs_repr_arr(nd,nodes,f)
    arr = arr.slice(arr.length-to,arr.length)
    let repr = arr.join('\n')
    console.log(repr)
    clear_ui(nodes)
}


function edfs_show_from_to(nd,nodes,from,to,f=dflt_edfs_show_callback){
    let root = ndfunc.get_root(nd,nodes)
    get_edfs_repr_arr(nd,nodes,f)
    let arr = get_edfs_repr_arr(nd,nodes,f)
    arr = arr.slice(arr.length-to,arr.length-from)
    let repr = arr.join('\n')
    console.log(repr)
    clear_ui(nodes)
}


//sedfs

const dflt_sedfs_show_connd = {
    indent:'    ',
    stag_prefix:'<',
    stag_suffix:'>',
    etag_prefix:'</',
    etag_suffix:'>',
}


function gen_tag(tag,prefix,suffix) {
    return(prefix+tag+suffix)
}

function sedfs_show_all(nd,nodes,show_connd=dflt_sedfs_show_connd) {
    let sedfs = ndfunc.get_sedfs(nd,nodes,true)
    let depths = sedfs.map(nd=>ndfunc.get_depth(nd,nodes))
    let depth = ndfunc.get_depth(nd,nodes)
    let indents = depths.map(r=>show_connd.indent.repeat(r-depth)) 
    let tags = sedfs.map(
        nd=>{
            if(nd._$visited === false) {
                return(gen_tag(nd._id,show_connd.stag_prefix,show_connd.stag_suffix))
            } else {
                return(gen_tag(nd._id,show_connd.etag_prefix,show_connd.etag_suffix))
            }
        }
    )
    let lines = tags.map((tag,i)=>(indents[i]+tag)) 
    let repr = lines.join('\n')
    console.log(repr)
}

function sdfs_expand(nd,nodes,f=dflt_sdfs_show_callback) {
    let sdfs = ndfunc.get_deses(nd,nodes,false)
    sdfs.forEach(nd=>{nd._ui.display = true})
    return(nodes)
}

function sdfs_foldup(nd,nodes,f=dflt_sdfs_show_callback) {
    let sdfs = ndfunc.get_deses(nd,nodes,false)
    sdfs.forEach(nd=>{nd._ui.display = false})
    return(nodes)
}


module.exports = {
    dflt_calc_conn_map_func,
    conns2repr,
    clear_ui,
    //sdfs
    dflt_sdfs_show_connd,
    dflt_sdfs_calc_conns,
    get_sdfs_repr_arr,
    sdfs_show_all,
    sdfs_show_root_tree,
    sdfs_show_from,
    sdfs_show_to,
    sdfs_show_from_to,
    sdfs_expand,
    sdfs_foldup,
    //edfs
    dflt_edfs_show_connd,
    dflt_edfs_calc_conns,
    get_edfs_repr_arr,
    edfs_show_all,
    edfs_show_root_tree,
    edfs_show_from,
    edfs_show_to,
    edfs_show_from_to,
    //sedfs
    dflt_sedfs_show_connd,
    gen_tag,
    sedfs_show_all,           
}

