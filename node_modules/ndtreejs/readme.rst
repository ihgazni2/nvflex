tree
----
- node and tree

install
-------
- npm install ndtreejs

usage
-----

    ::
    
        const sh=require('ndtreejs').ndfuncterm.sdfs_show_root_tree 
        const ndcls = require('ndtreejs').ndcls
        const wjson = require('ndtreejs').ndutil.wjson         

        var tree = new ndcls.Root()
        var nd1 = tree.$append_child()
        var nd2 = nd1.$append_child()
        var nd3 = nd1.$append_child() 
        var nd4 = nd3.$append_child()
        var nd5 = nd4.$add_rsib() 
        var nd6 = nd1.$add_rsib()
        var nd7 = nd6.$prepend_child()
        var nd8 = nd6.$append_child()
        var nd9 = nd6.$append_child()
        nd9.$append_children(6)
        sh(tree.$dump())

		[0] : 3920430b-0146-46fc-a003-628b0cd93bf0
		├── [1] : 7f6f9004-c1c6-42ea-add6-96dc1b68ccc9
		│   ├── [2] : 7d79b9bd-a5c8-4ac0-b14f-522d10c445b6
		│   └── [3] : c36c5442-facd-4ee4-8e50-bc22fba5274b
		│       ├── [4] : 29c40839-dd60-463e-a921-302fe4805fb1
		│       └── [5] : ba13b031-8d91-45c7-bbed-f2271388c9e3
		└── [6] : 334ef822-cfed-4734-afc6-2220bbc83187
		    ├── [7] : 4723c3f9-ba82-4bf2-a546-bd1851acd4bb
		    ├── [8] : 2b0f0325-6d91-48e7-896d-d7c981d82b1a
		    └── [9] : 4eed11b9-fc73-4875-abdf-9f0cd74ba628
			├── [10] : b245ee0a-a12b-4704-b1ec-8cc5204b4cb0
			├── [11] : 2c64123f-60cb-407e-acda-793796742f7e
			├── [12] : 145d75c5-1693-4757-850b-34338fe24941
			├── [13] : 9d264f39-ab4a-46b1-9b1b-a326b03f370f
			├── [14] : 02059d58-e938-475d-a563-01d7674bc529
			└── [15] : f00889f5-0ee2-4fd1-b15b-0aadef6a4f58
        
        wjson('ndict.json',tree.$dump())               
        var ntree = ndcls.load('ndict.json') 
        

NODE METHODS
------------

- \$add_lsib
- \$add_rsib
- \$ances
- \$ances_count
- \$append_child
- \$append_children
- \$breadth
- \$children
- \$children_count
- \$clone
- \$count
- \$depth
- \$deses
- \$disconn
- \$dlmost_des
- \$drmost_des
- \$dump
- \$dump2file
- \$edfs
- \$edfs_next
- \$edfs_prev
- \$fsibs
- \$fstch
- \$fstsib
- \$height
- \$insert_child
- \$is_fstch
- \$is_inited
- \$is_leaf
- \$is_lonely
- \$is_lstch
- \$is_root
- \$lcin
- \$lsib
- \$lsib_of_fst_ance_having_lsib
- \$lst_lyr_deses
- \$lstch
- \$lstsib
- \$luncle
- \$lyr
- \$offset
- \$parent
- \$prepend_child
- \$psibs
- \$rcin
- \$rm_all_children
- \$rm_fstch
- \$rm_lstch
- \$rm_some_children
- \$rm_which
- \$root
- \$rsib
- \$rsib_of_fst_ance_having_rsib
- \$runcle
- \$sdfs
- \$sdfs2mat
- \$sdfs_next
- \$sdfs_prev
- \$sdfs_repr
- \$sedfs
- \$sedfs_next
- \$sedfs_prev
- \$sedfs_repr
- \$sibs
- \$sibs_count
- \$sibseq
- \$some_ances
- \$some_children
- \$some_lyrs_deses
- \$some_sibs
- \$which_ance
- \$which_child
- \$which_lyr_deses
- \$which_sib
- \$width


TREE EXTRA METHODS
==================

refer to  https://dom.spec.whatwg.org/#concept-tree
A tree is a finite hierarchical tree structure. In tree order is preorder, depth-first traversal of a tree.

- \$is_parent_of(nd)
    
    ::
        
        An object that participates in a tree has a parent, which is either null or an object, and has children, which is an ordered set of objects. An object A whose parent is object B is a child of B.


