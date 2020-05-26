.. contents:: Table of Contents
   :depth: 5


nvflex
------
- generate html+inline-css  from a string template

install
-------
- npm install -g nvflex





usage
-----
- nvflex_btn --input "<string rect template>" --cfg "<config json>" --output "<output filename>"
- nvflex_border --input "<string rect template>" --cfg "<config json>" --output "<output filename>"
- nvflex_plain --input "<string rect template>" --cfg "<config json>" --output "<output filename>"
- nvflex_btn_inline --input "<string rect template>" --cfg "<config json>" --output "<output filename>"
- nvflex_border_inline --input "<string rect template>" --cfg "<config json>" --output "<output filename>"
- nvflex_plain_inline --input "<string rect template>" --cfg "<config json>" --output "<output filename>"
- cfg is optional

CLI
===

    
    ::
        
        #npm install -g nvflex

        nvflex_btn_inline --input "
        AAAAAABBBBBBCCCCCCDDDDDDDDDEEEEEEFFFFFFGGGGGG
        AAAAAABBBBBBCCCCCCDDDDDDDDDEEEEEEFFFFFFGGGGGG
        HHHHHHHHHIIIIIIIIIJJJJJJJJJKKKKKKKKKLLLLLLLLL
        HHHHHHHHHIIIIIIIIIJJJJJJJJJKKKKKKKKKLLLLLLLLL
        HHHHHHHHHIIIIIIIIIJJJJJJJJJKKKKKKKKKLLLLLLLLL
        HHHHHHHHHIIIIIIIIIJJJJJJJJJKKKKKKKKKLLLLLLLLL
        MMMMMMMMMMMMMMMMMMNNNNNNNNNNNNNNNNNNOOOOOOOOO
        MMMMMMMMMMMMMMMMMMNNNNNNNNNNNNNNNNNNOOOOOOOOO
        MMMMMMMMMMMMMMMMMMNNNNNNNNNNNNNNNNNNOOOOOOOOO
        MMMMMMMMMMMMMMMMMMNNNNNNNNNNNNNNNNNNOOOOOOOOO
        PPPPPPPPPPPPPPPPPPNNNNNNNNNNNNNNNNNNQQQQQQQQQ
        PPPPPPPPPPPPPPPPPPNNNNNNNNNNNNNNNNNNQQQQQQQQQ
        PPPPPPPPPPPPPPPPPPNNNNNNNNNNNNNNNNNNQQQQQQQQQ
        PPPPPPPPPPPPPPPPPPNNNNNNNNNNNNNNNNNNQQQQQQQQQ
        RRRRRRRRRSSSSSSSSSTTTTTTTTTTTTTTTTTTUUUUUUUUU
        RRRRRRRRRSSSSSSSSSTTTTTTTTTTTTTTTTTTUUUUUUUUU
        RRRRRRRRRSSSSSSSSSTTTTTTTTTTTTTTTTTTUUUUUUUUU
        RRRRRRRRRSSSSSSSSSTTTTTTTTTTTTTTTTTTUUUUUUUUU" --output btn_inline


        nvflex_border_inline --input "
        AAAAAABBBBBBCCCCCCDDDDDDDDDEEEEEEFFFFFFGGGGGG
        AAAAAABBBBBBCCCCCCDDDDDDDDDEEEEEEFFFFFFGGGGGG
        HHHHHHHHHIIIIIIIIIJJJJJJJJJKKKKKKKKKLLLLLLLLL
        HHHHHHHHHIIIIIIIIIJJJJJJJJJKKKKKKKKKLLLLLLLLL
        HHHHHHHHHIIIIIIIIIJJJJJJJJJKKKKKKKKKLLLLLLLLL
        HHHHHHHHHIIIIIIIIIJJJJJJJJJKKKKKKKKKLLLLLLLLL
        MMMMMMMMMMMMMMMMMMNNNNNNNNNNNNNNNNNNOOOOOOOOO
        MMMMMMMMMMMMMMMMMMNNNNNNNNNNNNNNNNNNOOOOOOOOO
        MMMMMMMMMMMMMMMMMMNNNNNNNNNNNNNNNNNNOOOOOOOOO
        MMMMMMMMMMMMMMMMMMNNNNNNNNNNNNNNNNNNOOOOOOOOO
        PPPPPPPPPPPPPPPPPPNNNNNNNNNNNNNNNNNNQQQQQQQQQ
        PPPPPPPPPPPPPPPPPPNNNNNNNNNNNNNNNNNNQQQQQQQQQ
        PPPPPPPPPPPPPPPPPPNNNNNNNNNNNNNNNNNNQQQQQQQQQ
        PPPPPPPPPPPPPPPPPPNNNNNNNNNNNNNNNNNNQQQQQQQQQ
        RRRRRRRRRSSSSSSSSSTTTTTTTTTTTTTTTTTTUUUUUUUUU
        RRRRRRRRRSSSSSSSSSTTTTTTTTTTTTTTTTTTUUUUUUUUU
        RRRRRRRRRSSSSSSSSSTTTTTTTTTTTTTTTTTTUUUUUUUUU
        RRRRRRRRRSSSSSSSSSTTTTTTTTTTTTTTTTTTUUUUUUUUU" --output border_inline        


        nvflex_plain_inline --input "
        AAAAAABBBBBBCCCCCCDDDDDDDDDEEEEEEFFFFFFGGGGGG
        AAAAAABBBBBBCCCCCCDDDDDDDDDEEEEEEFFFFFFGGGGGG
        HHHHHHHHHIIIIIIIIIJJJJJJJJJKKKKKKKKKLLLLLLLLL
        HHHHHHHHHIIIIIIIIIJJJJJJJJJKKKKKKKKKLLLLLLLLL
        HHHHHHHHHIIIIIIIIIJJJJJJJJJKKKKKKKKKLLLLLLLLL
        HHHHHHHHHIIIIIIIIIJJJJJJJJJKKKKKKKKKLLLLLLLLL
        MMMMMMMMMMMMMMMMMMNNNNNNNNNNNNNNNNNNOOOOOOOOO
        MMMMMMMMMMMMMMMMMMNNNNNNNNNNNNNNNNNNOOOOOOOOO
        MMMMMMMMMMMMMMMMMMNNNNNNNNNNNNNNNNNNOOOOOOOOO
        MMMMMMMMMMMMMMMMMMNNNNNNNNNNNNNNNNNNOOOOOOOOO
        PPPPPPPPPPPPPPPPPPNNNNNNNNNNNNNNNNNNQQQQQQQQQ
        PPPPPPPPPPPPPPPPPPNNNNNNNNNNNNNNNNNNQQQQQQQQQ
        PPPPPPPPPPPPPPPPPPNNNNNNNNNNNNNNNNNNQQQQQQQQQ
        PPPPPPPPPPPPPPPPPPNNNNNNNNNNNNNNNNNNQQQQQQQQQ
        RRRRRRRRRSSSSSSSSSTTTTTTTTTTTTTTTTTTUUUUUUUUU
        RRRRRRRRRSSSSSSSSSTTTTTTTTTTTTTTTTTTUUUUUUUUU
        RRRRRRRRRSSSSSSSSSTTTTTTTTTTTTTTTTTTUUUUUUUUU
        RRRRRRRRRSSSSSSSSSTTTTTTTTTTTTTTTTTTUUUUUUUUU" --output plain_inline


