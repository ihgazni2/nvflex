const ndcls = require('ndtreejs').ndcls
const {dcp} = require('./util.js')

function get_ledge(z) {
    return({sx:z.l,sy:z.t,ex:z.l,ey:z.b})
}

function get_redge(z) {
    return({sx:z.r,sy:z.t,ex:z.r,ey:z.b})
}

function get_tedge(z) {
    return({sx:z.l,sy:z.t,ex:z.r,ey:z.t})
}

function get_bedge(z) {
    return({sx:z.l,sy:z.b,ex:z.r,ey:z.b})
}

function edge_eq(e0,e1) {
    let cond0 = (e0.sx === e1.sx)
    let cond1 = (e0.sy === e1.sy)
    let cond2 = (e0.ex === e1.ex)
    let cond3 = (e0.ey === e1.ey)
    return(cond0 && cond1 && cond2 && cond3)
}

function is_ladj_of(z0,z1) {
    let redge = get_redge(z0)
    let ledge = get_ledge(z1)
    let rlngth = redge.ey - redge.sy + 1
    let llngth = ledge.ey - ledge.sy + 1
    let cond0 = (llngth === rlngth)
    let cond1 = ((redge.sx + 1) === ledge.sx)
    let cond2 = (z0.t === z1.t)
    return(cond0 && cond1 && cond2)
}

function is_radj_of(z0,z1) {
    return(is_ladj_of(z1,z0))
}

function is_tadj_of(z0,z1) {
    let bedge = get_bedge(z0)
    let tedge = get_tedge(z1)
    let blngth = bedge.ex - bedge.sx + 1
    let tlngth = tedge.ex - tedge.sx + 1
    let cond0 = (blngth === tlngth)
    let cond1 = ((bedge.ey + 1) === tedge.sy)
    let cond2 = (z0.l === z1.l)
    return(cond0 && cond1 && cond2)
}

function is_badj_of(z0,z1) {
    return(is_tadj_of(z1,z0))
}

function zones2znds(zones) {
    let znds = zones.map(zone=>{let nd = new ndcls.Tree();nd.zone = zone;return(nd)})
    return(znds)
}


function sort_znds_l2r(znds) {
    znds.sort(
        function(a,b) {
            return(a.zone.l-b.zone.l)
        }
    )
    return(znds)
}

function sort_znds_t2b(znds) {
    znds.sort(
        function(a,b) {
            return(a.zone.t-b.zone.t)
        }
    )
    return(znds)
}

function sort_znds_tl2br(znds) {
    znds.sort(
        function(a,b) {
            let cond = (a.zone.t-b.zone.t)
            if(cond === 0) {
                return(a.zone.l-b.zone.l)
            } else {
                return(cond)
            }
        }
    )
    return(znds)
}

function sort_znds_lt2rb(znds) {
    znds.sort(
        function(a,b) {
            let cond = (a.zone.l-b.zone.l)
            if(cond === 0) {
                return(a.zone.t-b.zone.t)
            } else {
                return(cond)
            }
        }
    )
    return(znds)
}


function lppend(znd0,znd1) {
    let z = {
        t:znd1.zone.t,
        l:znd1.zone.l,
        b:znd0.zone.b,
        r:znd0.zone.r,
        type:'col'
    }
    let pznd = new ndcls.Tree()
    pznd.zone = z
    pznd.$append_child(znd1)
    pznd.$append_child(znd0)
    return(pznd)
}

function rppend(znd0,znd1) {
    let z = {
        t:znd0.zone.t,
        l:znd0.zone.l,
        b:znd1.zone.b,
        r:znd1.zone.r,
        type:'col'
    }
    let pznd = new ndcls.Tree()
    pznd.zone = z
    pznd.$append_child(znd0)
    pznd.$append_child(znd1)
    return(pznd)
}


function tppend(znd0,znd1) {
    let z = {
        t:znd1.zone.t,
        l:znd1.zone.l,
        b:znd0.zone.b,
        r:znd0.zone.r,
        type:'row'
    }
    let pznd = new ndcls.Tree()
    pznd.zone = z
    pznd.$append_child(znd1)
    pznd.$append_child(znd0)
    return(pznd)
}

function bppend(znd0,znd1) {
    let z = {
        t:znd0.zone.t,
        l:znd0.zone.l,
        b:znd1.zone.b,
        r:znd1.zone.r,
        type:'row'
    }
    let pznd = new ndcls.Tree()
    pznd.zone = z
    pznd.$append_child(znd0)
    pznd.$append_child(znd1)
    return(pznd)
}

function iter_next_l2r(d) {
    unhandled = d.unhandled
    handled = d.handled
    let znd = unhandled[0]
    let next_unhandled = []
    for(let i=1;i<unhandled.length;i++){
        let other = unhandled[i]
        let cond = is_radj_of(other.zone,znd.zone)
        if(cond) {
            znd = rppend(znd,other)
        } else {
            next_unhandled.push(other)
        }
    }
    handled.push(znd)
    unhandled = next_unhandled
    return({handled:handled,unhandled:unhandled})
}


function iter_next_t2b(d) {
    unhandled = d.unhandled
    handled = d.handled
    let znd = unhandled[0]
    let next_unhandled = []
    for(let i=1;i<unhandled.length;i++){
        let other = unhandled[i]
        let cond = is_badj_of(other.zone,znd.zone)
        if(cond) {
            znd = bppend(znd,other)
        } else {
            next_unhandled.push(other)
        }
    }
    handled.push(znd)
    unhandled = next_unhandled
    return({handled:handled,unhandled:unhandled})
}

function agg_l2r(znds) {
    let unhandled = sort_znds_lt2rb(znds)
    let handled =[]
    d = {unhandled:unhandled,handled:handled}
    while(d.unhandled.length>0) {
        d = iter_next_l2r(d)
    }
    return(d.handled)
}

function agg_t2b(znds) {
    let unhandled = sort_znds_tl2br(znds)
    let handled =[]
    d = {unhandled:unhandled,handled:handled}
    while(d.unhandled.length>0) {
        d = iter_next_t2b(d)
    }
    return(d.handled)
}


function znds2tree(znds) {
    while(znds.length>1) {
        let l2r_agg = agg_l2r(znds.map(znd=>znd.$clone()))
        let t2b_agg = agg_t2b(znds.map(znd=>znd.$clone()))
        if(t2b_agg.length<l2r_agg.length) {
            znds = t2b_agg
        } else {
            znds = l2r_agg
        }
    }
    return(znds[0])
}


function show_znd_tree(tree) {
    let sdfs = tree.$sdfs()
    for(let i=0;i<sdfs.length;i++) {
        let z = sdfs[i]
        let depth = z.$depth()
        let indent = '    '.repeat(depth)+i+':'
        let tag = (z.zone.type === undefined)?z.zone.rune:z.zone.type
        console.log(indent+tag)
    }
}


module.exports = {
    get_ledge,
    get_redge,
    get_tedge,
    get_bedge,
    edge_eq,
    is_ladj_of,
    is_radj_of,
    is_tadj_of,
    is_badj_of,
    zones2znds,
    sort_znds_l2r,
    sort_znds_t2b,
    sort_znds_tl2br,
    sort_znds_lt2rb,
    lppend,
    rppend,
    tppend,
    bppend,
    iter_next_l2r,
    iter_next_t2b,
    agg_l2r,
    agg_t2b,
    znds2tree,
    show_znd_tree,
}
