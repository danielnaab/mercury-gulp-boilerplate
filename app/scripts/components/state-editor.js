/** @jsx h */
'use strict';

var m = require('mercury')
var h = m.h


class StateEditor {
    constructor(state) {
        this.events = m.input(['change'])
        this.events.change(data => state.item.set(data.item))
    }

    render(state) {
        return (
            <div>
                <input value={state.item}
                       name='item'
                       ev-event={m.changeEvent(this.events.change)} />
            </div>
        )
    }
}


module.exports = StateEditor
