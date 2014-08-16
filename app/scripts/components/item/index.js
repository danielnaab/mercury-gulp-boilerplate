'use strict';

var m = require('mercury')
var view = require('./view')


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
}


Item.renderEditor = view.renderEditor
Item.renderViewer = view.renderViewer
module.exports = Item
