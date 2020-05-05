const ndfunc = require('./ndfunc.js')

function ele2nd(ele,mat) {
}

function mat2nodes(mat) {
}

function mat2sdfs(mat,nodes) {
        
}

function mat2edfs(mat,nodes) {
    let sdfs = mat2sdfs(mat,nodes)  
    return(ndfunc.sdfs2edfs(sdfs,nodes))    
}

function mat2sedfs(mat,nodes) {
    let sdfs = mat2sdfs(mat,nodes)
    return(ndfunc.sdfs2sedfs(sdfs,nodes))
}

module.exports = {
    ele2nd,
}