template        
~~~~~~~~


.. image:: docs/str-tem-blocks.png


layout
~~~~~~


.. image:: docs/term-layout.png


generated-html
~~~~~~~~~~~~~~
    
- `nvflex_btn.html <docs/btn.html>`_
- `nvflex_border.html <docs/border.html>`_
- `nvflex_plain.html <docs/plain.html>`_
- `nvflex_btn_inline.html <docs/btn_inline.html>`_
- `nvflex_border_inline.html <docs/border_inline.html>`_
- `nvflex_plain_inline.html <docs/plain_inline.html>`_

img
###

.. image:: docs/btn.png
.. image:: docs/border.png
.. image:: docs/plain.png
.. image:: docs/btn_inline.png
.. image:: docs/border_inline.png
.. image:: docs/plain_inline.png




generated-dflt-cfg
~~~~~~~~~~~~~~~~~~
- `nvflex_btn.cfg.json <docs/btn.cfg.json>`_
- `nvflex_border.cfg.json <docs/border.cfg.json>`_
- `nvflex_plain.cfg.json <docs/plain.cfg.json>`_
- `nvflex_btn_inline.cfg.json <docs/btn_inline.cfg.json>`_
- `nvflex_border_inline.cfg.json <docs/border_inline.cfg.json>`_
- `nvflex_plain_inline.cfg.json <docs/plain_inline.cfg.json>`_


 

