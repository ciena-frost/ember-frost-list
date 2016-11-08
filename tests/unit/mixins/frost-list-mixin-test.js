import { expect } from 'chai'
import {
  beforeEach,
  describe,
  it
} from 'mocha'
import Ember from 'ember'
const {
  A,
  Controller,
  on,
  run,
  set
} = Ember
import FrostListMixin from 'ember-frost-list/mixins/frost-list-mixin'
import FrostListSelectionMixin from 'ember-frost-list/mixins/frost-list-selection-mixin'
import FrostListExpansionMixin from 'ember-frost-list/mixins/frost-list-expansion-mixin'
import FrostListSortingMixin from 'ember-frost-list/mixins/frost-list-sorting-mixin'

describe('Unit: FrostListMixin', function () {
  const testItems = [
    {
      id: '1'
    }
  ]
  let subject

  beforeEach(function () {
    let testObject = Controller.extend(FrostListMixin)
    subject = testObject.create({
      listConfig: {
        items: 'model'
      }
      // initListMixin: Ember.on('init', function () {
      //   _selectItem: '_selectItem',
      //   _collapseItems: '_collapseItems',
      //   _expandItems : '_expandItems',
      //   _collapseItem: '_collapseItem',
      //   _expandItem: '_expandItem',
      //   _sortItems: '_sortItems',
      //   _loadNext: '_loadNext',
      //   _loadPrevious: '_loadPrevious'
      // })
    })

    run(() => subject.set('model', testItems))
  })

  it('successfully mixed', function () {
    expect(
      subject
    ).to.be.ok
  })

  it('has the expected Mixins', function () {
    expect(
      FrostListMixin.detect(subject),
      'FrostListMixin Mixin is present'
    ).to.be.true

    expect(
      FrostListSelectionMixin.detect(subject),
      'FrostListSelectionMixin Mixin is present'
    ).to.be.true

    expect(
      FrostListExpansionMixin.detect(subject),
      'FrostListExpansionMixin Mixin is present'
    ).to.be.true

    expect(
      FrostListSortingMixin.detect(subject),
      'FrostListSortingMixin Mixin is present'
    ).to.be.true
  })

  it('sets dependent keys correctly', function () {
    const listMixinConfigDependentKeys = [
      'activeSorting',
      'sortableProperties',
      'sortedItems.[]'
    ]

    expect(
      subject.listMixinConfig._dependentKeys,
      'Dependent keys are correct for listMixinConfig()'
    ).to.eql(listMixinConfigDependentKeys)
  })

  it('"listMixinConfig" computed property is returning what we expect', function () {
    let list = A()
    list.addObject({
      id: '1',
      isExpanded: 'false'
    })

    const testObject = {
      items: list,
      component: 'examples/user-list-item',
      expansion: {
        onCollapseAll: '_collapseItems',
        onExpandAll: '_expandItems'
      },
      selection: {
        onSelect: 'selectItem'
      },
      sorting: {
        activeSorting: [],
        properties: [],
        onSort: 'sortItems'
      },
      infiniteScroll: {
        loadNext: 'loadNext',
        loadPrevious: 'loadPrevious'
      }
    }

    run(() => {
      subject.set('listConfig.component', 'examples/user-list-item')
      subject.set('initListMixin',
        on('init', function () {
          set(this, '_selectItem', '_selectItem')
          set(this, '_collapseItems', '_collapseItems')
          set(this, '_expandItems', '_expandItems')
          set(this, '_collapseItem', '_collapseItem')
          set(this, '_expandItem', '_expandItem')
          set(this, '_sortItems', '_sortItems')
          set(this, '_loadNext', '_loadNext')
          set(this, '_loadPrevious', '_loadPrevious')
        })
      )
    })

    console.log("listMixinConfig(): ", subject.get('listMixinConfig'))
    console.log("testObject: ", testObject)
    expect(
      subject.get('listMixinConfig'),
      ''
    ).to.eql(testObject)
  })
})
