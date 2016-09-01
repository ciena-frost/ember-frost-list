# ember-frost-list

`ember-frost-list` is an ember addon that built on top of
[smoke-and-miror](https://github.com/runspired/smoke-and-mirrors) which focuses
on high performance list rendering. This component itself provides features such
as list selection control, list sorting, infinite scroll and list item expansion
control. Consumer can take advantage of these features by providing associated
actions/callback functions and required properties, or much simpler by mix the
mixin into your component and let it handle everything.

###### Dependencies

![Ember][ember-img]
[![NPM][npm-img]][npm-url]

###### Health

[![Travis][ci-img]][ci-url]
[![Coveralls][cov-img]][cov-url]

###### Security

[![bitHound][bithound-img]][bithound-url]

*   [Installation](#Installation)
*   [API](#API)
*   [Examples](#Examples)
*   [Contributing](#Contributing)

## Installation

```bash
ember install ember-frost-list
```

## API

### Data driven pattern

| parameters type    | Attribute       | Type              | value           | Description     |
| ------------------ | --------------- | ----------------- | --------------- | --------------- |
| `Positional param` | `N/A`           | `string`          |                 | Required: path for user provided list-item component which describes each row/item in the list. |
| `Attribute`        | `items`         | `array`           |                 | Required: data model used for rendering list. |
| `Attribute`        | `config`        | `<property name>` | listMixinConfig | Required: Reserved property provided by frost-list-mixin to config the list based on the user provided listConfig hash in controller  |
| `Attribute`        | `defaultHeight` | `number`          |                 | default height for each list item, set to 45px if not provided. |

### Customization pattern

| parameters type    | Attribute            | Type             | value | Description |
| ------------------ | -------------------- | ---------------- | ----- | ----------- |
| `Positional param` | `N/A`                | `string`         |       | Required: path for user provided list-item component which describes each row/item in the list. |
| `Attribute`        | `items`              | `array`          |       | Required: data model used for rendering list. |
| `Attribute`        | `defaultHeight`      | `number`         |       | default height for each list item, set to 45px if not provided. |
| `Attribute`        | `selection`          | `hash`           |       | Required: A hash wrapper created on the fly when component be rendered which must contain its only required properties. |
| `Sub Attribute`    | `onSelect`           | `action closure` |       | Required: callback functions user provided to handle list item selection. |
| `Attribute`        | `expansion`          | `hash`           |       | A hash wrapper created on the fly when component be rendered which must contain its only required properties. |
| `Sub Attribute`    | `onCollapse`         | `action closure` |       | callback functions user provided to handle single list item collapsing. |
| `Sub Attribute`    | `onExpandAll`        | `action closure` |       | callback functions user provided to handle all list items collapsing. |
| `Sub Attribute`    | `onExpand`           | `action closure` |       | callback functions user provided to handle single list item expansion. |
| `Sub Attribute`    | `onCollapseAll`      | `action closure` |       | callback functions user provided to handle all list items expansion. |
| `Attribute`        | `sorting`            | `hash`           |       | A hash wrapper created on the fly when component be rendered which must contain its only required properties. |
| `Sub Attribute`    | `activeSorting`      | `array`          |       | Array that specifies the sort order. eg. [{"direction: "asc/desc", "value": <attr-name>}] |
| `Sub Attribute`    | `properties` | `array`          |       | Array of sortable attributes. eg. [{"label: "foo", "value": "bar"}] |
| `Sub Attribute`    | `onSort`             | `action closure` |       | callback functions user provided to handle sorting.  |

### Infinite scroll

| parameters type | Attribute | Type | Description |
|---------| --------- | ---- | ----------- |
| `Attribute` | `loadPrevious` | `action closure` | triggers associated user action when scroll reaches upper boundary. |
| `Attribute` | `loadNext` | `action closure` | triggers associated user action when scroll reaches lower boundary. |

## Examples

### Data driven pattern (must use with mixin)

By mix the mixin into your component, config your list with simply provide
`listConfig` hash in controller and pass the `listMixinConfig` which generated
by the mixin to your list. By default mixin will provide you all the methods you
need to handle selection/sorting/expansion. If you don't like any default
methods provided by mixin, you can just override it in controller's actions hash
with the correct key name.

In template

```handlebars
{{frost-list
  items=sortedItems
  config=listMixinConfig
}}
```

In controller

```javascript
import Ember from 'ember'
import FrostListMixin from 'ember-frost-list/mixins/frost-list-mixin'
export default Ember.ClassName.extend(FrostListMixin, {
  listConfig: {
    // property name of input model
    items: 'model',

    // configuration of sorting. `Active` is the default sort which must be provided, where `properties` is the array of sortable attributes
    sorting: {
      active: [{value: 'label', direction: ':desc'}],
      properties: [
        {
          value: 'label',
          label: 'Label'
        },
        {
          value: 'id',
          label: 'Id'
        }
      ]
    }
  }
})
```

### Customization pattern (optional use with mixin)

In this API pattern, consumer will have the ability to provide expansion,
selection or sorting hash to the list by needs. The list component will render
associated modules based on the hashes it receives. Note that `selection` hash
is mandatory, whereas `expansion` and `sorting` is optional.

In template

```handlebars
{{frost-list 'user-list-item'
  items=sortedItems
  expansion=(hash
    onCollapse=(action 'collapseItem')
    onCollapseAll=(action 'collapseItems')
    onExpand=(action 'expandItem')
    onExpandAll=(action 'expandItems')
  )
  selection=(hash
    onSelect=(action 'selectItem')
  )
  sorting=(hash
    activeSorting=activeSorting
    properties=sortableProperties
    onSort=(action 'sortItems')
  )
}}
```

### Infinite scroll

Implementing infinite scroll is straightforward. When scroll bar hits either
upper boundary or lower boundary, loadPrevious/loadNext event will be emitted
and consumer actions/functions will be called if provided.

In template

```handlebars
{{frost-list 'user-list-item'
  items=items
  loadNext=(action 'loadNext')
  onSelect=(action 'selected')
}}
```

In controller

```javascript
items: Ember.computed.alias('model'),
actions: {
  _loadNext () {
    // data retrieval/backend API call goes here
  },

  _loadPrevious () {
    // data retrieval/backend API call goes here
  },
}
```

## Development

### Setup

```bash
git clone git@github.com:ciena-frost/ember-frost-list.git
cd ember-frost-list
npm install && bower install
```

### Development Server

A dummy application for development is available under
`ember-frost-list/tests/dummy`.
To run the server run `ember server` (or `npm start`) from the root of the
repository and visit the app at http://localhost:4200.

### Testing

Run `npm test` from the root of the project to run linting checks as well as
execute the test suite and output code coverage.

[bithound-img]: https://www.bithound.io/github/ciena-frost/ember-frost-list/badges/score.svg "bitHound"
[bithound-url]: https://www.bithound.io/github/ciena-frost/ember-frost-list

[ci-img]: https://travis-ci.org/ciena-frost/ember-frost-list.svg "Build Status"
[ci-url]: https://travis-ci.org/ciena-frost/ember-frost-list

[cov-img]: https://coveralls.io/repos/github/ciena-frost/ember-frost-list/badge.svg?branch=master "Code Coverage"
[cov-url]: https://coveralls.io/github/ciena-frost/ember-frost-list

[ember-img]: https://img.shields.io/badge/ember-1.12.2+-orange.svg "Ember 1.12.2+"

[npm-img]: https://img.shields.io/npm/v/ember-frost-list.svg "NPM Version"
[npm-url]: https://www.npmjs.com/package/ember-frost-list
