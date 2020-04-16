
function gen_guid() {
    return(
        'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            function(c) {
                let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8)
                return(v.toString(16))
            }
         )
    )
}



function calc_next_id(nodes) {
    let ids = dict_keys(nodes)
    return(Math.max(...ids)+1)
}

function update_nodes_ids(nodes0,nodes1) {
    let next_id = calc_next_id(nodes0)
    for(let id in nodes1) {
        nodes1[id]._id = nodes1[id]._id + next_id
    }
    return(nodes1)
}



function range(si,ei) {
    return(Array.from({ length: ei-si }).map((v, i) => i + si))
}

function seqs_slct(seqs,arr) {
    return(arr.filter((r,i)=>(seqs.includes(i))))
}

function dict_values(d) {
    let entries = Object.entries(d)
    let values = entries.map(r=>r[1])
    return(values)
}

function dict_keys(d) {
    let entries = Object.entries(d)
    let keys = entries.map(r=>r[0])
    return(keys)
}

function dict_length(d) {
    let entries = Object.entries(d)
    return(entries.length)
}

function dict_map(d,f) {
    for(let k in d) {
        f(k,d[k])
    }
    return(d)
}

function dtb_kv_rm(k,v,dtb) {
    dtb = dtb.filter(r=>(r[k]!==v))
    return(dtb)
}

function dtb_kv_get_seq(k,v,dtb) {
    let seq = dtb.findIndex(r=>r[k]===v)
    return(seq)
}

function dcp(o) {
    return(JSON.parse(JSON.stringify(o)))
}


module.exports = {
    calc_next_id:calc_next_id,
    gen_guid:gen_guid,
    update_nodes_ids:update_nodes_ids,
    range:range,
    seqs_slct:seqs_slct,
    dict_values:dict_values,
    dict_keys:dict_keys,
    dict_map:dict_map,
    dict_length:dict_length,
    dtb_kv_rm,
    dtb_kv_get_seq,
    dcp:dcp,
}
