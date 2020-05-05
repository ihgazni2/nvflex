/*
 * bmap        rune-bitmap
 * cmat        cell-mat
 * carr        cell-arr
 */

const {kvlist2d} = require('./util.js')



function s2cmat_bmap(s) {
    s = s.trim()
    let lines = s.split('\n')
    lines = lines.map(line=>line.trim())
    let bmap = lines.map(line=>line.split(''))
    let cmat = bmap.map(
        (line,row) => {
            return(line.map((r,col)=>({x:row,y:col,rune:r})))
        }
    )
    return({cmat:cmat,bmap:bmap})
}

function creat_cell(x,y,rune) {
    let d = {
        x:x,
        y:y,
        rune:rune
    }
    return(d)
}


function cmat2carr(cmat) {
    let carr = Array.prototype.concat(...cmat)
    carr.reverse()
    return(carr)
}


function get_submat_via_tlbr_from_cmat(cmat,tl,br) {
    let rs = tl.x
    let cs = tl.y
    let re = br.x + 1
    let ce = br.y + 1
    let submat = []
    for(let r=rs;r<re;r++) {
        let row = cmat[r]
        row = row.slice(cs,ce)
        submat.push(row)
    }
    return(submat)
}

function get_subcarr_via_tlbr_from_cmat(cmat,tl,br) {
    let submat = get_submat_via_tlbr_from_cmat(cmat,tl,br)
    return(Array.prototype.concat(...submat))
}

function get_cmat_rn(cmat) {
    return(cmat.length)
}

function get_cmat_cn(cmat) {
    return(cmat[0].length)
}

function get_cmat_rncn(cmat) {
    return([get_cmat_rn(cmat),get_cmat_cn(cmat)])
}

function is_cell_in_cmat(cmat,cell) {
    let rn = get_cmat_rn(cmat)
    let cn = get_cmat_cn(cmat)
    return(
        (cell.x <= cn) && 
        (cell.y <= rn) && 
        (cmat[cell.x][cell.y].rune === cell.rune)
    )
}


function is_continuous(subcarr,bmap) {
    let lngth = subcarr.filter(cell=>(bmap[cell.x][cell.y]!==null)).length
    let expected_lngth = subcarr.length
    let cond = (lngth === expected_lngth)
    return(cond)
}

function is_all_having_same_rune(subcarr) {
    let rune = subcarr[0].rune
    let cond = subcarr.every(r=>r.rune===rune)
    return(cond)
}

function is_zone(tl,br,cmat,bmap) {
    let subcarr = get_subcarr_via_tlbr_from_cmat(cmat,tl,br)
    let cond0 = is_continuous(subcarr,bmap)
    let cond1 = is_all_having_same_rune(subcarr)
    return(cond0 && cond1)
}


function is_tl_of(c0,c1) {
    let cond0 = c0.x <= c1.x
    let cond1 = c0.y <= c1.y
    return(cond0 && cond1)
}

function is_br_of(c0,c1) {
    return(is_tl_of(c1,c0))
}

function creat_zone(tl,br) {
    let z = {}
    z.t = tl.x
    z.l = tl.y
    z.b = br.x
    z.r = br.y
    z.rune = tl.rune
    return(z)
}

function nullize_bmap(bmap,zonearr) {
    zonearr.forEach(
        r=>{
            bmap[r.x][r.y] = null
        }
    )
    return(bmap)
}


function iter_next(unhandled) {
    let carr = unhandled.carr
    let zones = unhandled.zones
    let bmap = unhandled.bmap
    let cmat = unhandled.cmat
    for(let i=0;i<carr.length;i++) {
        let br = carr[i]
        let brx = br.x
        let bry = br.y
        for(let j=carr.length-1;j>i-1;j--) {
            let tl = carr[j]
            let cond = is_tl_of(tl,br)
            if(cond) {
                let cond = is_zone(tl,br,cmat,bmap)
                if(cond) {
                    let zonearr = get_subcarr_via_tlbr_from_cmat(cmat,tl,br)
                    carr = carr.filter(cell=>!zonearr.includes(cell))
                    let z = creat_zone(tl,br)
                    zones.push(z)
                    bmap = nullize_bmap(bmap,zonearr)
                    return({
                        carr:carr,
                        zones:zones,
                        cmat:cmat,
                        bmap:bmap
                    })
                } else {
                }
            } else {
            }
        }
    }
}


function parse(s) {
    let {cmat,bmap} = s2cmat_bmap(s)
    let carr = cmat2carr(cmat)
    let zones = []
    let unhandled = {carr:carr,zones:zones,cmat:cmat,bmap:bmap}
    while(unhandled.carr.length>0) {
        unhandled = iter_next(unhandled)
    }
    return(unhandled)
}


function ansi256_color_control(s,fg,bg) {
    if(fg === undefined) {fg = 255}
    if(bg === undefined) {bg = 0}
    let control = '\033[38;5;' +fg +"m" + '\033[48;5;' +bg +"m"
    let dflt =  "\033[0m"
    return(control+s+dflt)
}


function get_clrd(cmat) {
    let arr = Array.prototype.concat(...cmat)
    let runes = arr.map(r=>r.rune)
    runes = new Set(runes)
    runes = Array.from(runes)
    let clrs = runes.map((r,i)=>r.charCodeAt()+10*i)
    let clrd = kvlist2d(runes,clrs)
    return(clrd)
}

function _playout(cmat) {
    let clrd = get_clrd(cmat) 
    for(let i=0;i<cmat.length;i++) {
        let lyr = cmat[i]
        lyr = lyr.map(r=>ansi256_color_control(r.rune+r.rune,clrd[r.rune],clrd[r.rune]))
        console.log(lyr.join(''))
    }
}

function playout(s) {
    let {zones,cmat} = parse(s)
    _playout(cmat)
}


module.exports = {
    parse,
    creat_cell,
    cmat2carr,
    get_submat_via_tlbr_from_cmat,
    get_subcarr_via_tlbr_from_cmat,
    get_cmat_rn,
    get_cmat_cn,
    get_cmat_rncn,
    is_cell_in_cmat,
    is_continuous,
    is_all_having_same_rune,
    is_zone,
    is_tl_of,
    is_br_of,
    creat_zone,
    iter_next,
    s2cmat_bmap,
    get_clrd,
    playout,
    ansi256_color_control,
}



