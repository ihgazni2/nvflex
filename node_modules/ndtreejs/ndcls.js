const ndutil = require('./util.js')
const cmmn = require('./cmmn.js')
const ndfunc = require('./ndfunc.js')
const EventTarget = require('./event-target.js').EventTarget
const STRUCT_KEYS = ['_fstch','_lsib','_rsib','_parent','_tree']


function _is_inited(nd) {
    //被添加到了树上
    let cond = (nd._tree !== undefined)
    return(cond)
}

function _is_root(nd) {
    //根节点的_tree 指向自己
    let cond = (nd._tree === nd)
    return(cond)
}

function _is_fstch(nd) {
    //没有左兄弟
    let cond = (nd._lsib === null)
    return(cond)
}

function _is_lstch(nd) {
    //没有右兄弟
    let cond = (nd._rsib === null)
    return(cond)
}


function _is_leaf(nd) {
    //没有子
    let cond = (nd._fstch === null)
    return(cond)
}


function _is_lonely(nd) {
    let sibs = nd.$sibs(true)
    return(sibs.length === 1)
}


function _is_connectable(nd) {
    return(_is_root(nd) || !_is_inited(nd))
}



/* child query*/

//_fstch is always directly

function _lstch(nd) {
    let child = nd._fstch
    let oldch = child
    while(child!==null) {
        oldch = child
        child = child._rsib
    }
    return(oldch)
}

function _which_child(index,nd) {
    let c = 0
    let child = nd._fstch
    while(true) {
        if(c === index) {
            return(child)
        } else {
            if(child === null) {
                return(child)
            } else {
            }
        }
        child = child._rsib
        c = c + 1
    }
}

function _some_children(nd,...whiches) {
    let children = []
    let c = 0
    let child = nd._fstch
    while(true) {
        if(whiches.includes(c)) {
            children.push(child)
        } else {
            if(child === null) {
                return(children)
            } else {
            }
        }
        child = child._rsib 
        c = c + 1
    }
}

function _children(nd) {
    let children = []
    let c = 0
    let child = nd._fstch
    while(true) {
        if(child === null) {
            return(children)
        } else {
            children.push(child)
        }
        child = child._rsib
        c = c + 1
    }
}


function _children_count(nd) {
    let c = 0
    let child = nd._fstch
    while(true) {
        if(child === null) {
            return(c)
        } else {
        }
        child = child._rsib
        c = c + 1
    }
}


/*sib*/

//_rsib is always directly 

function _lstsib(nd,including_self=false) {
    let rsib = nd._rsib
    let oldrsib = nd
    while(rsib !== null) {
        oldrsib = rsib
        rsib = rsib._rsib 
    }  
    if(including_self){
        return(oldrsib)
    } else {
        if(oldrsib !== nd) {
            return(oldrsib)
        } else {
            return(null)
        }
    }    
}



function _fstsib(nd,including_self=false) {
    let p = _parent(nd)
    if(p === null) {
        return((including_self)?nd:null)
    } else {
        let fstsib = p._fstch
        if(including_self) {
            return(fstsib)        
        } else {
            if(fstsib !== nd) {
                return(fstsib)
            } else {
                return(null)
            }
        }
    }
}


function _lsib(nd) {
    let fstsib = _fstsib(nd,false)
    if(fstsib === null) {
        return(null)
    } else {
        let sib = fstsib
        while(true) {
            if(sib._rsib === nd) {
                return(sib)
            } else {
            }
            sib = sib._rsib
        }
    }
}


function _psibs(nd) {
    let psibs = []
    let fstsib = _fstsib(nd,true)
    let sib = fstsib
    while(sib !== null) {
        if(sib === nd) {
            return(psibs)           
        } else {
            psibs.push(sib)
        }
        sib = sib._rsib
    }
}


function _fsibs(nd) {
    let fsibs = []
    let rsib = nd._rsib
    while(rsib !== null) {
        fsibs.push(rsib)
        rsib = rsib._rsib
    }
    return(fsibs)
}

function _sibs(nd,including_self=false) {
    let psibs = _psibs(nd)
    let fsibs = _fsibs(nd)
    let me = [nd]
    if(including_self) {
        sibs = psibs.concat(me,fsibs)
    } else {
        sibs = psibs.concat(fsibs)
    }
    return(sibs)
}


function _which_sib(index,nd) {
    let sib = _fstsib(nd,true)
    let c = 0
    while(true) {
        if(sib === null) {
            return(null)
        } else {
            if(c==index) {
                return(sib)
            }
        }
        sib = sib._rsib
        c = c + 1
    }    
}

function _some_sibs(nd,...indexes) {
    let sibs = _sibs(nd,true) 
    let some = sibs.filter(
        (r,i) => indexes.includes(i) 
    )
    return(some)   
}


