//
const cmmn = require("./cmmn.js")

//tree ndict nodes nnodes same

//util



function calc_next_id(nodes) {
    if(cmmn.is_empty_dict(nodes)){
        return(0)
    } else {
        let ids = cmmn.dict_keys(nodes)
        return(Math.max(...ids)+1)
    }
}

function is_id(n) {
    let cond = ((n !== null) && (n !== undefined))
    return(cond) 
}

function update_one_nodeid(nd,idplus) {
    nd._id = nd._id + idplus
    nd._tree = nd._tree + idplus
    if(is_id(nd._fstch)) {
         nd._fstch = nd._fstch + idplus
    }
    if(is_id(nd._lsib)) {
         nd._lsib = nd._lsib + idplus
    }
    if(is_id(nd._rsib)) {
         nd._rsib = nd._rsib + idplus
    }
    if(is_id(nd._parent)) {
         nd._parent = nd._parent + idplus    
    } 
    return(nd)        
}


function update_nodes_ids(nodes0,nodes1) {
    let next_id = calc_next_id(nodes0)
    for(let id in nodes1) {
        let nnd = update_one_nodeid(nodes1[id],next_id) 
        nodes1[nnd._id] = nnd
        delete nodes1[id]
    }
    return(nodes1)
}

//

function creat_root(n=0){
    let _id = n
    let root = {
        _id:_id,
        _fstch:null,
        _lsib:null,
        _rsib:null,
        _parent:null,
        _tree:_id  //属于哪个tree
    }
    return(root)
}


function creat_nd(nodes,n=0) {
    /*
        by_dflt  leaf_nd
    */
    let _id = calc_next_id(nodes)+n
    let nd = {
        _id:_id,
        _fstch:null,
        _lsib:undefined,
        _rsib:undefined,
        _parent:undefined,
        _tree:undefined
    }
    return(nd)
}


//

function is_inited(nd) {
    //被添加到了树上
    let cond = (nd._tree !== undefined)
    return(cond)
}

function is_root(nd) {
    //tree 是自己
    let cond0 = (nd._tree!== undefined)
    let cond1 = (nd._tree === nd._id)
    return(cond0 && cond1)
}

function is_fstch(nd) {
    //没有左兄弟
    let cond = (nd._lsib === null)
    return(cond)
}

function is_lstch(nd) {
    //没有右兄弟
    let cond = (nd._rsib === null)
    return(cond)
}

function is_leaf(nd) {
    //没有子
    let cond = (nd._fstch === null)
    return(cond)
}

function is_lonely(nd,nodes) {
    let cond = is_root(nd)
    if(cond) {
        return(true)
    } else {
        let parent = get_parent(nd,nodes)
        let children = get_children(parent,nodes)
        return(children.length === 1)  
    } 
}

function is_connectable(nd) {
    return(is_root(nd) || !is_inited(nd))
}



/*
function eq(nd0,nd1) {
    //id 必须完全一致
    //只有同一颗树下自己等于自己
    let cond0 = (nd0._id === nd1._id)
    let cond1 = (nd0._tree === nd1._tree)
    return(cond0 && cond1)
}
*/

//

function prepend_child(nd,child,nodes) {
    if(is_connectable(child)) {} else { console.log('only root or uninited could be prepend');return(nd)}
    //只有根节点才可以被链接到另一颗树上
    let cond = is_leaf(nd)
    child._tree = nd._tree
    child._lsib = null
    if(cond){
        //child 也是lstch
        child._rsib = null
        child._parent = nd._id
    } else {
        //变更old_fstch
        let old_fstch = nodes[nd._fstch]
        //old_fstch 不再是fstch
        old_fstch._lsib = undefined
        //更新child
        child._rsib = old_fstch._id
        //
        //child 不是lstch _parent 置为 未计算
        child._parent = undefined
        //不改动fstch
    }
    nd._fstch = child._id
    nodes[child._id] = child
    //返回当前节点
    return(nd)
}


function append_child(nd,child,nodes) {
    if(is_connectable(child)) {} else { console.log('only root or uninited could be append');return(nd)}
    //
    let cond = is_leaf(nd)
    child._tree = nd._tree
    child._rsib = null
    if(cond){
        //child 也是lstch
        nd._fstch = child._id
        child._lsib = null
    } else {
        //变更old_lstch
        let old_lstch = get_lstch(nd,nodes)
        //old_lstch 不再是lstch
        old_lstch._parent = undefined
        old_lstch._rsib = child._id
        //child 不是fstch _lsib置为 undefined
        child._lsib = undefined
    }
    child._parent = nd._id
    nodes[child._id] = child
    return(nd)
}

