var ndfunc = require("./ndfunc.js")
var term = require("./ndterm.js")

var sh = term.sdfs_show_root_tree
// nodes 是tree 里记录所有节点的结构
// 使用nodes结构是为了能导出成json
nodes = {}
nd0 = ndfunc.creat_root()
nodes[nd0._id] = nd0

/*
> sh(nodes)
0
undefined
>
*/


nd1 = ndfunc.creat_nd(nodes)
ndfunc.prepend_child(nd0,nd1,nodes)
/*
> sh(nodes)
0
└── 1
undefined
> 
*/

nd2 = ndfunc.creat_nd(nodes)
ndfunc.prepend_child(nd1,nd2,nodes)
/*
> sh(nodes)
0
└── 1
    └── 2
undefined
> 
*/

nd3 = ndfunc.creat_nd(nodes)
ndfunc.add_rsib(nd2,nd3,nodes)
/*
> sh(nodes)
0
└── 1
    ├── 2
    └── 3
undefined
> 
*/

nd4 = ndfunc.creat_nd(nodes)
ndfunc.prepend_child(nd3,nd4,nodes)
/*
> sh(nodes)
0
└── 1
    ├── 2
    └── 3
        └── 4
undefined
> 
*/

nd5 = ndfunc.creat_nd(nodes)
ndfunc.add_rsib(nd4,nd5,nodes)

/*
> sh(nodes)
0
└── 1
    ├── 2
    └── 3
        ├── 4
        └── 5
undefined
> 
*/

nd6 = ndfunc.creat_nd(nodes)
ndfunc.add_rsib(nd1,nd6,nodes)

nd7 = ndfunc.creat_nd(nodes)
ndfunc.prepend_child(nd6,nd7,nodes)

nd8 = ndfunc.creat_nd(nodes)
ndfunc.add_rsib(nd7,nd8,nodes)


nd9 = ndfunc.creat_nd(nodes)
ndfunc.add_rsib(nd8,nd9,nodes)


nd10 = ndfunc.creat_nd(nodes)
ndfunc.append_child(nd9,nd10,nodes)

nd11 = ndfunc.creat_nd(nodes)
ndfunc.append_child(nd9,nd11,nodes)
/*
> sh(nodes)
0
├── 1
│   ├── 2
│   └── 3
│       ├── 4
│       └── 5
└── 6
    ├── 7
    ├── 8
    └── 9
        ├── 10
        └── 11
undefined
> 
*/

nd12 = ndfunc.creat_nd(nodes)
ndfunc.append_child(nd9,nd12,nodes)

nd1013 = ndfunc.creat_nd(nodes,1000)
ndfunc.add_lsib(nd12,nd1013,nodes)

nd1014 = ndfunc.creat_nd(nodes)
ndfunc.add_lsib(nd10,nd1014,nodes)

nd1015 = ndfunc.creat_nd(nodes)
ndfunc.insert_child(1,nd9,nd1015,nodes)
/*
> sh(nodes)
0
├── 1
│   ├── 2
│   └── 3
│       ├── 4
│       └── 5
└── 6
    ├── 7
    ├── 8
    └── 9
        ├── 1014
        ├── 1015
        ├── 10
        ├── 11
        ├── 1013
        └── 12
undefined
> 
*/


//child
fstch = ndfunc.get_fstch(nd6,nodes)
children = ndfunc.get_children(nd6,nodes)
lstch = ndfunc.get_lstch(nd6,nodes)
some = ndfunc.get_some_children(nd9,nodes,0,2,4)
root = ndfunc.get_root(nd6,nodes)
child = ndfunc.get_which_child(1,root,nodes)
//sib
lstsib = ndfunc.get_lstsib(nd6,nodes,including_self=true)
psibs = ndfunc.get_preceding_sibs(nd10,nodes)
fsibs = ndfunc.get_following_sibs(nd10,nodes)
sibs = ndfunc.get_sibs(nd10,nodes)
fstsib = ndfunc.get_fstsib(nd1,nodes,including_self=true)
sib = ndfunc.get_which_sib(1,nd10,nodes)
somesibs = ndfunc.get_some_sibs(nd10,nodes,1,3)
sibseq = ndfunc.get_sibseq(nd10,nodes)
lsib = ndfunc.get_lsib(nd10,nodes)
rsib = ndfunc.get_rsib(nd10,nodes)

