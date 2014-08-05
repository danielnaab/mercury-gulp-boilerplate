/** @jsx h */
'use strict';
var h = require('mercury').h;
var m = require('mercury');

function testMercury(name) {
    return <div>Hello, {name}!</div>;
}

m.app(
    document.body,
    m.value('world'),
    testMercury
);