function add_rsib(nd,rsib,nodes) {
    if(is_connectable(rsib)) {} else { console.log('only root or uninited could be add');return(nd)}
    //root 不可操作
    if(is_root(nd)) {
        console.log("cant addrsib to root")
        return(nd)
    }
    //
    let cond = is_lstch(nd)
    rsib._tree = nd._tree
    if(cond) {
        rsib._parent = nd._parent
        nd._parent = undefined
        rsib._rsib = null
    } else {
        rsib._rsib = nd._rsib
        rsib._parent = undefined
    }
    nd._rsib = rsib._id
    //rsib 一定不是fstch
    rsib._lsib = undefined
    //
    nodes[rsib._id] = rsib
    return(nd)
}

function add_lsib(nd,lsib,nodes) {
    //
    if(is_connectable(lsib)) {} else { console.log('only root or uninited could be add');return(nd)}
    //root 不可操作
    if(is_root(nd)) {
        console.log("cant addlsib to root")
        return(nd)
    }
    //
    let cond = is_fstch(nd)
    lsib._tree = nd._tree
    if(cond) {
        let parent = get_parent(nd,nodes)
        nd._lsib = undefined
        lsib._lsib = null
        parent._fstch = lsib._id
    } else {
        let old_lsib = get_lsib(nd,nodes)
        old_lsib._rsib = lsib._id
        //
        lsib._lsib = undefined
    }
    lsib._rsib = nd._id
    //lsib 一定不是lstch
    lsib._parent = undefined
    //
    nodes[lsib._id] = lsib
    return(nd)
}

function insert_child(which,nd,child,nodes) {
    let children = get_children(nd,nodes)
    let lngth = children.length
    if(lngth ===0) {
        return(prepend_child(nd,child,nodes))
    } else {
        let cond = (which<=lngth) && (which >=0)
        if(!cond) {
            console.log("not in range!!")
            return(nd)
        } else {
            if(which === 0) {
                return(prepend_child(nd,child,nodes))
            } else if(which === lngth) {
                return(append_child(nd,child,nodes))
            } else {
                let lnd = children[which-1]
                return(add_rsib(lnd,child,nodes))
            }
        }
    }
}


function update_treeid(nd,cnodes) {
    for(let id in cnodes) {
        cnodes[id]._tree = nd._tree
    }
}


/*tree*/

function prepend_child_tree(nd,nodes,cnodes) {
    cnodes = update_nodes_ids(nodes,cnodes)
    let k = cmmn.dict_keys(cnodes)[0]
    let child = get_root(cnodes[k],cnodes)
    nd = prepend_child(nd,child,nodes) 
    update_treeid(nd,cnodes)
    cmmn.dict_plus(nodes,cnodes)
    return(nd)
}

function append_child_tree(nd,nodes,cnodes) {
    cnodes = update_nodes_ids(nodes,cnodes)
    let k = cmmn.dict_keys(cnodes)[0]
    let child = get_root(cnodes[k],cnodes)
    nd = append_child(nd,child,nodes) 
    update_treeid(nd,cnodes)
    cmmn.dict_plus(nodes,cnodes)
    return(nd)
}

function add_rsib_tree(nd,nodes,cnodes) {
    cnodes = update_nodes_ids(nodes,cnodes)
    let k = cmmn.dict_keys(cnodes)[0]
    let child = get_root(cnodes[k],cnodes)
    nd = add_rsib(nd,child,nodes) 
    update_treeid(nd,cnodes)
    cmmn.dict_plus(nodes,cnodes)
    return(nd)
}

function add_lsib_tree(nd,nodes,cnodes) {
    cnodes = update_nodes_ids(nodes,cnodes)
    let k = cmmn.dict_keys(cnodes)[0]
    let child = get_root(cnodes[k],cnodes)
    nd = add_lsib(nd,child,nodes) 
    update_treeid(nd,cnodes)
    cmmn.dict_plus(nodes,cnodes)
    return(nd)
}

function insert_child_tree(which,nd,nodes,cnodes) {
    cnodes = update_nodes_ids(nodes,cnodes)
    let k = cmmn.dict_keys(cnodes)[0]
    let child = get_root(cnodes[k],cnodes)
    nd = insert_child(which,nd,child,nodes) 
    update_treeid(nd,cnodes)
    cmmn.dict_plus(nodes,cnodes)
    return(nd)
}


/*tree*/

function update_disconnected_nodes(nd,nodes) {
    let nsdfs = get_sdfs(nd,nodes)
    let treeid = nsdfs[0]._id
    nsdfs.forEach(
       nd=> {
           nd._tree =treeid 
       }
    ) 
    return(nsdfs)
}

