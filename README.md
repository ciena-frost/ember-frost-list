# ember-frost-list

`ember-frost-list` is an ember addon built on top of
[smoke-and-mirrors](https://github.com/runspired/smoke-and-mirrors) which focuses
on high performance list rendering. This component provides the ability
to effortlessly handle list operations such as selection control, list
sorting, list item expansion control and infinite scroll.

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

Detailed API and example usage can be found in the sample application in tests/dummy, which is also running at http://ciena-frost.github.io/ember-frost-list

### Data driven pattern

| parameters type    | Attribute       | Type              | value           | Description     |
| ------------------ | --------------- | ----------------- | --------------- | --------------- |
| `Attribute`        | `config`        | `Object`          |                 | Required: config object which will setup the list based on the user provided listConfig hash in controller. A reserved property listMixinConfig provided by frost-list-mixin should be assigned to config attribute. |

### Customization pattern

| parameters type    | Attribute            | Type             | value | Description |
| ------------------ | -------------------- | ---------------- | ----- | ----------- |
| `Attribute`        | `items`              | `array`          |       | Required: data model used for rendering list. |
| `Attribute`        | `defaultHeight`      | `number`         |       | default height for each list item, set to 45px if not provided. |
| `Attribute`        | `onSelect`           | `action closure` |       | Required: action consumer provided to handle list item selection. |
| `Attribute`        | `item`               | `component`      |       | Required: user provided list-item component which describes each row/item in the list. This component should be extended from frost-list-item and wrapped inside component helper. |
| `Positional param` | `N/A`                | `string`         |       | Required: path for user provided list-item component. This is an attribute on frost-list-item component |
| `Sub Attribute`    | `onCollapse`         | `action closure` |       | callback functions user provided to handle single list item collapsing. This is an attribute on frost-list-item component. |
| `Sub Attribute`    | `onExpand`           | `action closure` |       | callback functions user provided to handle single list item expansion. This is an attribute on frost-list-item component. |
| `Attribute`        | `expansion`          | `hash`           |       | component which handles expansion and collapsing for entire list. This component should be wrapped inside component helper. |
| `Sub Attribute`    | `onExpandAll`        | `action closure` |       | callback functions user provided to handle all list items collapsing. This is an attribute on frost-list-expansion component.|
| `Sub Attribute`    | `onCollapseAll`      | `action closure` |       | callback functions user provided to handle all list items expansion. This is an attribute on frost-list-expansion component. |
| `Attribute`        | `sorting`            | `hash`           |       | component which handles expansion and collapsing for entire list. This component should be wrapped inside component helper. |
| `Sub Attribute`    | `activeSorting`      | `array`          |       | Array that specifies the sort order. eg. [{"direction: "asc/desc", "value": <attr-name>}], This is an attribute on frost-list-expansion component.|
| `Sub Attribute`    | `properties`         | `array`          |       | Array of sortable attributes. eg. [{"label: "foo", "value": "bar"}], This is an attribute on frost-sort component.|
| `Sub Attribute`    | `onSort`             | `action closure` |       | callback functions user provided to handle sorting.  This is an attribute on frost-sort component.|

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
  config=listMixinConfig
}}
```

In controller

```javascript
import Ember from 'ember'
import {FrostListMixin} from 'ember-frost-list'

export default Ember.ClassName.extend(FrostListMixin, {
  listConfig: {
    // path for list item component
    component: 'user-list-component',

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
or sorting component to the list by needs. The list component will render
associated modules based on the components it receives. Note that the APIs on
the component are subject to `frost-sort` and `frost-list-expansion`. It is recommended
to use these two components for most of the use case so that you can take advantage
of the mixin while you still have some level of controls over the component. However, User
do have the ability to replace them with your custom component, but it is your responsibility
to make sure they will work with frost-list.

In template

```handlebars
{{frost-list
  items=sortedItems
  onSelect=(action 'selectItem')
  item=(component 'user-list-item'
    onCollapse=(action 'collapseItem')
    onExpand=(action 'expandItem')
  )
  expansion=(component 'frost-list-expansion'
    onCollapseAll=(action 'collapseItems')
    onExpandAll=(action 'expandItems')
  )
  sorting=(component 'frost-sort'
    sortOrder=activeSorting
    properties=sortableProperties
    onChange=(action 'sortItems')
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
  loadPrevious=(action 'loadPrevious')
}}
```

In controller

```javascript
items: Ember.computed.alias('model'),
actions: {
  loadNext () {
    // data retrieval/backend API call goes here
  },

  loadPrevious () {
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

[ember-img]: https://img.shields.io/badge/ember-2.0.0+-orange.svg "Ember 2.0.0+"

[npm-img]: https://img.shields.io/npm/v/ember-frost-list.svg "NPM Version"
[npm-url]: https://www.npmjs.com/package/ember-frost-list
