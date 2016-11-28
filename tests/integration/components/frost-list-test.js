import Ember from 'ember'
const { A } = Ember
import { expect } from 'chai'
import { make, manualSetup } from 'ember-data-factory-guy'
import { describeComponent, it }
from 'ember-mocha'
import wait from 'ember-test-helpers/wait'
import hbs from 'htmlbars-inline-precompile'
import { beforeEach, describe } from 'mocha'
import { $hook, initialize as initializeHook } from 'ember-hook'

describeComponent(
  'frost-list',
  'Integration: FrostListComponent',
  {
    integration: true,
    setup: function () {
      manualSetup(this.container)
    }
  },
  function () {
    beforeEach(function () {
      initializeHook()
    })

    describe('renders frost-list-item', function () {
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
            this.$('.frost-list'),
          ).to.have.length(1)
        })
      })

      it('has one vertical item created', function () {
        return wait().then(() => {
          expect(
            this.$('.vertical-item'),
          ).to.have.length(1)
        })
      })

      it('creates one list item', function () {
        return wait().then(() => {
          expect(
            this.$('.frost-list-item'),
          ).to.have.length(1)
        })
      })
    })

    describe('renders frost-list-item from "config" property', function () {
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
            this.$('.frost-list'),
          ).to.have.length(1)
        })
      })

      it('creates one vertical item', function () {
        return wait().then(() => {
          expect(
            this.$('.vertical-item'),
          ).to.have.length(1)
        })
      })

      it('creates one list item', function () {
        return wait().then(() => {
          expect(
            this.$('.frost-list-item'),
          ).to.have.length(1)
        })
      })
    })

    describe('supports pre selection of records', function () {
      beforeEach(function () {
        const testItems = A([
          {
            id: '1',
            isSelected: true
          },
          {
            id: '2',
            isSelected: false
          }
        ])

        this.set('items', testItems)

        this.render(hbs`
          {{frost-list
            item=(component 'frost-list-item')
            hook='my-list'
            items=items
          }}
        `)
      })

      it('selects pre selected item', function () {
        return wait().then(() => {
          expect(
            this.$($hook('my-list-item-0')).hasClass('is-selected'),
          ).to.eql(true)
        })
      })

      it('does NOT selecte pre selected item', function () {
        return wait().then(() => {
          expect(
            this.$($hook('my-list-item-1')).hasClass('is-selected'),
          ).to.eql(false)
        })
      })

      it('creates two vertical items', function () {
        return wait().then(() => {
          expect(
            this.$().find('vertical-item'),
          ).to.have.length(2)
        })
      })

      it('creates two list items', function () {
        return wait().then(() => {
          expect(
            this.$('.frost-list-item'),
          ).to.have.length(2)
        })
      })
    })
  }
)