function update_orig_nodes(nsdfs,nodes) {
    let nnodes = {}
    nsdfs.map(
        nd => {
            let id = nd._id
            nnodes[id] = nd
            delete nodes[id]
        }
    )
    return(nnodes)  
}


function leafize(nd) {
    nd._fstch = null
    //nd._lsib = null
    //nd._rsib = null
    return(nd)
}

function rootize(nd) {
    nd._lsib = null
    nd._rsib = null
    nd._parent = null
    return(nd) 
}


function disconnect(nd,nodes) {
    let cond = is_root(nd)
    if(cond) {
        //do nothing
        return([nd,nodes])
    } else if(is_lonely(nd,nodes)) {
        //
        let parent =  nodes[nd._parent]
        leafize(parent);
        let nsdfs = update_disconnected_nodes(nd,nodes);
        let nnodes = update_orig_nodes(nsdfs,nodes)
        rootize(nd);
        //
        return([nd,nnodes])         
    } else {
        if(is_fstch(nd)) {
            //节点变味新树的根节点
            let rsib = get_rsib(nd,nodes)
            //右兄弟变成了fstch, lsib 指向null
            rsib._lsib = null
            //右兄弟变成了fstch,parent要指向rsib
            //rsib._parent = nd._parent fstch的parent不需要改变
            // parent 的fstch 要指向rsib
            let parent = get_parent(nd,nodes) 
            parent._fstch = nd._rsib  
            //后代节点关系不变，但是tree变为当前节点._id
            let nsdfs = update_disconnected_nodes(nd,nodes)
            //从原来的nodes删除分离出的子树的所有节点
            let nnodes = update_orig_nodes(nsdfs,nodes)
            //nd 变为分离出去的tree的root
            rootize(nd);
            //
            return([nd,nnodes])             
        } else if(is_lstch(nd)) {
            //节点变味新树的根节点
            let lsib = get_lsib(nd,nodes) 
            lsib._rsib = nd._rsib
            //左兄弟变成了lstch,左邻居要指向parent
            lsib._parent = nd._parent
            //后代节点关系不变，但是tree变为当前节点._id
            let nsdfs = update_disconnected_nodes(nd,nodes) 
            //从原来的nodes删除分离出的子树的所有节点
            let nnodes = update_orig_nodes(nsdfs,nodes)
            //nd 变为分离出去的tree的root
            rootize(nd);
            //
            return([nd,nnodes])
        } else {
            //节点变味新树的根节点
            let lsib = get_lsib(nd,nodes) 
            lsib._rsib = nd._rsib
            //后代节点关系不变，但是tree变为当前节点._id
            let nsdfs = update_disconnected_nodes(nd,nodes)
            //从原来的nodes删除分离出的子树的所有节点
            let nnodes = update_orig_nodes(nsdfs,nodes)
            //nd 变为分离出去的tree的root
            rootize(nd);
            //
            return([nd,nnodes])
        }
    }   
}

//在父节点上操作
function rm_fstch(nd,nodes) {
    let fstch = get_fstch(nd,nodes)
    if(fstch===null) {
        return([nd,nodes])
    } else {
        return(disconnect(fstch,nodes))
    }
}

function rm_lstch(nd,nodes) {
    let lstch = get_lstch(nd,nodes)
    if(lstch===null) {
        return([nd,nodes])
    } else {
        return(disconnect(lstch,nodes))
    }
}

function rm_which(index,nd,nodes) {
    let child = get_which_child(index,nd,nodes)
    if(child===null) {
        return([nd,nodes])
    } else {
        return(disconnect(child,nodes))
    }     
}

function rm_some(nd,nodes,...whices) {
    let some = get_some_children(nd,nodes,...whiches) 
    for(let i=0;i<some.length;i++) {
        disconnect(some[i],nodes)
    }
    return([nd,nodes])
}

function rm_all(nd,nodes) {
    let children = get_children(nd,nodes)
    for(let i=0;i<children.length;i++) {
        disconnect(children[i],nodes)
    }
    return(nodes)
}

/**/

//child

function get_fstch(nd,nodes) {
    let fstch = (nd._fstch===null)?null:nodes[nd._fstch]
    return(fstch)
}


function get_children(nd,nodes){
    let children = []
    let child = get_fstch(nd,nodes)
    while(child!==null){
        children.push(child)
        child = get_rsib(child,nodes)
    }
    return(children)
}

