const nd = "./nd.js"


function is_inited(id,nodes) {
    let nd = nodes[id]
    return(nd.is_inited(nd))
}

function is_root(id,nodes) {
    let nd = nodes[id]
    return(nd.is_root(nd))
}

function is_fstch(id,nodes) {
    let nd = nodes[id]
    return(nd.is_fstch(nd))
}

function is_lstch(id,nodes) {
    let nd = nodes[id]
    return(nd.is_lstch(nd))
}

function is_leaf(id,nodes) {
    let nd = nodes[id]
    return(nd.is_leaf(nd))
}

function get_fstch(id,nodes) {
    let nd = nodes[id]
    let fstch = nd.get_fstch(nd,nodes)._id
    return(fstch)
}

function get_rsib(id_nodes) {
    let nd = nodes[id]
    let rsib = nd.get_rsib(nd,nodes)._id
    return(rsib)
}

function get_children(id,nodes) {
    let nd = nodes[id]
    let children = nd.get_children(nd,nodes)
    children = children.map(child=>child._id)
    return(children)
}

function get_lstch(id,nodes) {
    let nd = nodes[id]
    let lstch = nd.get_lstch(nd,nodes)
    if(lstch === null) {
        return(null)
    } else {
        return(lstch._id)
    }
}

function get_which_child(id,nodes) {
    let nd = nodes[id]
    let child = nd.get_which_child(nd,nodes)
    if(child === null) {
        return(null)
    } else {
        return(child._id)
    }
}

module.exports = {
    is_inited:is_inited,
    is_root:is_root,
    is_fstch:is_fstch,
    is_lstch:is_lstch,
    is_leaf:is_leaf,
    get_fstch,
    get_rsib,
    get_children,
    get_lstch,
    get_which_child,
    
}
