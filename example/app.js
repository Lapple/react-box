var React = require('react');
var render = require('react-dom').render;
var D = React.DOM;

var Box = require('../box.js');
var box = React.createFactory(Box);

var A = React.createClass({
    displayName: 'A',
    render: function() {
        return D.div(null,
            D.div(null, 'A'),
            D.div(null, D.b(null, this.props.bold)),
            D.div(null, D.i(null, this.props.italic)));
    }
});

var B = React.createClass({
    displayName: 'B',
    render: function() {
        return D.div(null,
            D.div(null, 'B'),
            D.div(null, D.b(null, this.props.bold)),
            D.div(null, D.i(null, this.props.italic)));
    }
});

var a = React.createFactory(A);
var b = React.createFactory(B);

var App = React.createClass({
    render: function() {
        return box(null,
            this.props.a ?
                a({ key: 'a', bold: this.props.bold, italic: this.props.italic }) :
                b({ key: 'b', bold: this.props.bold, italic: this.props.italic }));
    }
});

var app = React.createFactory(App);

document.addEventListener('DOMContentLoaded', function() {
    var states = [
        { a: true, bold: 'one', italic: 'one' },
        { a: false, bold: 'two', italic: 'two' },
        { a: true, bold: 'three', italic: 'three' },
        { a: false, bold: 'four', italic: 'four' }
    ];

    var index = -1;

    setInterval(function() {
        render(
            app(states[++index % states.length]),
            document.getElementById('app'));
    }, 500);
});