function get_lstch(nd,nodes) {
    let children = get_children(nd,nodes)
    if(children.length ===0){
        return(null)
    } else {
        return(children[children.length-1])
    }
}

function get_which_child(which,nd,nodes) {
    let children = get_children(nd,nodes)
    if(children.length ===0){
        return(null)
    } else {
        let cond = (which>children.length-1) || (which <0)
        if(cond){
            return(null)
        } else {
            return(children[which])
        }
    }
}

function get_some_children(nd,nodes,...whiches) {
    let children = get_children(nd,nodes)
    let some = []
    if(children.length ===0) {
        
    } else {
        for(let i=0;i<whiches.length;i++) {
            let which = whiches[i]
            let cond = (which>children.length-1) || (which <0)
            if(cond) {
                
            } else {
                some.push(children[which])
            }
        }
    }
    return(some)
}


////sibs
function get_lstsib(nd,nodes,including_self=false) {
    let lstrsib = nd
    let rsib = get_rsib(nd,nodes)
    while(rsib!==null) {
        lstrsib = rsib
        rsib = get_rsib(rsib,nodes)
    }
    if(including_self){
        return(lstrsib)
    } else {
        if(lstrsib._id !== nd._id) {
            return(lstrsib)
        } else {
            return(null)
        }
    }
}


function get_preceding_sibs(nd,nodes) {
    let sibs = get_sibs(nd,nodes,true)
    let seq = cmmn.dtb_kv_get_seq("_id",nd._id,sibs)
    let some = []
    if(sibs.length ===0) {
        
    } else {
        for(let i=0;i<sibs.length;i++) {
            let cond = i<seq
            if(cond) {
                some.push(sibs[i])
            }
        }
    }
    return(some)
}

function get_following_sibs(nd,nodes) {
    let sibs = get_sibs(nd,nodes,true)
    let seq = cmmn.dtb_kv_get_seq("_id",nd._id,sibs)
    let some = []
    if(sibs.length ===0) {
        
    } else {
        for(let i=0;i<sibs.length;i++) {
            let cond = i>seq
            if(cond) {
                some.push(sibs[i])
            }
        }
    }
    return(some)
}

function get_sibs(nd,nodes,including_self=false) {
    let parent = get_parent(nd,nodes)
    let sibs;
    if(parent !== null) { 
        sibs = get_children(parent,nodes)
    } else {
        sibs =[nd]
    }
    if(including_self) {
        return(sibs)
    } else {
        sibs = cmmn.dtb_kv_rm('_id',nd._id,sibs)
    }
    return(sibs)
}

function get_fstsib(nd,nodes,including_self=false) {
    let sibs = get_sibs(nd,nodes,true)
    if(including_self) {
        return(sibs[0])
    } else {
        if(sibs[0]._id === nd._id) {
            return(null)
        } else {
            return(sibs[0])
        }
    }
}


function get_which_sib(which,nd,nodes) {
    let sibs = get_sibs(nd,nodes,true)
    let lngth = sibs.length
    let cond = (which<=lngth-1) && (which >=0)
    if(cond) {
        return(sibs[which])
    } else {
        return(null)
    }
}

function get_some_sibs(nd,nodes,...whiches) {
    let sibs = get_sibs(nd,nodes,true)
    let some = []
    if(sibs.length ===0) {
        
    } else {
        for(let i=0;i<whiches.length;i++) {
            let which = whiches[i]
            let cond = (which>sibs.length-1) || (which <0)
            if(cond) {
                
            } else {
                some.push(sibs[which])
            }
        }
    }
    return(some)
}

function get_sibseq(nd,nodes) {
    let sibs = get_sibs(nd,nodes,true)
    let seq = cmmn.dtb_kv_get_seq("_id",nd._id,sibs)
    return(seq)
}

function get_lsib(nd,nodes) {
    let sibs = get_sibs(nd,nodes,true)
    let seq = cmmn.dtb_kv_get_seq("_id",nd._id,sibs)
    if(seq === 0) {
        return(null)
    } else {
        return(sibs[seq-1])
    }
}

function get_rsib(nd,nodes) {
    let rsib = (nd._rsib===null)?null:nodes[nd._rsib]
    return(rsib)
}

//layer

function get_depth(nd,nodes) {
    let ances = get_ances(nd,nodes,true)
    return(ances.length-1)
}

function get_height(nd,nodes) {
    let depth = get_depth(nd,nodes)
    let sdfs = get_sdfs(nd,nodes)
    let des_depths = sdfs.map(r=>get_depth(r,nodes))
    let max = Math.max(...des_depths)
    return(max-depth+1)
}