function _sibseq(nd) {
    let psibs = _psibs(nd)
    return(psibs.length)
}


function _sibs_count(nd,including_self=false) {
    let sibs = nd.$sibs(including_self)
    return(sibs.length)
}




/*ance*/

function _parent(nd) {
    let lstsib = _lstsib(nd,true)
    return(lstsib._parent)
}

function _root(nd) {
    let ance = nd
    let old = nd
    while(ance !== null) {
        old = ance
        ance = ance.$parent()
    }
    return(old)    
}

function _which_ance(index,nd) {
    let c = 0
    let ance = nd
    while(ance !== null) {
        if(c === index) {
            return(ance)
        } else {
        }
        ance = ance.$parent()
        c = c+1
    }
    return(null)
}

function _ances(nd,including_self=false) {
    let ances = []
    let ance = nd
    if(including_self) {
        ances.push(ance)
    } else {
    } 
    ance = ance.$parent()
    while(ance !== null)  {
        ances.push(ance)
        ance = ance.$parent()
    }
    return(ances) 
}

function _some_ances(nd,...indexes) {
    let ances = _ances(nd,true)
    let some = ances.filter(
        (r,i) => indexes.includes(i)
    )
    return(some)      
}

function _ances_count(nd,including_self=false) {
    let ances = _ances(nd,including_self)
    return(ances.length)
}


/**/
function _luncle(nd) {
    let p = nd.$parent()
    if(p === null) {
        return(null)
    } else {
        return(p.$lsib())
    } 
}

function _runcle(nd) {
    let p = nd.$parent()
    if(p === null) {
        return(null)
    } else {
        return(p.$rsib())
    } 
}

function _lcin(nd) {
    let luncle = nd.$luncle()
    if(!nd.$is_fstch()) {
        return(null) 
    } else if(luncle === null) {
        return(null)
    } else {
        return(luncle.$lstch())
    }
}

function _rcin(nd) {
    let runcle = nd.$runcle()
    if(!nd.$is_lstch()) {
        return(null)
    } else if(runcle === null) {
        return(null)
    } else {
        return(runcle.$fstch())
    }
}

/**/

function _lyr(nd) {
    let rt = nd.$root() 
    let sdfs = rt.$sdfs() 
    let depth = nd.$depth()
    let lyr = sdfs.filter(nd=>(nd.$depth() === depth))
    return(lyr)    
}

/**/


function _breadth(nd) {
    let lyr = nd.$lyr()
    let breadth = lyr.indexOf(nd)
    return(breadth)   
}

function _width(nd) {
    //只计算叶子个数的宽度
    let sdfs = nd.$sdfs()
    sdfs = sdfs.filter(nd=>nd.$is_leaf())
    return(sdfs.length)
}

function _offset(nd) {
    //edfs filter-by-isleaf ,and then index 
    //如果是非叶子,dlmost的offset
    let rt = nd.$root()
    let edfs = rt.$edfs()
    let index;
    if(nd.$is_leaf()) {
        index = edfs.indexOf(nd) 
    } else {
        let dlmost = nd.$dlmost_des()
        index = edfs.indexOf(dlmost)
    }
    edfs = edfs.slice(0,index+1)
    offset = edfs.filter(nd=>nd.$is_leaf()).length - 1
    return(offset) 
}

/**/


function _deses(nd,including_self=false) {
    let drmost = _drmost_des(nd) 
    let sdfs = _sdfs(nd)
    let index = sdfs.indexOf(drmost) 
    if(including_self) {
        return(sdfs.slice(0,index+1)) 
    } else {
        return(sdfs.slice(1,index+1)) 
    } 
}

function _lst_lyr_deses(nd) {
    let deses = nd.$deses(false)
    let des_depths = deses.map(r=>r.$depth())
    let max = Math.max(...des_depths)
    deses = deses.filter(r=>(r.$depth()===max))
    return(deses) 
}

function _which_lyr_deses(index,nd) {
    let depth = nd.$depth()
    let deses = nd.$deses(false)
    let des_depths = deses.map(r=>r.$depth())
    deses = deses.filter(r=>(r.$depth()===(depth+index)))
    return(deses)
}

function _some_lyrs_deses(nd,...rel_depths) {
    let depth = nd.$depth()
    let abs_depths = rel_depths.map(r=>r+depth)
    let deses = nd.$deses(false)
    let des_depths = deses.map(r=>r.$depth())
    deses = deses.filter(r=>(abs_depths.includes(r.$depth())))
    return(deses)
}


/*add node */

