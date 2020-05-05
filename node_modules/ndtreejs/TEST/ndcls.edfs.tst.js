function tst_edfs() {
    var rt = new ndcls.Node()
    var nodes = fill_rt(rt)
    var arr = rt.$edfs().map(nd=>nd.$guid)
    arr[0] === nodes[2].$guid
    arr[1] === nodes[4].$guid
    arr[2] === nodes[5].$guid
    arr[3] === nodes[3].$guid
    arr[4] === nodes[1].$guid
    arr[5] === nodes[7].$guid
    arr[6] === nodes[8].$guid
    arr[7] === nodes[10].$guid
    arr[12] === nodes[15].$guid
    arr[13] === nodes[9].$guid
    arr[14] === nodes[6].$guid
    arr[15] === nodes[0].$guid
    
    var arr = nodes[1].$edfs().map(nd=>nd.$guid)
    arr[0] === nodes[2].$guid
    arr[1] === nodes[4].$guid
    arr[2] === nodes[5].$guid
    arr[3] === nodes[3].$guid
    arr[4] === nodes[1].$guid

    nodes[15].$edfs_prev().$guid === nodes[14].$guid
    nodes[14].$edfs_prev().$guid === nodes[13].$guid
    nodes[11].$edfs_prev().$guid === nodes[10].$guid
    nodes[10].$edfs_prev().$guid === nodes[8].$guid
    nodes[7].$edfs_prev().$guid === nodes[1].$guid
    nodes[1].$edfs_prev().$guid === nodes[3].$guid 
}

