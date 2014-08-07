/** @jsx h */
'use strict';

var m = require('mercury')
var h = m.h


class UndoManager {
    constructor(state) {
        this.state = state
        this.states = [this.state()]
        state(newState => {
            if (newState !== this.states[0]) {
                this.states.unshift(newState)
            }
        })
        this.events = m.input(['undo'])
        this.events.undo = this.undo.bind(this)
    }

    undo() {
        if (this.states.length <= 1) {
            return
        }

        this.states.shift()
        this.state.set(this.states[0])
        return this.states[0]
    }

    render() {
        return (
            <div>
                <h2>Undo Stack</h2>
                <button ev-click={m.event(this.events.undo)}>
                    Undo
                </button>
                <ul>
                    {this.states.map(state => <li>{state.item}</li>)}
                </ul>
            </div>
        )
    }
}


module.exports = UndoManager
