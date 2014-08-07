/** @jsx h */
'use strict';

var m = require('mercury')
var h = m.h


class StateViewer {
    constructor() {}

    render(state) {
        return <div>{state.item}</div>
    }
}


module.exports = StateViewer
