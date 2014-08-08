/** @jsx h */
'use strict';

var m = require('mercury')
var h = m.h


class ItemEditor {
    constructor() {
        this.item = m.value('Item content')
        this.events = m.input(['change'])
        this.events.change(data => this.item.set(data.item))
    }

    render() {
        return (
            <div>
                <h2>Editor</h2>
                <input value={this.item()}
                       name='item'
                       ev-event={m.changeEvent(this.events.change)} />
            </div>
        )
    }
}


module.exports = ItemEditor
