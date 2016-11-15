import Ember from 'ember'
const {A} = Ember
import {expect}
from 'chai'
import {
  make,
  manualSetup
} from 'ember-data-factory-guy'
import {
  describeComponent,
  it
}
from 'ember-mocha'
import wait from 'ember-test-helpers/wait'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach} from 'mocha'
import {
  $hook,
  initialize
} from 'ember-hook'

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
      initialize()
    })

    it('renders frost-list-item', function () {
      let list = A()
      list.addObject(make('list-item'))

      this.set('items', list)

      this.render(hbs`
        {{frost-list
          item=(component 'frost-list-item')
          items=items
        }}
      `)

      return wait().then(() => {
        expect(
          this.$('.frost-list'),
          'class "frost-list" is set'
        ).to.have.length(1)

        expect(
          this.$('.vertical-item'),
          'one vertical item is created'
        ).to.have.length(1)

        expect(
          this.$('.frost-list-item'),
          'one list item is created'
        ).to.have.length(1)
      })
    })

    it('renders frost-list-item from "config" property', function () {
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

      return wait().then(() => {
        expect(
          this.$('.frost-list'),
          'class "frost-list" is set'
        ).to.have.length(1)

        expect(
          this.$('.vertical-item'),
          'one vertical item is created'
        ).to.have.length(1)

        expect(
          this.$('.frost-list-item'),
          'one list item is created'
        ).to.have.length(1)
      })
    })

    it('supports pre selection of records', function () {
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

      return wait().then(() => {
        expect(
          this.$($hook('my-list-item-0')).hasClass('is-selected'),
          'pre selected item is selected'
        ).to.be.true

        expect(
          this.$($hook('my-list-item-1')).hasClass('is-selected'),
          'item is not pre selected'
        ).to.be.false

        expect(
          this.$().find('vertical-item'),
          'two vertical items are created'
        ).to.have.length(2)

        expect(
          this.$('.frost-list-item'),
          'two list items are created'
        ).to.have.length(2)
      })
    })
  }
)
