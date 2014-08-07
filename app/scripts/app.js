/** @jsx h */
'use strict';

var m = require('mercury')
var h = m.h
var StateEditor = require('./components/state-editor.js')
var StateViewer = require('./components/state-viewer.js')
var UndoManager = require('./components/undo-manager.js')


class App {
    constructor() {
        this.state = m.struct({
            item: m.value('Item content.')
        })
        this.stateEditor = new StateEditor(this.state)
        this.stateViewer = new StateViewer()
        this.undoManager = new UndoManager(this.state)
    }

    render(state) {
        return (
            <div>
                <h1>Mercury Boilerplate</h1>
                {this.stateEditor.render(state)}
                {this.stateViewer.render(state)}
                {this.undoManager.render()}
            </div>
        )
    }
}

var app = new App()

m.app(document.body, app.state, app.render.bind(app))
