function tst_lyr() {
    var nodes = fill_rt(rt)   
    nodes[0].$count() === 16
    nodes[1].$count() === 5
    nodes[6].$count() === 10 
    nodes[0].$depth() === 0
    nodes[6].$depth() === 1
    nodes[10].$depth() === 3  
    nodes[0].$height() === 4
    nodes[1].$height() === 3
    nodes[3].$height() === 2
    nodes[2].$height() === 1 
    nodes[7].$breadth() === 2
    nodes[13].$breadth() === 5
    nodes[0].$width() === 11
    nodes[9].$width() === 6
    assert.deepStrictEqual(nodes[3].$children().map(nd=>nd.$guid).concat(nodes[9].$children().map(nd=>nd.$guid)),nodes[10].$lyr().map(nd=>nd.$guid)) 
    nodes[7].$lcin().$guid === nodes[3].$guid
    nodes[2].$runcle().$guid === nodes[6].$guid  
    nodes[7].$luncle().$guid === nodes[1].$guid  
}