function _prepend_child(nd,child) {
    if(_is_connectable(child)) {} else { console.log('only root or uninited could be prepend');return(child)} 
    //只有根节点才可以被链接到另一颗树上
    let cond = nd.$is_leaf()
    child._tree = nd._tree
    child._lsib = null
    if(cond){
        //child 也是lstch
        child._rsib = null
        child._parent = nd
        //不改动fstch
    } else {
        //变更old_fstch
        let old_fstch = nd._fstch
        //old_fstch 不再是fstch
        old_fstch._lsib = undefined
        //更新child
        child._rsib = old_fstch
        //child 不是lstch _parent 置为 未计算
        child._parent = undefined
        //不改动fstch
    }   
    nd._fstch = child
    return(child)
}   


function _append_child(nd,child) {
    if(_is_connectable(child)) {} else { console.log('only root or uninited could be prepend');return(child)}
    let cond = nd.$is_leaf() 
    child._tree = nd._tree
    child._rsib = null
    if(cond){
        //child 也是lstch
        nd._fstch = child
        child._lsib = null
        //不改动child fstch 维持子树
    } else {
        //变更old_lstch
        let old_lstch = nd.$lstch() 
        //old_lstch 不再是lstch
        old_lstch._parent = undefined
        old_lstch._rsib = child
        //child 不是fstch _lsib置为 undefined
        child._lsib = undefined
    }
    child._parent = nd
    return(child)
}



function _add_rsib(nd,rsib) {
    if(_is_connectable(rsib)) {} else { console.log('only root or uninited could be add');return(rsib)}
    //root 不可操作
    if(nd.$is_root()) {
        console.log("cant addrsib to root")
        return(nd)
    }
    //
    let cond = nd.$is_lstch()
    rsib._tree = nd._tree
    if(cond) {
        rsib._parent = nd._parent
        nd._parent = undefined
        rsib._rsib = null
    } else {
        rsib._rsib = nd._rsib
        rsib._parent = undefined
    }
    nd._rsib = rsib
    //rsib 一定不是fstch
    rsib._lsib = undefined
    //
    return(rsib)
}


function _add_lsib(nd,lsib) {
    if(_is_connectable(lsib)) {} else { console.log('only root or uninited could be add');return(lsib)}
    //root 不可操作
    if(nd.$is_root()) {
        console.log("cant addlsib to root")
        return(nd)
    }
    //
    let cond = nd.$is_fstch()
    lsib._tree = nd._tree
    if(cond) {
        let parent = nd.$parent() 
        nd._lsib = undefined
        lsib._lsib = null
        parent._fstch = lsib
    } else {
        let old_lsib = nd.$lsib()
        old_lsib._rsib = lsib
        //
        lsib._lsib = undefined
    }
    lsib._rsib = nd
    //lsib 一定不是lstch
    lsib._parent = undefined
    //
    return(lsib)
}


function _insert_child(which,nd,child) {
    let children = _children(nd)
    let lngth = children.length
    if(lngth ===0) {
        child = _prepend_child(nd,child)
    } else {
        let cond = (which<=lngth) && (which >=0)
        if(!cond) {
            console.log("not in range!!")
        } else {
            if(which === 0) {
                child = _prepend_child(nd,child)
            } else if(which === lngth) {
                child = _append_child(nd,child)
            } else {
                let lnd = children[which-1]
                child = _add_rsib(lnd,child)
            }   
        }   
    }
    return(child)   
}   


/*sdfs*/

function _rsib_of_fst_ance_having_rsib(nd) {
    let p = nd.$parent()
    while(p!==null) {
        let rsib = p.$rsib()
        if(rsib !== null) {
            return(rsib)
        } else {
            p = p.$parent()  
        }
    }
    return(null)
}

function _sdfs_next(nd) {
    let fstch = nd.$fstch()
    if(fstch !== null) {
        return(fstch)
    } else {
        let rsib = nd.$rsib()
        if(rsib !== null) {
            return(rsib)
        } else {
            return(nd.$rsib_of_fst_ance_having_rsib())
        }
    }    
}

function _drmost_des(nd) {
    let old_lstch = nd
    let lstch = nd.$lstch()
    while(lstch !== null) {
        old_lstch = lstch
        lstch = lstch.$lstch()
    }
    return(old_lstch)
}

function _sdfs_prev(nd) {
    if(nd.$is_root()) {
        return(null)
    }
    let cond = nd.$is_leaf()
    if(cond) {
        let lsib = nd.$lsib()
        if(lsib !== null) {
            return(lsib)
        } else {
            let parent = nd.$parent()
            return(parent)
        }
    } else {
        let lsib = nd.$lsib()
        if(lsib !== null) {
            let cond = lsib.$is_leaf()
            if(cond) {
                return(lsib)
            } else {
                return(lsib.$drmost_des())
            }
        } else {
            let parent = nd.$parent()
            return(parent)
        }
    }
}

