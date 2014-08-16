/** @jsx h */
'use strict';

var m = require('mercury')
var h = m.h


function renderEditor(item) {
    return (
        <div>
            <h2>Editor</h2>
            <input value={item.content}
                   name='content'
                   ev-event={m.changeEvent(item.events.change)} />
        </div>
    )
}

function renderViewer(item) {
    return (
        <div>
            <h2>Current State</h2>
            {item.content}
        </div>
    )
}


module.exports = {
    renderEditor: renderEditor,
    renderViewer: renderViewer
}