function get_fst_lyr_des_depth(nd,nodes) {
    let cond = is_leaf(nd)
    if(cond) {
        return(null)
    } else {
        let depth = get_depth(nd,nodes)
        return(depth+1)
    }
}

function get_lst_lyr_des_depth(nd,nodes) {
    let cond = is_leaf(nd)
    if(cond) {
        return(null)
    } else {
        let depth = get_depth(nd,nodes)
        let sdfs = get_sdfs(nd,nodes)
        let des_depths = sdfs.map(r=>get_depth(r,nodes))
        let max = Math.max(...des_depths)
        return(max)
    }
}

function get_which_lyr_des_depth(which,nd,nodes) {
    let depth = get_depth(nd,nodes)
    let height = get_height(nd,nodes)
    if(height<=which){
        return(null)
    } else {
        return(depth+which)
    }
}


function get_lyr(nd,nodes) {
    let root = get_root(nd,nodes)
    let sdfs = get_sdfs(root,nodes)
    let depth = get_depth(nd,nodes)
    let lyr = sdfs.filter(nd=>(get_depth(nd,nodes) === depth))
    return(lyr) 
}

function get_breadth(nd,nodes) {
    let lyr = get_lyr(nd,nodes)
    let breadth = cmmn.dtb_kv_get_seq('_id',nd._id,lyr)
    return(breadth)
}


function get_count(nd,nodes) {
    let sdfs = get_sdfs(nd,nodes)
    return(sdfs.length)
}

//ance
function get_root(nd,nodes) {
    /*
        get_root(root,nodes)
        get_root(child,nodes)
    */
    let lst_parent = nd
    let parent = get_parent(nd,nodes)  
    while(parent !== null) {
        lst_parent = parent
        parent = get_parent(parent,nodes)
    }
    return(lst_parent)
}

function get_parent(nd,nodes) {
    let parent;
    if(is_root(nd)) {
        parent = null
    } else {
        let lstrsib = get_lstsib(nd,nodes,true)
        parent = nodes[lstrsib._parent]
    }
    return(parent)
}

function get_ances(nd,nodes,including_self=false) {
    let ances = []
    let parent = get_parent(nd,nodes)  
    while(parent !== null) {
        ances.push(parent)
        parent = get_parent(parent,nodes)
    }
    if(including_self){
        ances.unshift(nd)
    } else {
        
    }
    return(ances)
}

function get_which_ance(which,nd,nodes) {
    let ances = get_ances(nd,nodes,true)
    let lngth = ances.length
    let cond = (which<lngth) && (which>=0)
    if(cond) {
        return(ances[which])
    } else {
        return(null)
    }
}

function get_some_ances(nd,nodes,...whiches) {
    let ances = get_ances(nd,nodes,true)
    let some = []
    if(ances.length ===0) {
        
    } else {
        for(let i=0;i<whiches.length;i++) {
            let which = whiches[i]
            let cond = (which>ances.length-1) || (which <0)
            if(cond) {
                
            } else {
                some.push(ances[which])
            }
        }
    }
    return(some)
}



//sdfs  depth-first  record-when-open-tag

function get_rsib_of_fst_ance_having_rsib(nd,nodes) {
    /*
        along the parent chain until root,not_including_self
        if the parent have rsib,return the rsib-of-parent
        ---------
    */
    let parent = get_parent(nd,nodes)
    while(parent!==null) {
        let rsib = get_rsib(parent,nodes)
        if(rsib!==null) {
            return(rsib)
        } else {
            parent = get_parent(parent,nodes)
        }
    }
    return(null)
}


function get_sdfs_next(nd,nodes) {
    /*
        如果有child, 返回first-child
            如果有rsib,返回rsib
                沿着祖先链往上,找到第一个有rsib的ance,返回这个ance的rsib
        如果返回null,表明当前节点是sdfs数组的最后一个节点
    */
    let fstch = get_fstch(nd,nodes)
    if(fstch !== null) {
        return(fstch)
    } else {
        let rsib = get_rsib(nd,nodes)
        if(rsib !== null) {
            return(rsib)
        } else {
            return(get_rsib_of_fst_ance_having_rsib(nd,nodes))
        }
    }
}

function get_drmost_des(nd,nodes){
    /*
       down-most  and right-most of subtree
       including_self
    */
    let old_lstch = nd
    let lstch = get_lstch(nd,nodes)
    while(lstch !== null) {
        old_lstch = lstch
        lstch = get_lstch(lstch,nodes)
    }
    return(old_lstch)
}