function _sdfs(nd) {
    let depth = nd.$depth()
    if(nd === null) {
        return([])
    } else {
        let sdfs =[nd]
        nd = nd.$sdfs_next()
        while(nd!==null && (nd.$depth() >depth) ) {
            sdfs.push(nd)
            nd = nd.$sdfs_next()
        }
        return(sdfs)  
    }  
}

/**/

function _dlmost_des(nd) {
    let old_fstch = nd
    let fstch = nd.$fstch()
    while(fstch !== null) {
        old_fstch = fstch
        fstch = fstch.$fstch()
    }
    return(old_fstch)
}

function _edfs_next(nd) {
    let rsib = nd.$rsib()
    if(rsib === null) {
        //如果没有右兄弟，说明节点是lstch,此时应该返回父节点
        let p = nd.$parent()
        return(p)
    } else {
       //如果有右兄弟，返回down-left-most-of-rsib
       return(rsib.$dlmost_des())
    }
}

function _lsib_of_fst_ance_having_lsib(nd) {
    /*
        along the parent chain until root,not_including_self
        if the parent have lsib,return the lsib-of-parent
        ---------
    */
    let parent = nd.$parent() 
    while(parent!==null) {
        let lsib = parent.$lsib()
        if(lsib!==null) {
            return(lsib)
        } else {
            parent = parent.$parent()
        }
    }
    return(null)
}

function _edfs_prev(nd) {
    let cond = nd.$is_leaf() 
    if(!cond) {
        return(nd.$lstch())
    } else {
       let lsib = nd.$lsib()
       if(lsib === null) {
           return(nd.$lsib_of_fst_ance_having_lsib())
       } else {
           return(lsib)
       }
    }   
}



function _edfs(nd) {
    let edfs = []
    let nxt = nd.$dlmost_des()
    while(nxt !== null ) {
        edfs.push(nxt)
        if(nxt === nd) {
            break;
        } else {
            nxt = nxt.$edfs_next()
        }
    }
    return(edfs)

}


/**/

function _sedfs_next(nd) {
    let visited = nd.$visited
    let cond = nd.$is_leaf() 
    if(cond) {
        if(visited) {
            let rsib = nd.$rsib()
            if(rsib === null) {
                return(nd.$parent())
            } else {
                return(rsib)
            }
        } else {
            nd.$visited = true
            return(nd)
        }
    } else {
        if(visited) {
            let rsib = nd.$rsib()
            if(rsib === null) {
                return(nd.$parent())
            } else {
                return(rsib)
            }
        } else {
            nd.$visited = true
            return(nd.$fstch())
        }
    }   
}

function _sedfs_prev(visited,nd) {
    let cond = nd.$is_leaf() 
    if(cond) {
        if(visited) {
            return(nd)
        } else {
            let lsib = nd.$lsib()
            if(lsib === null) {
                return(nd.$parent())
            } else {
                return(lsib)
            }
        }
    } else {
        if(visited) {
            return(nd.$lstch())
        } else {
            let lsib = nd.$lsib()
            if(lsib === null) {
                return(nd.$parent())
            } else {
                return(lsib)
            }
        }
    }
}

function _clear_visited(nd) {
    let sdfs = nd.$sdfs()
    sdfs.forEach(
        nd=>{delete nd.$visited}
    )
}

function _is_sedfs_traverse_finished(startnd,nd) {
    let cond = (nd.$visited) && (startnd === nd)
    return(cond)
}

function _sedfs(nd) {
    _clear_visited(nd);
    let sedfs = []
    let st = new Set()
    let startnd = nd
    while(!_is_sedfs_traverse_finished(startnd,nd)) {
        if(st.has(nd)) {
            nd.$close_at = sedfs.length
        } else {
            nd.$open_at = sedfs.length
            st.add(nd) 
        }
        sedfs.push(nd)
        nd = _sedfs_next(nd)
    }
    startnd.$close_at = sedfs.length
    sedfs.push(startnd)
    sedfs.forEach(nd=>{delete nd.$visited})     
    return(sedfs)    
}


/**/
function _leafize(nd) {
    nd._fstch = null
    return(nd)
}

function _rootize(nd) {
    nd._lsib = null
    nd._rsib = null
    nd._parent = null
    return(nd)
}

function _update_disconnected_nodes(nd) {
    let nsdfs = nd.$sdfs() 
    nsdfs.forEach(
       nd=> {
           nd._tree = nsdfs[0]
       }
    )
    return(nsdfs)
}



