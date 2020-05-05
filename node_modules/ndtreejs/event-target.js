//https://dom.spec.whatwg.org/#callbackdef-eventlistener

class EventListenerOptions {
    constructor() {
        this.capture = false    
    }
}

class AddEventListenerOptions extends EventListenerOptions {
    constructor() {
        this.passive = false
        this.once = false
    }
}

class EventListener {
    handleEvent(event) {
    }
}


class EventTarget {
    constructor(){
    }
    addEventListener(type,callback,options={}) {
    }
    removeEventListener(type,callback,options={}) {
    }
    dispatchEvent(event) {
    }
}



module.exports = {
    EventTarget
}