function get_sdfs_prev(nd,nodes) {
    /*
        如果是root ,返回null 因为root 是起始点
        如果是叶子节点
            如果有lsib,返回lsib
            如果没有lsib,返回parent(没有lsib 说明这个节点是first-child)
        如果不是叶子节点
             如果有左邻居
                 lsib是leaf,返回lsib
                 lsib不是leaf,返回drmost-of-lsib 
             如果没有lsib,返回parent
    */ 
    if(is_root(nd)) {
        return(null)
    }
    let cond = is_leaf(nd)
    if(cond) {
        let lsib = get_lsib(nd,nodes)
        if(lsib !== null) {
            return(lsib)
        } else {
            let parent = get_parent(nd,nodes)
            return(parent)
        }
    } else {
        let lsib = get_lsib(nd,nodes)
        if(lsib !== null) {
            let cond = is_leaf(lsib)
            if(cond) {
                return(lsib)
            } else {
                return(get_drmost_des(lsib,nodes))
            }
        } else {
            let parent = get_parent(nd,nodes)
            return(parent)
        }
    }
}


function get_sdfs(nd,nodes) {
    let nd_depth = get_depth(nd,nodes)
    let sdfs =[]
    while(nd!==null) {
        sdfs.push(nd)
        nd = get_sdfs_next(nd,nodes)
        if(nd!==null) {
            let depth = get_depth(nd,nodes)
            if(depth<=nd_depth) {
                break
            }
        }
    }
    return(sdfs)
}

//edfs


function get_dlmost_des(nd,nodes) {
    /*
        including_self
    */
    let old_fstch = nd
    let fstch = get_fstch(nd,nodes)
    while(fstch !== null) {
        old_fstch = fstch
        fstch = get_fstch(fstch,nodes)
    }
    return(old_fstch)
}

function get_edfs_next(nd,nodes) {
    let rsib = get_rsib(nd,nodes)
    if(rsib === null) {
        //如果没有右兄弟，说明节点是lstch,此时应该返回父节点
        let p = get_parent(nd,nodes)
        return(p)
    } else {
       //如果有右兄弟，返回down-left-most-of-rsib
       return(get_dlmost_des(rsib,nodes))
    }
}

function get_lsib_of_fst_ance_having_lsib(nd,nodes) {
    /*
        along the parent chain until root,not_including_self
        if the parent have lsib,return the lsib-of-parent
        ---------
    */
    let parent = get_parent(nd,nodes)
    while(parent!==null) {
        let lsib = get_lsib(parent,nodes)
        if(lsib!==null) {
            return(lsib)
        } else {
            parent = get_parent(parent,nodes)
        }
    }
    return(null)
}



function get_edfs_prev(nd,nodes) {
    let cond = is_leaf(nd)
    if(!cond) {
        return(get_lstch(nd,nodes))
    } else {
       let lsib = get_lsib(nd,nodes)
       if(lsib === null) {
           return(get_lsib_of_fst_ance_having_lsib(nd,nodes))
       } else {
           return(lsib)
       }
    }    
}


function get_edfs(nd,nodes) {
    let edfs = []
    let nxt = get_dlmost_des(nd,nodes)
    while(nxt !== null ) {
        edfs.push(nxt)
        if(nxt._id === nd._id) {
            break;
        } else {
            nxt = get_edfs_next(nxt,nodes)
        }
    }
    return(edfs)
}

//sedfs

function clear_$visited(nodes) {
    cmmn.dict_foreach(nodes,(k,v)=>{nodes[k]._$visited = false})    
}

function get_sedfs_next(nd,nodes) {
    let visited = nd._$visited
    let cond = is_leaf(nd)
    if(cond) {
        if(visited) {
            let rsib = get_rsib(nd,nodes)
            if(rsib === null) {
                return(get_parent(nd,nodes))  
            } else {
                return(rsib)
            } 
        } else {
            nd._$visited = true
            return(nd)
        }
    } else {
        if(visited) {
            let rsib = get_rsib(nd,nodes)
            if(rsib === null) {
                return(get_parent(nd,nodes)) 
            } else {
                return(rsib)
            } 
        } else {
            nd._$visited = true
            return(get_fstch(nd,nodes))    
        }
    }    
}


function get_sedfs_prev(visited,nd,nodes) {
    let cond = is_leaf(nd)
    if(cond) {
        if(visited) {
            return(nd)
        } else {
            let lsib = get_lsib(nd,nodes)
            if(lsib === null) {
                return(get_parent(nd,nodes))
            } else {
                return(lsib)
            }
        }
    } else {
        if(visited) {
            return(get_lstch(nd,nodes))
        } else {
            let lsib = get_lsib(nd,nodes)
            if(lsib === null) {
                return(get_parent(nd,nodes))
            } else {
                return(lsib)
            }
        }
    }
}