function _disconn(nd) {
    let cond = nd.$is_root() 
    if(cond) {
        //do nothing
        return(nd)
    } else if(nd.$is_lonely()) {
        //
        let parent = nd.$parent() 
        _leafize(parent); 
        let nsdfs = _update_disconnected_nodes(nd);
        _rootize(nd);
        return(nd)
    } else {
        if(nd.$is_fstch()) {
            //节点变味新树的根节点
            let rsib = nd.$rsib()
            //右兄弟变成了fstch, lsib 指向null
            rsib._lsib = null
            //右兄弟变成了fstch,parent要指向rsib
            // parent 的fstch 要指向rsib
            let parent = nd.$parent() 
            parent._fstch = nd._rsib
            //后代节点关系不变，但是tree变为当前节点._id
            let nsdfs = _update_disconnected_nodes(nd)
            //nd 变为分离出去的tree的root
            _rootize(nd);
            return(nd)
        } else if(nd.$is_lstch()) {    
            //节点变味新树的根节点
            let lsib = nd.$lsib() 
            lsib._rsib = nd._rsib
            //左兄弟变成了lstch,左邻居要指向parent
            lsib._parent = nd._parent
            //后代节点关系不变，但是tree变为当前节点._id
            let nsdfs = _update_disconnected_nodes(nd)
            //nd 变为分离出去的tree的root
            _rootize(nd);
            return(nd)
        } else {
            //节点变味新树的根节点
            let lsib = nd.$lsib() 
            lsib._rsib = nd._rsib
            //后代节点关系不变，但是tree变为当前节点._id
            let nsdfs = _update_disconnected_nodes(nd)
            //nd 变为分离出去的tree的root
            _rootize(nd);
            return(nd)
        }
    }  
}



/**/
function _add_extra(d,nd) {
    for(let k in d) {
        nd[k] = d[k]
    }
}
/**/

function _nd2unhandled_ele(nd) {
    let ele = {}
    ele._nd = nd
    ele._children = []
    return(ele)
}


function _sdfs2mat(sdfs) {
    let m = []
    let nd = sdfs[0]
    let unhandled = [_nd2unhandled_ele(nd)]
    unhandled[0]._pbreadth = null
    while(unhandled.length>0){
        let next_unhandled = []
        for(let i=0;i<unhandled.length;i++) {
            unhandled[i]._breadth = i
            unhandled[i]._depth = m.length
            let children = unhandled[i]._nd.$children() 
            children = children.map(nd=>_nd2unhandled_ele(nd))
            children.forEach(
                (r,index)=>{
                    r._pbreadth = unhandled[i]._breadth
                    unhandled[i]._children.push([(m.length+1),next_unhandled.length+index])
                }
            )
            next_unhandled = next_unhandled.concat(children)
        }
        let lyr = unhandled
        m.push(lyr)
        unhandled = next_unhandled
    }  
    return(m)
}


/**/

