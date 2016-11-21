import {expect} from 'chai'
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
  run
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
      FrostListSelectionMixin.detect(subject),
      'FrostListSelectionMixin Mixin is present'
    ).to.eql(true)

    expect(
      FrostListExpansionMixin.detect(subject),
      'FrostListExpansionMixin Mixin is present'
    ).to.eql(true)

    expect(
      FrostListSortingMixin.detect(subject),
      'FrostListSortingMixin Mixin is present'
    ).to.eql(true)
  })

  it('sets dependent keys correctly', function () {
    const listMixinConfigDependentKeys = [
      'activeSorting',
      'sortableProperties',
      'statefulListItems.[]'
    ]

    expect(
      subject.listMixinConfig._dependentKeys,
      'Dependent keys are correct for listMixinConfig()'
    ).to.eql(listMixinConfigDependentKeys)
  })

  it('"listMixinConfig" computed property returns correct object structure', function () {
    let list = A()
    list.addObject({
      id: '1',
      isExpanded: false
    })

    const mixinTestObject = Controller.extend(FrostListMixin)
    const mixin = mixinTestObject.create({
      listConfig: {
        items: 'model',
        sorting: {
          active: [],
          properties: []
        }
      },
      initListMixin: on('init', function () {
        this.set('_selectItem', '_selectItem')
        this.set('_collapseItems', '_collapseItems')
        this.set('_expandItems', '_expandItems')
        this.set('_collapseItem', '_collapseItem')
        this.set('_expandItem', '_expandItem')
        this.set('_sortItems', '_sortItems')
        this.set('_loadNext', '_loadNext')
        this.set('_loadPrevious', '_loadPrevious')
      })
    })

    run(() => {
      mixin.set('model', list)
      mixin.set('listConfig.component', 'my-list-item')
      mixin.set('activeSorting', [])
      mixin.set('properties', [])
    })

    const listMixinConfig = mixin.get('listMixinConfig')

    expect(
      listMixinConfig,
      '"items" property exists'
    ).to.have.property('items')

    expect(
      listMixinConfig,
      '"component" property exists'
    ).to.have.property('component', 'my-list-item')

    expect(
      listMixinConfig,
      '"expansion" property exists and has correct structure'
    ).to.have.property('expansion')
      .that.deep.equals({
        onCollapseAll: '_collapseItems',
        onExpandAll: '_expandItems'
      })

    expect(
    listMixinConfig,
    '"selection" propery exists and has correct structure'
    ).to.have.property('selection')
      .that.deep.equals({
        onSelect: '_selectItem'
      })

    expect(
    listMixinConfig,
    '"sorting" propery exists and has correct structure'
    ).to.have.property('sorting')
      .that.deep.equals({
        activeSorting: [],
        properties: [],
        onSort: '_sortItems'
      })

    expect(
    listMixinConfig,
    '"infiniteScroll" propery exists and has correct structure'
    ).to.have.property('infiniteScroll')
      .that.deep.equals({
        loadNext: '_loadNext',
        loadPrevious: '_loadPrevious'
      })
  })
})
