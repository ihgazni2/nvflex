const ndcls = require('../ndcls.js')
var nd = new ndcls.Node()
nd.is_inited() === false
nd.is_root() === false

var rt = new ndcls.Root()
rt.is_inited() === true
rt.is_root() === false


