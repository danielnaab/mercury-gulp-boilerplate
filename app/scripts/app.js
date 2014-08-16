/** @jsx h */
'use strict';

var m = require('mercury')
var h = m.h
var Item = require('./components/item')
var UndoManager = require('./components/undo-manager')


class App {
    constructor() {
        var item = new Item()
        this.undoManager = new UndoManager(item.state)
        this.state = m.struct({
            item: item.state
        })
    }

    render(state) {
        return (
            <div>
                <h1>Mercury Boilerplate</h1>
                <section className="item-editor">{Item.renderEditor(state.item)}</section>
                <section className="undo-manager">{this.undoManager.render()}</section>
                <section className="item-viewer">{Item.renderViewer(state.item)}</section>
            </div>
        )
    }
}

var app = new App()
m.app(document.body, app.state, app.render.bind(app))
