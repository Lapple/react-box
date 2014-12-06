# React Box

Wraps repeatedly rerendered components preserving their nodes in real DOM to reduce paints. The idea is borrowed from [Noscript](https://github.com/yandex-ui/noscript) framework, where box is a container for views that manages visibility of active views instead of taking irrelevant nodes out of DOM.

## Installation

    npm install react-box

## Usage

Wrap your content into `Box` element, and make sure that children of different classes have distinct keys:

```jsx
render: function() {
    var content;

    if (this.props.mode === 'map') {
        content = <Map key='map' />;
    } else {
        content = <Post key='post' id={ this.props.id } />
    }

    return <Box>{ content }</Box>;
}
```

This example will result in the following HTML structure:

```html
<!-- Initial render: <Content mode='map' /> -->
<div>
    <div style="display: block;">
        <div class="map"><!-- … --></div>
    </div>
</div>

<!-- First update: <Content mode='post' id='1' /> -->
<div>
    <div style="display: none;">
        <div class="map"><!-- … --></div>
    </div>
    <div style="display: block;">
        <div class="post">
            <h1>Post ID: 1</h1>
            <!-- … -->
        </div>
    </div>
</div>

<!-- Second update: <Content mode='post' id='2' /> -->
<div>
    <div style="display: none;">
        <div class="map"><!-- … --></div>
    </div>
    <div style="display: none;">
        <div class="post">
            <h1>Post ID: 1</h1>
            <!-- … -->
        </div>
    </div>
    <div style="display: block;">
        <div class="post">
            <h1>Post ID: 2</h1>
            <!-- … -->
        </div>
    </div>
</div>

<!-- Third update: <Content mode='post' id='2' /> -->
<div>
    <div style="display: block;">
        <div class="map"><!-- … --></div>
    </div>
    <div style="display: none;">
        <div class="post">
            <h1>Post ID: 1</h1>
            <!-- … -->
        </div>
    </div>
    <div style="display: none;">
        <div class="post">
            <h1>Post ID: 2</h1>
            <!-- … -->
        </div>
    </div>
</div>
```
