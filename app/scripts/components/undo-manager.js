/** @jsx h */
/* jshint camelcase: false */
'use strict';

var m = require('mercury')
var h = m.h


class UndoManager {
    constructor(state) {
        this.state = state
        this.stateIndex = 0
        this.states = [this.state()]
        this.jumpingState = false
        state(newState => {
            if (this.jumpingState) {
                this.jumpingState = false
            }
            else {
                if (this.stateIndex < this.states.length - 1) {
                    this.states = this.states.slice(0, this.stateIndex + 1)
                }
                this.states.push(newState)
                this.stateIndex = this.states.length - 1
            }
        })
        this.events = m.input(['jump'])
        this.events.jump = this.jump.bind(this)
    }

    jump(index) {
        if (0 <= index && index <= this.states.length - 1) {
            this.stateIndex = index
            this.jumpingState = true
            this.state.set(this.states[this.stateIndex])
        }
    }

    render() {
        return (
            <div>
                <h2>Undo Stack</h2>
                <button ev-click={m.event(this.events.jump, this.stateIndex - 1)} disabled={this.stateIndex === 0}>Undo</button>
                <button ev-click={m.event(this.events.jump, this.stateIndex + 1)} disabled={this.stateIndex === this.states.length - 1}>Redo</button>
                <ul>
                    {this.states.map((state, index) =>
                        <li className={index === this.stateIndex ? 'active' : 'inactive'}>
                            <a ev-click={m.event(this.events.jump, index)}>{state.item}</a>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}


module.exports = UndoManager