function is_sedfs_traverse_finished(start_id,nd) {
    let cond = (nd._$visited) && (start_id === nd._id)
    return(cond)
}

function get_sedfs(nd,nodes,deepcopy=false,clear=true) {
    let sedfs = []
    clear_$visited(nodes)   
    let start_id = nd._id
    while(!is_sedfs_traverse_finished(start_id,nd)) {
        deepcopy? sedfs.push(cmmn.dcp(nd)):sedfs.push(nd)
        nd = get_sedfs_next(nd,nodes)
    }
    deepcopy?sedfs.push(cmmn.dcp(nd)):sedfs.push(nd)
    if(clear){
        clear_$visited(nodes)
    }
    return(sedfs)
}

//

function nd2ele(nd,nodes) {
    let ele = {}
    ele._depth = get_depth(nd,nodes)
    ele._breadth = get_breadth(nd,nodes) 
    let p = get_parent(nd,nodes)
    ele._pbreadth = (p===null)? null : get_breadth(p,nodes) 
    ele._id = nd._id
    return(ele)
}




function _nd2unhandled_ele(nd) {
    let o = {}
    o.ele = {}
    o.nd = nd
    o.ele._id = nd._id
    o.ele._children = []
    return(o) 
}

function sdfs2mat(sdfs,nodes) {
    let m = []
    let nd = sdfs[0]
    let unhandled = [_nd2unhandled_ele(nd)]
    unhandled[0].ele._pbreadth = null
    while(unhandled.length>0){
        let next_unhandled = []
        for(let i=0;i<unhandled.length;i++) {
            unhandled[i].ele._breadth = i
            unhandled[i].ele._depth = m.length
            let children = get_children(unhandled[i].nd,nodes)
            children = children.map(nd=>_nd2unhandled_ele(nd))
            children.forEach(
                (r,index)=>{
                    r.ele._pbreadth = unhandled[i].ele._breadth
                    unhandled[i].ele._children.push([(m.length+1),next_unhandled.length+index])
                }
            )
            next_unhandled = next_unhandled.concat(children)
        }
        let lyr = unhandled.map(r=>r.ele)
        m.push(lyr)
        unhandled = next_unhandled
    }   
    return(m)        
}

function sdfs2edfs(sdfs,nodes) {
    return(get_edfs(sdfs[0],nodes))
}

function sdfs2sedfs(sdfs,nodes,deepcopy=false,clear=true) {
    return(get_sedfs(sdfs[0],nodes,deepcopy,clear))
}

function edfs2mat(edfs,nodes) {
    let sdfs = edfs2sdfs(edfs,nodes)
    let m = sdfs2mat(sdfs,nodes)
    return(m)
}

function edfs2sdfs(edfs,nodes) {
    let nd = edfs[edfs.length-1]
    return(get_sdfs(nd,nodes))
}

function edfs2sedfs(edfs,nodes,deepcopy=false,clear=true) {
    let sdfs = edfs2sdfs(edfs,nodes)
    return(sdfs2sedfs(sdfs,nodes,deepcopy,clear)) 
}

function sedfs2mat(sedfs,nodes) {
    let sdfs = sedfs2sdfs(sedfs,nodes)
    return(sdfs2mat(sdfs,nodes))
}        

function sedfs2sdfs(sedfs,nodes) {
    let nd = sedfs[0]
    return(get_sdfs(nd,nodes))
}        

function sedfs2edfs(sedfs,nodes) {
    let sdfs = sedfs2sdfs(sedfs,nodes)
    return(sdfs2edfs(sdfs,nodes))
}


//

function get_deses(nd,nodes,including_self=false) {
    let deses = get_sdfs(nd,nodes)
    if(including_self) {
    } else {
        deses.splice(0,1)
    }
    return(deses)
}

function get_fst_lyr_deses(nd,nodes) {
    return(get_children(nd,nodes))
}

function get_lst_lyr_deses(nd,nodes) {
    let deses = get_deses(nd,nodes,false)
    let des_depths = sdfs.map(r=>get_depth(r,nodes))
    let max = Math.max(...des_depths)
    deses = deses.filter(r=>(get_depth(r,nodes)===max))
    return(deses)
}

function get_which_lyr_deses(which,nd,nodes) {
    let depth = get_depth(nd,nodes)
    let deses = get_deses(nd,nodes,false)
    let des_depths = sdfs.map(r=>get_depth(r,nodes))
    deses = deses.filter(r=>(get_depth(r,nodes)===(depth+which)))
    return(deses)
}

