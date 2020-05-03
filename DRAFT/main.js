const _nodes = {}

function clear_nodes() {
    for(let _id in _nodes) {
        delete _nodes[_id]
    }
    return(_nodes)
}

function del_ele(ele) {
    try {
        delete _nodes[ele._id]
    } catch(err) {
        console.log(err)
    }
}


function gen_guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}



function dcp(obj) {
    return(JSON.parse(JSON.stringify(obj)))
}


function creat_element(tag) {
    let _id = gen_guid()
    let ele = {
        _id:_id,
        tag:tag,
        attrib:{},
        text:"",
        tail:"",
        children:[]
    }
    _nodes[_id] = ele
    return(ele)
}

function gen_bgclr() {
    let r = Math.floor(Math.random()*256)
    let g = Math.floor(Math.random()*256)
    let b = Math.floor(Math.random()*256)
    let a = Math.random()
    return('rgba('+r+','+g+','+b+','+a+')')
}


function creat_row_style(flex_grow=1){
    let style = {
        display:"flex",
        "flex-direction":"row",
        "justify-content":"space-between",
        "align-items":"center",
        "flex-grow":flex_grow,
        "background-color":gen_bgclr(),
    }
    return(style)
}

function creat_column_style(flex_grow=1){
    let style = {
        display:"flex",
        "flex-direction":"column",
        "justify-content":"space-between",
        "align-items":"center",
        "flex-grow":flex_grow,
        "background-color":gen_bgclr(),
    }
    return(style)
}


function creat_row_element(tag) {
    let ele = creat_element(tag)
    ele.attrib.style = creat_row_style()
    return(ele)
}

function creat_column_element(tag) {
    let ele = creat_element(tag)
    ele.attrib.style = creat_column_style()
    return(ele)
}


//用nvdmatjs




////////////////////////////////

function split_element_via_row(ele,...chtags){
    let children = chtags.map(chtag=>creat_row_element(chtag))
    children = children.map(child=>child._id)
    ele.children = children
    return(ele)
}

function split_element_via_column(ele,...chtags){
    let children = chtags.map(chtag=>creat_column_element(chtag))
    children = children.map(child=>child._id)
    ele.children = children
    return(ele)
}


function get_children(ele) {
    let chids = ele.children
    let children = chids.map(_id=>_nodes[_id])
    return(children)
}

function get_fst_child(ele) {
    return(get_children(ele)[0])
}

function get_lst_child(ele) {
    let children = get_children(ele)
    return(children[children.length-1])
}

function get_which_child(ele,which) {
    return(get_children(ele)[which])
}

function is_leaf(ele) {
    let cond = ele.children.length === 0
    return(cond)
}

function get_parent(ele) {
}











root = creat_row_element('view')
root = split_element_via_column(root,'view','view','view')





