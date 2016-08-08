[ci-img]: https://travis-ci.org/ciena-frost/ember-frost-list.svg "Build Status"
[ci-url]: https://travis-ci.org/ciena-frost/ember-frost-list
 
[cov-img]: https://coveralls.io/repos/github/ciena-frost/ember-frost-list/badge.svg?branch=master "Code Coverage"
[cov-url]: https://coveralls.io/github/ciena-frost/ember-frost-list
 
[npm-img]: https://img.shields.io/npm/v/ember-frost-list.svg "NPM Version"
[npm-url]: https://www.npmjs.com/package/ember-frost-list

[![Travis][ci-img]][ci-url] [![Coveralls][cov-img]][cov-url] [![NPM][npm-img]][npm-url]
 
# ember-frost-list
`ember-frost-list` is an ember addon that built on top of [smoke-and-miror](https://github.com/runspired/smoke-and-mirrors) which focuses on high performance list rendering. This component itself provides features such as list selection control, infinite scroll and list sorting. Consumer can take advantage of these features with simply providing the corresponding actions/functions 
 
 * [Installation](#Installation)
 * [API](#API)
 * [Examples](#Examples)
 * [Contributing](#Contributing)

## Installation
```
ember install ember-frost-list
```

## API

## Basic usage
| parameters type | Attribute | Type | Value | Description |
|---------| --------- | ---- | ----- | ----------- |
| `Positional param` | `N/A` | `string` | | path for user provided list-item component which describes each row/item in the list|
| `Attribute` | `records` | `array` | | data model used for rendering list |
| `Attribute` | `selections` | `array` | | array of currently selected items in list |
| `Attribute` | `defaultHeight` | `number` | | default height for each list item, set to 45px if not provided |
| `Attribute` | `onSelect` | `<action-name>` | | triggers associated user action when item in list gets selected |

### Infinite scroll
| parameters type | Attribute | Type | Description |
|---------| --------- | ---- | ----------- |
| `Attribute` | `loadPrevious` | `<action-name>` | triggers associated user action when scroll reaches upper boundary |
| `Attribute` | `loadNext` | `<action-name>` | triggers associated user action when scroll reaches lower boundary |

## Examples
### Basic list
In order to follow the data down action up patten, `ember-frost-list` holds no state or information of current selected list items. When an item selection event emits, The user provided actions will be called and attrs will be provided to consumer as first param of the function with all useful information that describe the current select event

In template
```handlebars
{{frost-list
  componentPath
  records=listItems
  selections=selectedItems
  onSelect=(action 'selected')
}}
```
In controller
```javascript
componentPath: 'user-list-item',
listItems: Ember.computed.alias('model'),
selectedItems: [],
actions: {
  selected (attrs) {
    if (attrs.isSelected) {
      if (attrs.isShiftSelect) {
        _.each(attrs.record, (record) => {
          this.get('selectedItems').addObject(record)
        })
      } else {
        if ((!attrs.isTargetSelectionIndicator && !attrs.isCtrlSelect)) this.set('selectedItems', [])
        this.get('selectedItems').addObject(attrs.record)
      }
    } else {
      this.get('selectedItems').removeObject(attrs.record)
    }
  }
}
```

### Infinite scroll
Implementing infinite scroll is straightforward. When scroll bar hits either upper boundary or lower boundary, loadPrevious/loadNext event will be emitted and consumer actions/functions will be called if provided.

In template
```handlebars
{{frost-list
  componentPath
  records=listItems
  selections=selectedItems
  loadPrevious=(action 'loadPrevious')
  loadNext=(action 'loadNext')
  onSelect=(action 'selected')
}}
```
In controller
```javascript
componentPath: 'user-list-item',
listItems: Ember.computed.alias('model'),
selectedItems: [],
actions: {
  _loadNext () {
    // data retrieval/backend API call goes here
  },

  _loadPrevious () {
    // data retrieval/backend API call goes here
  },
}
```

### integrated with sort and list item expansion/collapse control
`ember-frost-list` uses `ember-block-slots` for multiple section yielding. A hash/object will be yielded back to the consumer which contains two contextual components named expansion and sort. The first is used for list item expand/collapse control and the second is obvious used for list sorting. Take a look at [ember-block-slots](https://github.com/ciena-blueplanet/ember-block-slots) and [ember-frost-sort](https://github.com/ciena-frost/ember-frost-sort) for detail usage.
```handlebars
{{#frost-list
componentPath
records=sortedItems
selections=selectedItems
onSelect=(action 'selectHandler')
}}
  {{#block-slot 'header' as |control|}}
    {{control.sort sortableProperties=sortAttributes sortParams=querySortOrder onChange=(action 'sortHandler')}}
    {{control.expansion}}
  {{/block-slot}}
{{/frost-list}}
```

## Development
### Setup
```
git clone git@github.com:ciena-frost/ember-frost-list.git
cd ember-frost-list
npm install && bower install
```

### Development Server
A dummy application for development is available under `ember-frost-list/tests/dummy`.
To run the server run `ember server` (or `npm start`) from the root of the repository and
visit the app at http://localhost:4200.

### Testing
Run `npm test` from the root of the project to run linting checks as well as execute the test suite
and output code coverage.

