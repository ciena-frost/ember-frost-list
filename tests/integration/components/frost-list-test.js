import {expect} from 'chai'
const {A} = Ember
import Ember from 'ember'
import {make, manualSetup} from 'ember-data-factory-guy'
import {$hook, hook, initialize as initializeHook} from 'ember-hook'
import wait from 'ember-test-helpers/wait'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach, describe, it} from 'mocha'

import {integration} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'

const test = integration('frost-list',
  {
    setup: function () {
      manualSetup(this.container)
    }
  }
)
describe(test.label, function () {
  test.setup()

  beforeEach(function () {
    initializeHook()
  })

  describe.skip('renders frost-list-item', function () {
    beforeEach(function () {
      let list = A()
      list.addObject(make('list-item'))

      this.set('items', list)

      this.render(hbs`
        {{frost-list
          item=(component 'frost-list-item')
          items=items
        }}
      `)
    })

    it('sets "frost-list" class', function () {
      return wait().then(() => {
        expect(
          this.$('.frost-list')
        ).to.have.length(1)
      })
    })

    it('has one vertical item created', function () {
      return wait().then(() => {
        expect(
          this.$('.vertical-item')
        ).to.have.length(1)
      })
    })

    it('creates one list item', function () {
      return wait().then(() => {
        expect(
          this.$('.frost-list-item')
        ).to.have.length(1)
      })
    })
  })

  describe.skip('renders frost-list-item from "config" property', function () {
    beforeEach(function () {
      let list = A()
      list.addObject(make('list-item'))

      const testConfig = {
        items: list,
        component: 'frost-list-item',
        expansion: {
          onCollapseAll: 'collapseItems',
          onExpandAll: 'expandItems'
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

      this.set('testConfig', testConfig)

      this.render(hbs`
        {{frost-list
          config=testConfig
        }}
      `)
    })

    it('sets "frost-list" class', function () {
      return wait().then(() => {
        expect(
          this.$('.frost-list')
        ).to.have.length(1)
      })
    })

    it('creates one vertical item', function () {
      return wait().then(() => {
        expect(
          this.$('.vertical-item')
        ).to.have.length(1)
      })
    })

    it('creates one list item', function () {
      return wait().then(() => {
        expect(
          this.$('.frost-list-item')
        ).to.have.length(1)
      })
    })
  })

  describe('Supports pre selection with default itemComparator', function () {
    beforeEach(function () {
      const one = Ember.Object.create({isNotCompared: '0'})
      const two = Ember.Object.create({isNotCompared: '1'})
      const testItems = [one, two]
      const testSelectedItems = [one]
      this.set('items', testItems)
      this.set('selectedItems', testSelectedItems)
      this.render(hbs`
        {{frost-list
          item=(component 'frost-list-item')
          hook='my-list'
          items=items
          selectedItems=selectedItems
        }}
      `)
      return wait()
    })

    it('item 0 is selected', function () {
      expect($hook('my-list-item-container', {index: 0}).hasClass('is-selected')).to.eql(true)
    })

    it('item 1 is not selected', function () {
      expect($hook('my-list-item-container', {index: 1}).hasClass('is-selected')).to.eql(false)
    })
  })

  describe('Supports pre selection with custom itemComparator', function () {
    beforeEach(function () {
      const testItems = [
        Ember.Object.create({id: '0'}),
        Ember.Object.create({id: '1'})
      ]
      const testSelectedItems = [
        Ember.Object.create({id: '0'})
      ]

      this.set('items', testItems)
      this.set('selectedItems', testSelectedItems)
      this.set('itemComparator', (lhs, rhs) => {
        return lhs.get('id') === rhs.get('id')
      })
      this.render(hbs`
        {{frost-list
          item=(component 'frost-list-item')
          hook='my-list'
          items=items
          selectedItems=selectedItems
          itemComparator=itemComparator
        }}
      `)
      return wait()
    })

    it('item 0 is selected', function () {
      expect($hook('my-list-item-container', {index: 0}).hasClass('is-selected')).to.eql(true)
    })
    it('item 1 is not selected', function () {
      expect($hook('my-list-item-container', {index: 1}).hasClass('is-selected')).to.eql(false)
    })

    describe('When itemComparator is set back to default', function () {
      beforeEach(function () {
        this.render(hbs`
        {{frost-list
          item=(component 'frost-list-item')
          hook='my-list'
          items=items
          selectedItems=selectedItems
        }}
      `)
        return wait()
      })
      it('item 0 not selected ', function () {
        expect($hook('my-list-item-container', {index: 0}).hasClass('is-selected')).to.eql(false)
      })
      it('item 1 not selected', function () {
        expect($hook('my-list-item-container', {index: 1}).hasClass('is-selected')).to.eql(false)
      })
    })
  })

  describe('Supports basic and specific click', function () {
    beforeEach(function () {
      const testItems = A([
        Ember.Object.create({id: '0'}),
        Ember.Object.create({id: '1'})
      ])

      this.set('items', testItems)
      const testSelectedItems = A([])
      this.set('selectedItems', testSelectedItems)
      this.set('onSelectionChange', (selectedItems) => {
        this.get('selectedItems').setObjects(selectedItems)
      })

      this.render(hbs`
        {{frost-list
          item=(component 'frost-list-item')
          hook='my-list'
          items=items
          selectedItems=selectedItems
          onSelectionChange=onSelectionChange
        }}
      `)
      return wait()
    })

    describe('When using basic click', function () {
      beforeEach(function () {
        $(hook('my-list-item', {index: 0})).click()
        return wait()
      })

      it('item 0 is selected', function () {
        expect($hook('my-list-item-container', {index: 0}).hasClass('is-selected')).to.eql(true)
      })

      it('item 1 is not selected', function () {
        expect($hook('my-list-item-container', {index: 1}).hasClass('is-selected')).to.eql(false)
      })

      describe('When using basic click on previous selected item', function () {
        beforeEach(function () {
          $(hook('my-list-item', {index: 0})).click()
          return wait()
        })

        it('item 0 is not selected', function () {
          expect($hook('my-list-item-container', {index: 0}).hasClass('is-selected')).to.eql(false)
        })

        it('item 1 is not selected', function () {
          expect($hook('my-list-item-container', {index: 1}).hasClass('is-selected')).to.eql(false)
        })
      })
    })

    describe('When using basic click and all is selected', function () {
      beforeEach(function () {
        $(hook('my-list-selection', {index: 0})).click()
        $(hook('my-list-selection', {index: 1})).click()
        $(hook('my-list-item', {index: 0})).click()
        return wait()
      })

      it('item 0 is selected', function () {
        expect($hook('my-list-item-container', {index: 0}).hasClass('is-selected')).to.eql(true)
      })

      it('item 1 is not selected', function () {
        expect($hook('my-list-item-container', {index: 1}).hasClass('is-selected')).to.eql(false)
      })
    })

    describe('When using specific click on one item', function () {
      beforeEach(function () {
        $hook('my-list-selection', {index: 0}).click()
        return wait()
      })

      it('item 0 is selected', function () {
        expect($hook('my-list-item-container', {index: 0}).hasClass('is-selected')).to.eql(true)
      })
      it('item 1 is not selected', function () {
        expect($hook('my-list-item-container', {index: 1}).hasClass('is-selected')).to.eql(false)
      })

      describe('When using specific click to unselect previous item', function () {
        beforeEach(function () {
          $hook('my-list-selection', {index: 0}).click()
          return wait()
        })

        it('item 0 is not selected', function () {
          expect($($hook('my-list-item-container', {index: 0})).hasClass('is-selected')).to.eql(false)
        })
        it('item 1 is not selected', function () {
          expect($($hook('my-list-item-container', {index: 1})).hasClass('is-selected')).to.eql(false)
        })
      })
    })

    describe('When using specific click on each item', function () {
      beforeEach(function () {
        $hook('my-list-selection', {index: 0}).click()
        $hook('my-list-selection', {index: 1}).click()
        return wait()
      })

      it('item 0 is selected', function () {
        expect($hook('my-list-item-container', {index: 0}).hasClass('is-selected')).to.eql(true)
      })
      it('item 1 is selected', function () {
        expect($hook('my-list-item-container', {index: 1}).hasClass('is-selected')).to.eql(true)
      })

      describe('When using specific click to unselect each items', function () {
        beforeEach(function () {
          $hook('my-list-selection', {index: 0}).click()
          $hook('my-list-selection', {index: 1}).click()
          return wait()
        })

        it('item 0 is not selected', function () {
          expect($hook('my-list-item-container', {index: 0}).hasClass('is-selected')).to.eql(false)
        })

        it('item 1 is not selected', function () {
          expect($hook('my-list-item-container', {index: 1}).hasClass('is-selected')).to.eql(false)
        })
      })
    })
  })

  describe('Supports ranged based clicks', function () {
    beforeEach(function () {
      const testItems = A([
        Ember.Object.create({id: '0'}),
        Ember.Object.create({id: '1'}),
        Ember.Object.create({id: '2'}),
        Ember.Object.create({id: '3'}),
        Ember.Object.create({id: '4'}),
        Ember.Object.create({id: '5'}),
        Ember.Object.create({id: '6'})
      ])

      this.set('items', testItems)
      const testSelectedItems = A([])
      this.set('selectedItems', testSelectedItems)
      this.set('onSelectionChange', (selectedItems) => {
        this.get('selectedItems').setObjects(selectedItems)
      })
      this.render(hbs`
        {{frost-list
          item=(component 'frost-list-item')
          hook='my-list'
          items=items
          selectedItems=selectedItems
          onSelectionChange=onSelectionChange
        }}
      `)
      return wait()
    })

    describe('When using shift click from item1-5', function () {
      beforeEach(function () {
        const clickEvent = $.Event('click')
        clickEvent.shiftKey = true
        const clickEvent2 = $.Event('click')
        clickEvent2.shiftKey = true
        $(hook('my-list-item', {index: 1})).trigger(clickEvent)
        $(hook('my-list-item', {index: 5})).trigger(clickEvent2)
        return wait()
      })

      it('item 0 is not selected', function () {
        expect($hook('my-list-item-container', {index: 0}).hasClass('is-selected')).to.eql(false)
      })
      it('item 1 is selected', function () {
        expect($hook('my-list-item-container', {index: 1}).hasClass('is-selected')).to.eql(true)
      })
      it('item 2 is selected', function () {
        expect($hook('my-list-item-container', {index: 2}).hasClass('is-selected')).to.eql(true)
      })
      it('item 3 is selected', function () {
        expect($hook('my-list-item-container', {index: 3}).hasClass('is-selected')).to.eql(true)
      })
      it('item 4 is selected', function () {
        expect($hook('my-list-item-container', {index: 4}).hasClass('is-selected')).to.eql(true)
      })
      it('item 5 is selected', function () {
        expect($hook('my-list-item-container', {index: 5}).hasClass('is-selected')).to.eql(true)
      })
      it('item 6 is not selected', function () {
        expect($hook('my-list-item-container', {index: 6}).hasClass('is-selected')).to.eql(false)
      })
    })

    describe('When using custom itemComparator', function () {
      beforeEach(function () {
        this.set('itemComparator', (lhs, rhs) => {
          return lhs.get('id') === rhs.get('id')
        })
        this.render(hbs`
        {{frost-list
          item=(component 'frost-list-item')
          hook='my-list'
          items=items
          selectedItems=selectedItems
          onSelectionChange=onSelectionChange
          itemComparator=itemComparator
        }}
      `)
        return wait()
      })

      describe('When using shift click from item1-5', function () {
        beforeEach(function () {
          const clickEvent = $.Event('click')
          clickEvent.shiftKey = true
          const clickEvent2 = $.Event('click')
          clickEvent2.shiftKey = true
          $(hook('my-list-item', {index: 1})).trigger(clickEvent)
          $(hook('my-list-item', {index: 5})).trigger(clickEvent2)
          return wait()
        })

        it('item 0 is not selected', function () {
          expect($hook('my-list-item-container', {index: 0}).hasClass('is-selected')).to.eql(false)
        })
        it('item 1 is selected', function () {
          expect($hook('my-list-item-container', {index: 1}).hasClass('is-selected')).to.eql(true)
        })
        it('item 2 is selected', function () {
          expect($hook('my-list-item-container', {index: 2}).hasClass('is-selected')).to.eql(true)
        })
        it('item 3 is selected', function () {
          expect($hook('my-list-item-container', {index: 3}).hasClass('is-selected')).to.eql(true)
        })
        it('item 4 is selected', function () {
          expect($hook('my-list-item-container', {index: 4}).hasClass('is-selected')).to.eql(true)
        })
        it('item 5 is selected', function () {
          expect($hook('my-list-item-container', {index: 5}).hasClass('is-selected')).to.eql(true)
        })
        it('item 6 is not selected', function () {
          expect($hook('my-list-item-container', {index: 6}).hasClass('is-selected')).to.eql(false)
        })
      })
    })
  })
  describe('Supports item expansion', function () {
    beforeEach(function () {
      const testItems = A([
        Ember.Object.create({id: '0'}),
        Ember.Object.create({id: '1'})
      ])
      this.set('items', testItems)
      this.set('selectedItems', A([]))
      this.set('expandedItems', A([]))
      this.set('onSelectionChange', (selectedItems) => {
        this.get('selectedItems').setObjects(selectedItems)
      })
      this.set('onExpansionChange', (expandedItems) => {
        this.get('expandedItems').setObjects(expandedItems)
      })
      this.render(hbs`
        {{frost-list
          item=(component 'frost-list-item')
          itemExpansion=(component 'frost-list-item')
          hook='my-list'
          items=items
          selectedItems=selectedItems
          onSelectionChange=onSelectionChange
          onExpansionChange=onExpansionChange
          expandedItems=expandedItems
        }}
      `)
      return wait()
    })

    describe('clicking item 0 expansion button', function () {
      beforeEach(function () {
        $hook('my-list-expansion', {index: 0}).click()
        return wait()
      })

      it('item 0 is expanded', function () {
        expect($hook('my-list-item-expansion', {index: 0})).to.have.length(1)
      })

      describe('clicking item 0 expansion button', function () {
        beforeEach(function () {
          $hook('my-list-expansion', {index: 0}).click()
          return wait()
        })
        it('item 0 is not expanded', function () {
          expect($hook('my-list-item-expansion', {index: 0})).to.have.length(0)
        })
      })
    })
  })
})
