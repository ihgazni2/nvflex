
var ndcls = require('./ndcls')
var rt = new ndcls.Node()

function fill_rt(rt) {
    rt.$append_child()
    rt.$append_child()
    rt.$append_child()
    rt.$prepend_child()
    rt.$prepend_child()
    rt.$prepend_child()
    var nd = rt.$which_child(2)
    nd.$add_lsib()
    nd.$add_rsib()
    rt.$insert_child(3) 
    nd.$append_child()
    nd.$append_child()
    nd = rt.$which_child(3)
    nd.$append_child()
    nd.$append_child() 
    return(nd.$fstch())    
}

rt.$append_child()
rt.$append_child()
rt.$append_child()
rt.$prepend_child()
rt.$prepend_child()
rt.$prepend_child()



assert.strictEqual(rt.$children_count(),6)
rt.$fstch().$guid
rt.$lstch().$guid
assert.strictEqual(rt.$which_child(2).$guid,rt.$fstch()._rsib._rsib.$guid)
rt.$children().map(nd=>nd.$guid)
rt.$some_children(0,2,4).map(nd=>nd.$guid)


assert.strictEqual(rt.$rsib(),null);
assert.strictEqual(rt.$lsib(),null);
rt.$fstsib()
rt.$lstsib()
rt.$psibs()
rt.$fsibs()
rt.$sibs()
rt.$which_sib(0).$guid === rt.$guid

var nd = rt.$which_child(2)
assert.strictEqual(nd.$fstsib(),rt.$fstch());
nd.$lstsib().$guid
nd.$which_sib(0).$guid
nd.$psibs().map(nd=>nd.$guid)
nd.$fsibs().map(nd=>nd.$guid)
nd.$sibs(including_self=true).map(nd=>nd.$guid)
nd.$which_sib(3).$guid
nd.$sibseq()
nd.$some_sibs(1,3).map(nd=>nd.$guid)
nd.$guid
nd.$add_lsib()
nd.$sibs(including_self=true).map(nd=>nd.$guid)
nd.$add_rsib()
nd.$sibs(including_self=true).map(nd=>nd.$guid)


rt.$insert_child(3)
nd.$sibs(including_self=true).map(nd=>nd.$guid);


assert.strictEqual(rt,nd.$parent());


nd.$append_child()
nd.$append_child()


nd = rt.$which_child(3)
nd.$append_child()
nd.$append_child()


nd = nd.$fstch()

var nd = fill_rt(rt)
nd.$root().$guid === rt.$guid
nd.$ances().map(nd=>nd.$guid)
nd.$parent().$guid === nd.$which_ance(1).$guid 
nd.$ances(including_self = true).map(nd=>nd.$guid)[0] = nd.$guid
nd.$ances_count() = 2
nd.$some_ances(0,1,2).map(nd=>nd.$guid)