- \$is_root_of(nd) 
    
    ::
        
        The root of an object is itself, if its parent is null, or else it is the root of its parent. The root of a tree is any object participating in that tree whose parent is null.



- \$is_descendant_of(nd)
    
    ::
        
        An object A is called a descendant of an object B, if either A is a child of B or A is a child of an object C that is a descendant of B.        

- \$is_inclusive_descendant_of(nd)
    
    ::
        
        An inclusive descendant is an object or one of its descendants.        
        


- \$is_ancestor_of(nd)
    
    ::
        
        An object A is called an ancestor of an object B if and only if B is a descendant of A.


- \$is_inclusive_ancestor_of(nd)

    ::

        An inclusive ancestor is an object or one of its ancestors.



- \$is_sibling_of(nd)

    ::

        An object A is called a sibling of an object B, if and only if B and A share the same non-null parent.



- \$is_inclusive_siblings_of(nd)

    ::

        An inclusive sibling is an object or one of its siblings.


- \$is_preceding_of(nd)

    ::

        An object A is preceding an object B if A and B are in the same tree and A comes before B in tree order.



- \$is_following_of(nd)

    ::

        An object A is following an object B if A and B are in the same tree and A comes after B in tree order.


- \$is_fstch_of(nd)

    ::

        The first child of an object is its first child or null if it has no children.

- \$is_lstch_of(nd)

    ::

        The last child of an object is its last child or null if it has no children.


- \$is_previous_sibling_of(nd)

    ::

        The previous sibling of an object is its first preceding sibling or null if it has no preceding sibling.



- \$is_next_sibling_of(nd)

    ::

        The next sibling of an object is its first following sibling or null if it has no following sibling.

- \$index()

    ::

        The index of an object is its number of preceding siblings, or 0 if it has none.

