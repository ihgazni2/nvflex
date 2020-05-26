.. contents:: Table of Contents
   :depth: 5


nvflex
------
- generate html+inline-css  from a string template
- only flex-related-css  and html generated,not any javascript included

install
-------
- npm install -g nvflex


examples
--------

plain
=====
    
    ::

        nvflex_plain --input "
        * ##    ##  ##     ##  ########  ##        ########  ##    ##  *
        * ###   ##  ##     ##  ##        ##        ##        ##    ##  *
        * ####  ##  ##     ##  ##        ##        ##        ###  ###  *
        * ## ## ##  ###   ###  #####     ##        #####       ####    *
        * ##  ####    ## ##    ##        ##        ##        ###  ###  *
        * ##   ###     ###     ##        ##        ##        ##    ##  *
        * ##    ##      #      ##        ########  ########  ##    ##  *
        " --output nvflex
        
        #first use some character-genrator such as http://patorjk.com/software/taag/
        #to genertator a txt-template(dont use some shell-forbidden chars suchas $)

.. image:: docs/nvflex-0.png



border
======
    
    ::
        
        nvflex_border --input "
        VVVVVVVV@@@@@@@@VVVVVVVV
        VVVVVVVV@@@@@@@@VVVVVVVV
        VVVVVVVV@@@@@@@@VVVVVVVV
        TTTTTTTTttttttttTTTTTTTT
        VVVVVVVV@@@@@@@@VVVVVVVV
        VVVVVVVV@@@@@@@@VVVVVVVV
        VVVVVVVV@@@@@@@@VVVVVVVV
        TTTTTTTTttttttttTTTTTTTT
        " --output border

.. image:: docs/border-0.png


btn0
====
    
    ::
        
        nvflex_btn --input "
        ****@@@@****
        ****@@@@****
        ####@@@@####
        ####@@@@####"  --output btn-example-0


.. image:: docs/btn-example-0.png





btn1
====
    
    ::
        
        nvflex_btn --input "
        AA @ @ @ @ @
        BB#####%%%%%
        CC#####%%%%%
        DD----------
        EE%%%%%#####
        FF%%%%%#####"  --output btn-example-1

.. image:: docs/btn-example-1.png





usage
-----
- nvflex_btn --input "<string or txt-tem-file-name>" --cfg "<config-json-file-name>" --output "<output filename>"
- nvflex_border --input "<string or txt-tem-file-name>" --cfg "<config-json-file-name>" --output "<output filename>"
- nvflex_plain --input "<string or txt-tem-file-name>" --cfg "<config-json-file-name>" --output "<output filename>"
- nvflex_btn_inline --input "<string or txt-tem-file-name>" --cfg "<config-json-file-name>" --output "<output filename>"
- nvflex_border_inline --input "<string or txt-tem-file-name>" --cfg "<config-json-file-name>" --output "<output filename>"
- nvflex_plain_inline --input "<string or txt-tem-file-name>" --cfg "<config-json-file-name>" --output "<output filename>"
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

- bgn-img

.. image:: docs/btn.png


- border-img

.. image:: docs/border.png

- plain-img

.. image:: docs/plain.png




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







