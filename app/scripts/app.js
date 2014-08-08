/** @jsx h */
'use strict';

var m = require('mercury')
var h = m.h
var ItemEditor = require('./components/item-editor.js')
var ItemViewer = require('./components/item-viewer.js')
var UndoManager = require('./components/undo-manager.js')


class App {
    constructor() {
        this.itemEditor = new ItemEditor()
        this.itemViewer = new ItemViewer()
        this.state = m.struct({
            item: this.itemEditor.item
        })
        this.undoManager = new UndoManager(this.state)
    }

    render(state) {
        return (
            <div>
                <h1>Mercury Boilerplate</h1>
                <section className="editor">{this.itemEditor.render()}</section>
                <section className="undo-manager">{this.undoManager.render()}</section>
                <section className="viewer">{this.itemViewer.render(state.item)}</section>
            </div>
        )
    }
}

var app = new App()
m.app(document.body, app.state, app.render.bind(app))