APIS
====

    ::
        
		> require('ndtreejs')
		{
		  ndfunc: {
		    calc_next_id: [Function: calc_next_id],
		    update_nodes_ids: [Function: update_nodes_ids],
		    creat_root: [Function: creat_root],
		    creat_nd: [Function: creat_nd],
		    is_inited: [Function: is_inited],
		    is_root: [Function: is_root],
		    is_fstch: [Function: is_fstch],
		    is_lstch: [Function: is_lstch],
		    is_leaf: [Function: is_leaf],
		    is_lonely: [Function: is_lonely],
		    is_id: [Function: is_id],
		    prepend_child: [Function: prepend_child],
		    append_child: [Function: append_child],
		    insert_child: [Function: insert_child],
		    add_rsib: [Function: add_rsib],
		    add_lsib: [Function: add_lsib],
		    get_fstch: [Function: get_fstch],
		    get_rsib: [Function: get_rsib],
		    get_children: [Function: get_children],
		    get_lstch: [Function: get_lstch],
		    get_which_child: [Function: get_which_child],
		    get_some_children: [Function: get_some_children],
		    get_fstsib: [Function: get_fstsib],
		    get_lstsib: [Function: get_lstsib],
		    get_preceding_sibs: [Function: get_preceding_sibs],
		    get_following_sibs: [Function: get_following_sibs],
		    get_sibs: [Function: get_sibs],
		    get_which_sib: [Function: get_which_sib],
		    get_some_sibs: [Function: get_some_sibs],
		    get_sibseq: [Function: get_sibseq],
		    get_lsib: [Function: get_lsib],
		    get_lyr: [Function: get_lyr],
		    get_breadth: [Function: get_breadth],
		    get_count: [Function: get_count],
		    get_depth: [Function: get_depth],
		    get_height: [Function: get_height],
		    get_fst_lyr_des_depth: [Function: get_fst_lyr_des_depth],
		    get_lst_lyr_des_depth: [Function: get_lst_lyr_des_depth],
		    get_which_lyr_des_depth: [Function: get_which_lyr_des_depth],
		    get_root: [Function: get_root],
		    get_parent: [Function: get_parent],
		    get_ances: [Function: get_ances],
		    get_which_ance: [Function: get_which_ance],
		    get_some_ances: [Function: get_some_ances],
		    get_rsib_of_fst_ance_having_rsib: [Function: get_rsib_of_fst_ance_having_rsib],
		    get_sdfs_next: [Function: get_sdfs_next],
		    get_drmost_des: [Function: get_drmost_des],
		    get_sdfs_prev: [Function: get_sdfs_prev],
		    get_sdfs: [Function: get_sdfs],
		    get_lsib_of_fst_ance_having_lsib: [Function: get_lsib_of_fst_ance_having_lsib],
		    get_dlmost_des: [Function: get_dlmost_des],
		    get_edfs_next: [Function: get_edfs_next],
		    get_edfs_prev: [Function: get_edfs_prev],
		    get_edfs: [Function: get_edfs],
		    'clear_$visited': [Function: clear_$visited],
		    get_sedfs_next: [Function: get_sedfs_next],
		    is_sedfs_traverse_finished: [Function: is_sedfs_traverse_finished],
		    get_sedfs_prev: [Function: get_sedfs_prev],
		    get_sedfs: [Function: get_sedfs],
		    get_deses: [Function: get_deses],
		    get_fst_lyr_deses: [Function: get_fst_lyr_deses],
		    get_lst_lyr_deses: [Function: get_lst_lyr_deses],
		    get_which_lyr_deses: [Function: get_which_lyr_deses],
		    get_some_deses: [Function: get_some_deses],
		    nd2ele: [Function: nd2ele],
		    sdfs2mat: [Function: sdfs2mat],
		    sdfs2edfs: [Function: sdfs2edfs],
		    sdfs2sedfs: [Function: sdfs2sedfs],
		    edfs2mat: [Function: edfs2mat],
		    edfs2sdfs: [Function: edfs2sdfs],
		    edfs2sedfs: [Function: edfs2sedfs],
		    sedfs2mat: [Function: sedfs2mat],
		    sedfs2sdfs: [Function: sedfs2sdfs],
		    sedfs2edfs: [Function: sedfs2edfs],
		    update_disconnected_nodes: [Function: update_disconnected_nodes],
		    update_orig_nodes: [Function: update_orig_nodes],
		    leafize: [Function: leafize],
		    rootize: [Function: rootize],
		    disconnect: [Function: disconnect],
		    rm_fstch: [Function: rm_fstch],
		    rm_lstch: [Function: rm_lstch],
		    rm_which: [Function: rm_which],
		    rm_some: [Function: rm_some],
		    rm_all: [Function: rm_all],
		    update_treeid: [Function: update_treeid],
		    update_one_nodeid: [Function: update_one_nodeid],
		    prepend_child_tree: [Function: prepend_child_tree],
		    append_child_tree: [Function: append_child_tree],
		    add_rsib_tree: [Function: add_rsib_tree],
		    add_lsib_tree: [Function: add_lsib_tree],
		    insert_child_tree: [Function: insert_child_tree]
		  },
		  ndfuncterm: {
		    dflt_calc_conn_map_func: [Function: dflt_calc_conn_map_func],
		    conns2repr: [Function: conns2repr],
		    clear_ui: [Function: clear_ui],
		    dflt_sdfs_show_connd: { t: '├── ', v: '│   ', l: '└── ', ws: '    ' },
		    dflt_sdfs_calc_conns: [Function: dflt_sdfs_calc_conns],
		    get_sdfs_repr_arr: [Function: get_sdfs_repr_arr],
		    sdfs_show_all: [Function: sdfs_show_all],
		    sdfs_show_root_tree: [Function: sdfs_show_root_tree],
		    sdfs_show_from: [Function: sdfs_show_from],
		    sdfs_show_to: [Function: sdfs_show_to],
		    sdfs_show_from_to: [Function: sdfs_show_from_to],
		    sdfs_expand: [Function: sdfs_expand],
		    sdfs_foldup: [Function: sdfs_foldup],
		    dflt_edfs_show_connd: { t: '├── ', v: '│   ', l: '┌── ', ws: '    ' },
		    dflt_edfs_calc_conns: [Function: dflt_edfs_calc_conns],
		    get_edfs_repr_arr: [Function: get_edfs_repr_arr],
		    edfs_show_all: [Function: edfs_show_all],
		    edfs_show_root_tree: [Function: edfs_show_root_tree],
		    edfs_show_from: [Function: edfs_show_from],
		    edfs_show_to: [Function: edfs_show_to],
		    edfs_show_from_to: [Function: edfs_show_from_to],
		    dflt_sedfs_show_connd: {
		      indent: '    ',
		      stag_prefix: '<',
		      stag_suffix: '>',
		      etag_prefix: '</',
		      etag_suffix: '>'
		    },
		    gen_tag: [Function: gen_tag],
		    sedfs_show_all: [Function: sedfs_show_all]
		  },
		  ndcls: { Node: [Function: Node], load: [Function: load] },
		  ndutil: {rjson: [Function: rjson], wjson [Function: wjson]}
		}