function get_some_deses(nd,nodes,...whiches) {
    let deses = whiches.map(which => get_which_deses(which,nd,nodes))
    deses = Array.prototype.concat(...deses)
    return(deses)
}


//
function get_root_via_tree(tree) {
    let k = cmmn.dict_keys(tree)[0]
    let nd = tree[k]
    let root = get_root(nd,tree)
    return(root)
}

function tree2sdfs(tree) {
    let root = get_root_via_tree(tree)
    let sdfs = get_sdfs(root,tree) 
    return(sdfs)
}



module.exports = {
    //
    calc_next_id,
    update_nodes_ids,
    //creat
    creat_root:creat_root,
    creat_nd:creat_nd,
    //is
    is_inited:is_inited,
    is_root:is_root,
    is_fstch:is_fstch,
    is_lstch:is_lstch,
    is_leaf:is_leaf,
    is_lonely:is_lonely,
    is_id:is_id,
    is_connectable:is_connectable,
    //insert 
    prepend_child:prepend_child,
    append_child:append_child,
    insert_child:insert_child,
    add_rsib:add_rsib,
    add_lsib:add_lsib,
    //child
    get_fstch:get_fstch,
    get_rsib:get_rsib,
    get_children:get_children,
    get_lstch:get_lstch,
    get_which_child:get_which_child,
    get_some_children:get_some_children,
    //sib
    get_fstsib:get_fstsib,
    get_lstsib:get_lstsib,
    get_preceding_sibs:get_preceding_sibs,
    get_following_sibs:get_following_sibs,
    get_sibs:get_sibs,
    get_which_sib:get_which_sib,
    get_some_sibs:get_some_sibs,
    get_sibseq:get_sibseq,
    get_lsib:get_lsib,
    get_rsib:get_rsib,
    //mat
    get_lyr:get_lyr,
    get_breadth:get_breadth,
    get_count:get_count,
    get_depth:get_depth,
    get_height:get_height,
    get_fst_lyr_des_depth:get_fst_lyr_des_depth,
    get_lst_lyr_des_depth:get_lst_lyr_des_depth,
    get_which_lyr_des_depth:get_which_lyr_des_depth,
    //ance
    get_root:get_root,
    get_parent:get_parent,
    get_ances:get_ances,
    get_which_ance:get_which_ance,
    get_some_ances:get_some_ances,
    //sdfs
    get_rsib_of_fst_ance_having_rsib:get_rsib_of_fst_ance_having_rsib,
    get_sdfs_next:get_sdfs_next,
    get_drmost_des:get_drmost_des,
    get_sdfs_prev:get_sdfs_prev,
    get_sdfs:get_sdfs,
    //edfs
    get_lsib_of_fst_ance_having_lsib:get_lsib_of_fst_ance_having_lsib,
    get_dlmost_des:get_dlmost_des,
    get_edfs_next:get_edfs_next,
    get_edfs_prev:get_edfs_prev,
    get_edfs:get_edfs,
    //sedfs
    clear_$visited:clear_$visited,
    get_sedfs_next:get_sedfs_next,
    is_sedfs_traverse_finished:is_sedfs_traverse_finished,
    get_sedfs_prev:get_sedfs_prev,    
    get_sedfs:get_sedfs,
    //des
    get_deses:get_deses,
    get_fst_lyr_deses:get_fst_lyr_deses,
    get_lst_lyr_deses:get_lst_lyr_deses,
    get_which_lyr_deses:get_which_lyr_deses,
    get_some_deses:get_some_deses,
    //mat
    nd2ele:nd2ele,
    sdfs2mat:sdfs2mat,
    //
    sdfs2edfs:sdfs2edfs,
    sdfs2sedfs:sdfs2sedfs,
    edfs2mat:edfs2mat,
    edfs2sdfs:edfs2sdfs,
    edfs2sedfs:edfs2sedfs,
    sedfs2mat:sedfs2mat,
    sedfs2sdfs:sedfs2sdfs,
    sedfs2edfs:sedfs2edfs,
    //
    update_disconnected_nodes,
    update_orig_nodes,
    leafize,
    rootize,
    disconnect,
    rm_fstch,
    rm_lstch,
    rm_which,
    rm_some,
    rm_all,
    //
    update_treeid,
    update_one_nodeid,
    update_nodes_ids,
    prepend_child_tree,
    append_child_tree,
    add_rsib_tree,
    add_lsib_tree,
    insert_child_tree,
    //
    get_root_via_tree,
    tree2sdfs,
}


