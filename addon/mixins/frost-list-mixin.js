import Ember from 'ember'
const {Mixin, on} = Ember
import FrostListSelectionMixin from 'ember-frost-list/mixins/frost-list-selection-mixin'
import FrostListExpansionMixin from 'ember-frost-list/mixins/frost-list-expansion-mixin'
import FrostListSortingMixin from 'ember-frost-list/mixins/frost-list-sorting-mixin'
import createActionClosure from 'ember-frost-list/utils/action-closure'

export default Mixin.create(FrostListSelectionMixin, FrostListExpansionMixin, FrostListSortingMixin, {
  initListMixin: on('init', function () {
    // create closures
    Ember.defineProperty(this, '_selectItem', undefined,
      createActionClosure.call(this, this.actions.selectItem)
    )

    Ember.defineProperty(this, '_collapseItems', undefined,
      createActionClosure.call(this, this.actions.collapseItems)
    )

    Ember.defineProperty(this, '_expandItems', undefined,
      createActionClosure.call(this, this.actions.expandItems)
    )

    Ember.defineProperty(this, '_collapseItem', undefined,
      createActionClosure.call(this, this.actions.collapseItem)
    )

    Ember.defineProperty(this, '_expandItem', undefined,
      createActionClosure.call(this, this.actions.expandItem)
    )

    Ember.defineProperty(this, '_sortItems', undefined,
      createActionClosure.call(this, this.actions.sortItems)
    )
  }),

  listMixinConfig: Ember.computed('activeSorting', 'sortableProperties', function () {
    let activeSorting = this.get('activeSorting')
    let sortableProperties = this.get('sortableProperties')
    let sortedItems = this.get('sortedItems')
    return {
      _items: sortedItems,
      component: this.get('listConfig.component'),
      expansion: {
        onCollapseAll: this._collapseItems,
        onExpandAll: this._expandItems
      },
      selection: {
        onSelect: this._selectItem
      },
      sorting: {
        activeSorting: activeSorting,
        sortableProperties: sortableProperties,
        onSort: this._sortItems
      }
    }
  })
})
