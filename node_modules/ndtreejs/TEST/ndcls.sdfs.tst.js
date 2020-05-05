function tst_sdfs() {
    var nodes = fill_rt(rt)
    nodes[15].$sdfs().map(nd=>nd.$guid) === [nodes[15].$guid]
    nodes[9].$sdfs().map(nd=>nd.$guid)[0] === nodes[9].$guid 
    nodes[9].$sdfs().map(nd=>nd.$guid)[1] === nodes[10].$guid
    nodes[9].$sdfs().map(nd=>nd.$guid)[2] === nodes[11].$guid
    nodes[5].$sdfs_next().$guid === nodes[6].$guid
    nodes[6].$sdfs_next().$guid === nodes[7].$guid
    nodes[7].$sdfs_next().$guid === nodes[8].$guid
    nodes[0].$sdfs_prev()===null
    nodes[15].$sdfs_prev().$guid === nodes[14].$guid
    nodes[10].$sdfs_prev().$guid === nodes[9].$guid
    nodes[6].$sdfs_prev().$guid === nodes[5].$guid
}

