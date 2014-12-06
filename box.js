var React = require('react');

var D = React.DOM;
var keys = Object.keys;

module.exports = React.createClass({
    getInitialState: function() {
        return {
            cache: [],
            hash: generateHashFunction(this.props.hashFunction)
        };
    },
    getDefaultProps: function() {
        return {
            hashFunction: function(child) {
                return JSON.stringify({
                    key: child.key,
                    props: child.props
                });
            }
        };
    },
    componentDidMount: function() {
        this.readChildren(this.props.children);
    },
    componentWillReceiveProps: function(p) {
        this.readChildren(p.children);
    },
    render: function() {
        return D.div({ className: this.props.className },
            keys(this.state.cache).map(this.renderCacheItem));
    },
    renderCacheItem: function(key) {
        return D.div({ style: { display: this.visibility(key) ? 'block' : 'none' }, key: key },
            this.state.cache[key]);
    },
    readChildren: function(children) {
        var cache = this.state.cache;

        React.Children.forEach(children, function(child) {
            cache[this.state.hash(child)] = child;
        }, this);

        this.setState({ cache: cache });
    },
    visibility: function(key) {
        var c = React.Children.map(this.props.children, function(child) {
            return key === this.state.hash(child);
        }, this);

        return c ? values(c).some(isTrue) : false;
    }
});

function generateHashFunction(hashFunction) {
    var ref = {};
    var index = 0;

    return function(child) {
        var key = hashFunction(child);

        if (!ref[key]) {
            ref[key] = String(++index);
        }

        return ref[key];
    };
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