class _Node extends EventTarget {
    constructor() {
        super();
        this._fstch = null
        this._lsib = undefined
        this._rsib = undefined
        this._parent = undefined
        this._tree = undefined
        this.$guid = cmmn.gen_guid()
    }
    $is_inited() {
        return(_is_inited(this))
    }
    $is_root() {
        return(_is_root(this))
    }
    $is_fstch() {
        return(_is_fstch(this))
    }
    $is_lstch() {
        return(_is_lstch(this))
    }   
    $is_leaf() {
        return(_is_leaf(this))
    }
    $is_lonely() {
        return(_is_lonely(this))
    }
    //child
    $fstch() {
        return(this._fstch)
    }
    $lstch() {
        return(_lstch(this))
    }
    $which_child(index) {
        return(_which_child(index,this))
    }
    $some_children(...indexes) {
        return(_some_children(this,...indexes))
    }
    $children() {
        return(_children(this))
    }
    $children_count() {
        return(_children_count(this))
    }
    //
    $rsib() {
        return(this._rsib)
    }
    $lsib() {
        return(_lsib(this))
    }
    $fstsib(including_self=false) {
        return(_fstsib(this,including_self))
    } 
    $lstsib(including_self=false) {
        return(_lstsib(this,including_self))
    }
    $psibs() {
        return(_psibs(this))
    }
    $fsibs() {
        return(_fsibs(this))
    }
    $which_sib(index) {
        return(_which_sib(index,this))
    }
    $some_sibs(...indexes) {
        return(_some_sibs(this,...indexes))
    }
    $sibseq() {
        return(_sibseq(this))
    }
    $sibs(including_self=false) {
        return(_sibs(this,including_self))
    }
    $sibs_count(including_self=false) {
        return(_sibs_count(this,including_self))
    } 
    //
    $parent() {
        return(_parent(this))
    } 
    $root() {
        return(_root(this))
    } 
    $ances(including_self=false) {
        return(_ances(this,including_self))
    }
    $which_ance(index) {
        return(_which_ance(index,this))
    }
    $some_ances(...indexes) {
        return(_some_ances(this,...indexes))
    }
    $ances_count(including_self=false) {
        return(_ances_count(this,including_self))
    }
    //
    $prepend_child(child) {
        child = (child===undefined)?(new _Node()):child
        return(_prepend_child(this,child))       
    }
    $insert_child(which,child) {
        child = (child===undefined)?(new _Node()):child
        return(_insert_child(which,this,child))
    }
    $append_child(child)  {
        child = (child===undefined)?(new _Node()):child
        return(_append_child(this,child))
    }
    $clone() {
        if(_is_root(this)) {
            let ndict = _dump(this)
            return(_load(ndict))
        } else {
            let index = _sibseq(this)
            let parent = _parent(this)
            _disconn(this)
            let ndict = _dump(this)
            let dup = _load(ndict)
            _insert_child(index,parent,this)
            return(dup)   
        } 
    }
    $append_children(n,child) {
        let children = []
        for(let i=0;i<n;i++) {
            let ch = (child===undefined)?(new _Node()):child.$clone()
            ch = _append_child(this,ch)
            children.push(ch)
        }
        return(children)
    }
    //
    $add_rsib(rsib) {
        rsib = (rsib===undefined)?(new _Node()):rsib
        return(_add_rsib(this,rsib))
    }
    $add_lsib(lsib)  {
        lsib = (lsib===undefined)?(new _Node()):lsib
        return(_add_lsib(this,lsib))
    }  
    //
    $rsib_of_fst_ance_having_rsib() {
        return(_rsib_of_fst_ance_having_rsib(this))
    } 
    $sdfs_next() {
        return(_sdfs_next(this)) 
    }
    $drmost_des() {
        return(_drmost_des(this))
    }
    $sdfs_prev() {
        return(_sdfs_prev(this))
    }
    $sdfs() {
        return(_sdfs(this))
    }
    //
    $dlmost_des() {
        return(_dlmost_des(this))
    }
    $edfs_next() {
        return(_edfs_next(this))
    }
    $lsib_of_fst_ance_having_lsib() {
        return(_lsib_of_fst_ance_having_lsib(this))
    }
    $edfs_prev() {
        return(_edfs_prev(this))
    }
    $edfs() {
        return(_edfs(this))
    }
    $offset() {
        return(_offset(this))
    }
    //
    $sedfs_next() {
        return(_sedfs_next(this))
    }
    $sedfs_prev(visited) {
        return(_sedfs_prev(this))
    }
    $sedfs(){
        return(_sedfs(this))
    }
    //
    $deses(including_self=false) {
        return(_deses(this,including_self))
    }
    $lst_lyr_deses() {
        return(_lst_lyr_deses(this))
    }
    $which_lyr_deses(index) {
        return(_which_lyr_deses(index,this))
    }
    $some_lyrs_deses(...rel_depths) {
        return(_some_lyrs_deses(this,...rel_depths))
    }
    //
    $count(including_self=true) {
        return(_deses(this,including_self).length)
    }
    $depth(including_self=false) {
        return(_ances(this,including_self).length)
    }
    $height() {
        let depth = this.$depth()
        let sdfs = this.$sdfs()
        let des_depths = sdfs.map(nd=>nd.$depth())
        let max = Math.max(...des_depths)
        return(max-depth+1)        
    }
    $breadth() {
        return(_breadth(this))
    }
    $width() {
        return(_width(this))
    }
    //
    $lyr() {
        return(_lyr(this))
    }
    //
    $lcin() {
        return(_lcin(this))
    }
    $rcin() {
        return(_rcin(this))
    }
    $luncle() {
        return(_luncle(this))
    }
    $runcle() {
        return(_runcle(this))
    }
    //
    $sdfs_repr() {
        let rt = this.$root()
        let tree = _sdfs(rt)
        let sdfs = _sdfs(this)
        let depths = sdfs.map(nd=>nd.$depth()) 
        let indents = depths.map(depth=>'    '.repeat(depth))
        indents.forEach((indent,i)=>{console.log(indent+'['+tree.indexOf(sdfs[i])+']'+' : '+sdfs[i].$guid)})    
    }
    $sedfs_repr() {
        let rt = this.$root()
        _set_id(rt)       
        let sedfs = _sedfs(this)
        sedfs.forEach(
            (nd,i)=> {
                let depth = nd.$depth()
                let indent = '    '.repeat(depth)
                if(i === nd.$open_at)  {
                    console.log(indent+'<'+nd._id+' : ' + nd.$guid +'>')
                }
                if(i === nd.$close_at)  {
                    console.log(indent+'</'+nd._id+' : ' +nd.$guid +'>')
                }                               
            }
        )
    }
    //
    $disconn() {
        return(_disconn(this))
    }
    $rm_fstch() {
        let fstch = this._fstch
        return(_disconn(fstch))
    }
    $rm_lstch() {
        let lstch = _lstch(this)
        return(_disconn(lstch))
    }
    $rm_which(index) {
        let child = _which_child(index,this) 
        return(_disconn(child))
    }
    $rm_some_children(...indexes) {
        let children = _some_children(this,...indexes)
        return(children.map(child=>_disconn(child)))
    }
    $rm_all_children() {
        let children = _children(this)
        return(children.map(child=>_disconn(child)))
    }
    //
    $dump() {
        if(this.$is_root()) {
            return(_dump(this))
        } else {
            console.log('only root !!!')
        }
    }
    $dump2file(fn) {
        if(this.$is_root()) {
            let ndict = _dump(this)
            ndutil.wjson(fn,ndict)
        } else {
            console.log('only root !!!')
        }
    }
    //
    $sdfs2mat() {
        return(_sdfs2mat(_sdfs(this)))
    }          
}