//ance from parent to root
r = ndfunc.get_root(nd6,nodes)
p = ndfunc.get_parent(nd6,nodes)
ances = ndfunc.get_ances(nd10,nodes)
ance = ndfunc.get_which_ance(1,nd10,nodes)
ances = ndfunc.get_some_ances(nd10,nodes,1,3)


//layer breadth count depth height 
depth = ndfunc.get_depth(nd6,nodes)
depth = ndfunc.get_depth(nd10,nodes)
depth = ndfunc.get_depth(nd0,nodes)

height = ndfunc.get_height(nd6,nodes)
height = ndfunc.get_height(nd0,nodes)
height = ndfunc.get_height(nd7,nodes)

count = ndfunc.get_count(nd6,nodes)


lyr = ndfunc.get_lyr(nd6,nodes)
lyr = ndfunc.get_lyr(nd9,nodes)
lyr = ndfunc.get_lyr(nd10,nodes)


breadth = ndfunc.get_breadth(nd6,nodes)
breadth = ndfunc.get_breadth(nd9,nodes)
breadth = ndfunc.get_breadth(nd10,nodes)


//sdfs

rsib_of_ance = ndfunc.get_rsib_of_fst_ance_having_rsib(nd1,nodes) 
/*
>
null
>
*/


ndfunc.get_sdfs_next(nd0,nodes) //nd1  having-child first-child
ndfunc.get_sdfs_next(nd2,nodes) //nd3  having-rsib rsib
ndfunc.get_sdfs_next(nd5,nodes) 
//nd6  no-child no-rsib, rsib-of-[fst-ance-with-rsib]


ndfunc.get_drmost_des(nd0,nodes)  //nd12
ndfunc.get_drmost_des(nd1,nodes) //nd5
ndfunc.get_drmost_des(nd5,nodes) //nd5

ndfunc.get_sdfs_prev(nd0,nodes)  //null
ndfunc.get_sdfs_prev(nd6,nodes)  //nd5
ndfunc.get_sdfs_prev(nd9,nodes)  //nd8
ndfunc.get_sdfs_prev(nd7,nodes)  //nd6

sdfs = ndfunc.get_sdfs(nd6,nodes)
sdfs = ndfunc.get_sdfs(nd0,nodes)
sdfs.map(r=>r._id)
/*
*/
//


//edfs
ndfunc.get_dlmost_des(nd0,nodes) //nd2
ndfunc.get_dlmost_des(nd6,nodes) //nd7
ndfunc.get_dlmost_des(nd7,nodes) //nd7

ndfunc.get_edfs_next(nd0,nodes) //null 
ndfunc.get_edfs_next(nd1,nodes) //nd7
ndfunc.get_edfs_next(nd4,nodes) //nd5

ndfunc.get_lsib_of_fst_ance_having_lsib(nd0,nodes)//null
ndfunc.get_lsib_of_fst_ance_having_lsib(nd1,nodes) //null
ndfunc.get_lsib_of_fst_ance_having_lsib(nd5,nodes) //nd2


ndfunc.get_edfs_prev(nd0,nodes) //nd6
ndfunc.get_edfs_prev(nd6,nodes) //nd9
edfs = ndfunc.get_edfs(nd0,nodes)
/*
> edfs.map(r=>r._id)
[
   2,    4,    5,    3,  1,
   7,    8, 1014, 1015, 10,
  11, 1013,   12,    9,  6,
   0
]
> 

*/



sedfs = get_sedfs(sdfs[0],nodes)
/*

> sedfs.map(nd=>nd._id)
[
   0,  1,  2,    2,    3,    4,    4,
   5,  5,  3,    1,    6,    7,    7,
   8,  8,  9, 1014, 1014, 1015, 1015,
  10, 10, 11,   11, 1013, 1013,   12,
  12,  9,  6,    0
]
> 

*/

