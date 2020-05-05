function tst_disconn() {
    var rt = ndcls.load('./TEST/ndict.json')
    var sdfs = rt.$sdfs() 
    sh(rt.$dump())
    var nd15 = sdfs[15].$disconn()
    sh(rt.$dump())
    sh(nd15.$dump())
    var nd10 = sdfs[10].$disconn()
    sh(rt.$dump())
    sh(nd10.$dump())
    var nd12 = sdfs[12].$disconn()
    sh(rt.$dump())
    sh(nd12.$dump())
    var nd6 = sdfs[6].$disconn()
    sh(rt.$dump())
    sh(nd6.$dump())
}