/**/

function _set_id(nd) {
    //root代表一棵树, 给每个节点加sdfs_seq
    let tree = _sdfs(nd)
    tree.forEach(
        (nd,i) => {nd._id = i}
    )
    return(tree)
}


function _rtjson2rt(root) {
    let rt = new Tree()
    rt._id = root._id
    rt.$guid = root._guid
    return(rt)       
}

function _get_ancend_via_id(id,nd) {
    while(nd._id !== id) {
        nd=nd._parent
    }
    return(nd)
}

function fill_other_attrs_for_load(nd,d) {
    let other_ks = get_non_struct_keys(d)
    for(let k of other_ks) {
        nd[k] = d[k]
    }
    return(nd)
}



function _load(ndict) {
    //从一个json结构变成tree,返回root
    let k = cmmn.dict_keys(ndict)[0]
    let root = ndfunc.get_root(ndict[k],ndict)
    let rt = _rtjson2rt(root)
    rt = fill_other_attrs_for_load(rt,root)
    let prnd = rt
    let prnj = root
    let nj = ndfunc.get_sdfs_next(prnj,ndict)
    let nd;
    while(nj!==null) {
        if(prnj._fstch ===nj._id) {
            nd = prnd.$prepend_child()
            nd._id = nj._id
            nd.$guid = nj._guid
            nd = fill_other_attrs_for_load(nd,nj)
            prnd = nd
            prnj = nj
            nj = ndfunc.get_sdfs_next(prnj,ndict)
        } else if(prnj._rsib ===nj._id) {
            nd = prnd.$add_rsib()
            nd._id = nj._id
            nd.$guid = nj._guid
            nd = fill_other_attrs_for_load(nd,nj)
            prnd = nd
            prnj = nj
            nj = ndfunc.get_sdfs_next(prnj,ndict)
        } else if(nj._parent!==null && nj._parent!==undefined) {
            //lstch,并且上一個節點是drmost-of-lsib
            let pid = nj._parent
            prnd = _get_ancend_via_id(pid,prnd)
            nd = prnd.$append_child()
            nd._id = nj._id
            nd.$guid = nj._guid
            nd = fill_other_attrs_for_load(nd,nj)
            prnd = nd
            prnj = nj
            nj = ndfunc.get_sdfs_next(prnj,ndict)
        } else if(nj._parent===undefined){
            //非lstch,并且上一個節點是drmost-of-lsib
            let pnj = ndfunc.get_parent(nj,ndict)
            let pid = pnj._id
            prnd = _get_ancend_via_id(pid,prnd)
            nd = prnd.$append_child()
            nd._id = nj._id
            nd.$guid = nj._guid
            nd = fill_other_attrs_for_load(nd,nj)
            prnd = nd
            prnj = nj
            nj = ndfunc.get_sdfs_next(prnj,ndict)
        } else {
            console.log('Impossible',prnd,prnj,nj)
        } 
    }
    return(rt)
}

function _dictize_nd_property(nd,k) {
    if(nd[k] === null) {
        return(null)
    } else if(nd[k] === undefined) {
        return(undefined) 
    } else {
        return(nd[k]._id)
    }
}

function get_non_struct_keys(nd) {
    let all_ks = cmmn.dict_keys(nd)
    let other_ks = all_ks.filter(
        r=>!(STRUCT_KEYS.includes(r))
    )
    return(other_ks)
}

