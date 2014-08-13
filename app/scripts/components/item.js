/** @jsx h */
'use strict';

var m = require('mercury')
var h = m.h


class Item {
    constructor() {
        var events = m.input(['change'])
        events.change(this.itemChanged.bind(this))
        this.state = m.struct({
            content: m.value('Item content'),
            events: events
        })
    }

    itemChanged(data) {
        this.state.content.set(data.content)
    }

    static renderEditor(item) {
        return (
            <div>
                <h2>Editor</h2>
                <input value={item.content}
                       name='content'
                       ev-event={m.changeEvent(item.events.change)} />
            </div>
        )
    }

    static renderViewer(item) {
        return (
            <div>
                <h2>Current State</h2>
                {item.content}
            </div>
        )
    }
}


module.exports = Item
