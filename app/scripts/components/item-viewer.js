/** @jsx h */
'use strict';

var m = require('mercury')
var h = m.h


class ItemViewer {
    constructor() {}

    render(item) {
        return (
            <div>
                <h2>Current State</h2>
                {item}
            </div>
        )
    }
}


module.exports = ItemViewer