function fill_other_attrs_for_dump(nd,d) {
    let other_ks = get_non_struct_keys(nd)
    for(let k of other_ks) {
        d[k] = nd[k]
    }
    return(d)
}

function _dump(rt) {
    //把一个nd结构变成json结构, 这个nd 相当于脱离了tree的一个deepcopy
    let sdfs = _set_id(rt)
    //let sdfs = rt.$sdfs()
    let treeid = rt._id
    let nodes_dict = {}
    sdfs.forEach(
        (nd,i) => {
            let d = {}
            d._tree = treeid
            d._fstch = _dictize_nd_property(nd,'_fstch') 
            d._lsib = _dictize_nd_property(nd,'_lsib')
            d._rsib = _dictize_nd_property(nd,'_rsib') 
            d._parent = _dictize_nd_property(nd,'_parent') 
            d._id = nd._id
            d._guid = nd.$guid
            //
            d = fill_other_attrs_for_dump(nd,d)
            //
            nodes_dict[nd._id] = d
        }
    )
    return(nodes_dict)
}


class Tree extends _Node {
    constructor() {
        super();
        //初始化为根节点,根节点代表一棵树
        this._fstch = null
        this._lsib = null
        this._rsib = null
        this._parent = null
        this._tree = this
    }
    $is_parent_of(nd) {
        let p = nd.$parent()
        return(p===this)
    }
    $is_root_of(nd) {
        let rt = nd.$root()
        return(rt === this)
    }
    $is_descendant_of(nd) {
        let deses = nd.$deses(false)
        let index = deses.indexOf(this)
        return(index >=0)
    }
    $is_inclusive_descendant_of(nd) {
        let deses = nd.$deses(true)
        let index = deses.indexOf(this)
        return(index >=0)
    }
    $is_ancestor_of(nd) {
        let ances = nd.$ances(false)
        let index = ances.indexOf(this)
        return(index >=0)         
    }
    $is_inclusive_ancestor_of(nd) {
        let ances = nd.$ances(true)
        let index = ances.indexOf(this)
        return(index >=0) 
    }
    $is_sibling_of(nd) {
        let sibs = nd.$sibs(false)
        let index = sibs.indexOf(this)
        return(index >=0)
    }
    $is_inclusive_siblings_of(nd) {
        let sibs = nd.$sibs(true)
        let index = sibs.indexOf(this)
        return(index >=0)
    }
    $is_preceding_of(nd) {
        let sdfs = nd.$sdfs()
        let ndindex = sdfs.indexOf(nd)
        let this_index = sdfs.indexof(this)
        return(this_index>=0 && this_index < ndindex)
    }
    $is_following_of(nd) {
        let sdfs = nd.$sdfs()
        let ndindex = sdfs.indexOf(nd)
        let this_index = sdfs.indexof(this)
        return(this_index > ndindex)
    }
    $is_first_child_of(nd) {
        return(this === nd.$fstch())
    }
    $is_child_of(nd) {
        let children = nd.$children()
        let index = children.indexOf(this)
        return(index>=0)
    }
    $is_last_child_of(nd) {
        return(this === nd.$lstch())
    }
    $is_previous_sibling_of(nd) {
        return(this === nd.$lsib())
    }
    $is_next_sibling_of(nd) {
        return(this === nd.$rsib())
    }
    $index() {
        return(this.$sibseq())    
    } 
    $sdfs_index() {
        let sdfs = this.$sdfs()
        return(sdfs.indexOf(this))
    }
}

function load(from) {
    if(typeof(from) === 'string') {
        let ndict = ndutil.rjson(from)
        return(_load(ndict))
    } else if(typeof(from) === 'object') {
        let ndict = from
        return(_load(ndict))
    } else {
        return(new Tree())
    }
}

function clone(nd) {
    let ndcit = nd.$dump()
    return(load(ndict))
}

function _ele_struct_eq(ele0,ele1) {
    return(
        ele0._pbreadth === ele1._pbreadth &&
        ele0._breadth === ele1._breadth &&
        ele0._depth === ele1._depth
    )
}

function struct_eq(tree0,tree1) {
    let m0 = tree0.$sdfs2mat()
    let m1 = tree1.$sdfs2mat()
    let flat0 = Array.prototype.concat(...m0)
    let flat1 = Array.prototype.concat(...m1)
    if(flat0.length !== flat1.length) {
        return(false)
    } else {
        for(let i=0;i<flat0.length;i++) {
            if(_ele_struct_eq(flat0[i],flat1[i])) { } else {return(false)}
        }
    }
    return(true)
}

module.exports = {
    Node:_Node,
    Tree:Tree,
    Root:Tree,
    load:load,
    clone:clone,
    struct_eq:struct_eq,
}
