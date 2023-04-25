# `fluent-emoji`

A web component that swaps standard emojis with Microsoft's Fluent Emojis

## Installation

Install from npm or source from CDN

## Usage

```html
<body>
    <main>
        <h1>Hello world! <fluent-emoji platforms="windows">👋</fluent-emoji></h1>
    </main>
    <script type="module" src="https://unpkg.com/fluent-emoji"></script>
</body
```

## Documentation

### Attributes

You can pass any attributes that you want to the top-level `fluent-emoji` element, _e.g._ `class` or `id`. The following attributes are used internally by the component:

| Attribute    | Type     | Description                                                                       | Example                     |
| ------------ | -------- | --------------------------------------------------------------------------------- | --------------------------- |
| `aria-label` | `string` | A label for the emoji. If absent, host element is hidden with `aria-hidden=true`  | `aria-label="smiling face"` |
| `platforms`  | `string` | A space-separated list of platforms on which to replace emojis. Defaults to `all` | `platform="windows linux"`  |
