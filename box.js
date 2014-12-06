var React = require('react');

var D = React.DOM;
var keys = Object.keys;

module.exports = React.createClass({
    getInitialState: function() {
        return {
            cache: []
        };
    },
    componentWillReceiveProps: function(p) {
        var cache = this.state.cache;

        React.Children.forEach(p.children, function(child) {
            cache[signature(child)] = child;
        });

        this.setState({ cache: cache });
    },
    render: function() {
        return D.div(null,
            keys(this.state.cache).map(this.renderCacheItem));
    },
    renderCacheItem: function(key) {
        return D.div({ style: { display: this.visibility(key) ? 'block' : 'none' }, key: key },
            this.state.cache[key]);
    },
    visibility: function(key) {
        var c = React.Children.map(this.props.children, function(child) {
            return key === signature(child);
        });

        return c ? values(c).some(isTrue) : false;
    }
});

var ref = {};
var index = 0;

function signature(child) {
    var key = JSON.stringify({
        key: child.key,
        props: child.props
    });

    if (!ref[key]) {
        ref[key] = String(++index);
    }

    return ref[key];
}

function isTrue(value) {
    return value === true;
}

function values(object) {
    return keys(object).map(prop.bind(null, object));
}

function prop(object, property) {
    return object[property];
}