API
===

    ::

        > require('./zonefunc.js')
        { get_ledge: [Function: get_ledge],
          get_redge: [Function: get_redge],
          get_tedge: [Function: get_tedge],
          get_bedge: [Function: get_bedge],
          edge_eq: [Function: edge_eq],
          is_ladj_of: [Function: is_ladj_of],
          is_radj_of: [Function: is_radj_of],
          is_tadj_of: [Function: is_tadj_of],
          is_badj_of: [Function: is_badj_of],
          zones2znds: [Function: zones2znds],
          sort_znds_l2r: [Function: sort_znds_l2r],
          sort_znds_t2b: [Function: sort_znds_t2b],
          sort_znds_tl2br: [Function: sort_znds_tl2br],
          sort_znds_lt2rb: [Function: sort_znds_lt2rb],
          lppend: [Function: lppend],
          rppend: [Function: rppend],
          tppend: [Function: tppend],
          bppend: [Function: bppend],
          iter_next_l2r: [Function: iter_next_l2r],
          iter_next_t2b: [Function: iter_next_t2b],
          agg_l2r: [Function: agg_l2r],
          agg_t2b: [Function: agg_t2b],
          znds2tree: [Function: znds2tree],
          show_znd_tree: [Function: show_znd_tree] }
        >




        > require('./cellfunc.js')
        { parse: [Function: parse],
          creat_cell: [Function: creat_cell],
          cmat2carr: [Function: cmat2carr],
          get_submat_via_tlbr_from_cmat: [Function: get_submat_via_tlbr_from_cmat],
          get_subcarr_via_tlbr_from_cmat: [Function: get_subcarr_via_tlbr_from_cmat],
          get_cmat_rn: [Function: get_cmat_rn],
          get_cmat_cn: [Function: get_cmat_cn],
          get_cmat_rncn: [Function: get_cmat_rncn],
          is_cell_in_cmat: [Function: is_cell_in_cmat],
          is_continuous: [Function: is_continuous],
          is_all_having_same_rune: [Function: is_all_having_same_rune],
          is_zone: [Function: is_zone],
          is_tl_of: [Function: is_tl_of],
          is_br_of: [Function: is_br_of],
          creat_zone: [Function: creat_zone],
          iter_next: [Function: iter_next],
          s2cmat_bmap: [Function: s2cmat_bmap],
          get_clrd: [Function: get_clrd],
          playout: [Function: playout],
          ansi256_color_control: [Function: ansi256_color_control] }


        > require('./whtml.js')
        { is_stag: [Function: is_stag],
          is_etag: [Function: is_etag],
          creat_stag: [Function: creat_stag],
          creat_etag: [Function: creat_etag],
          creat_css: [Function: creat_css],
          creat_attrib: [Function: creat_attrib],
          creat_root_flex: [Function: creat_root_flex],
          calc_flex: [Function: calc_flex],
          sedfs2html: [Function: sedfs2html] }
        >

