import Ember from 'ember'
const {
  Mixin,
  get,
  on,
  set
} = Ember
import FrostListSelectionMixin from 'ember-frost-list/mixins/frost-list-selection-mixin'
import FrostListExpansionMixin from 'ember-frost-list/mixins/frost-list-expansion-mixin'
import FrostListSortingMixin from 'ember-frost-list/mixins/frost-list-sorting-mixin'
import createActionClosure from 'ember-frost-list/utils/action-closure'

export default Mixin.create(FrostListSelectionMixin, FrostListExpansionMixin, FrostListSortingMixin, {
  initListMixin: on('init', function () {
    // create closures
    set(this, '_selectItem',
      createActionClosure.call(this, this.actions.selectItem)
    )

    set(this, '_collapseItems',
      createActionClosure.call(this, this.actions.collapseItems)
    )

    set(this, '_expandItems',
      createActionClosure.call(this, this.actions.expandItems)
    )

    set(this, '_collapseItem',
      createActionClosure.call(this, this.actions.collapseItem)
    )

    set(this, '_expandItem',
      createActionClosure.call(this, this.actions.expandItem)
    )

    set(this, '_sortItems',
      createActionClosure.call(this, this.actions.sortItems)
    )

    set(this, '_loadNext',
      createActionClosure.call(this, this.actions.loadNext || function () {})
    )

    set(this, '_loadPrevious',
      createActionClosure.call(this, this.actions.loadPrevious || function () {})
    )
  }),

  listMixinConfig: Ember.computed('activeSorting', 'sortableProperties', 'statefulListItems.[]', function () {
    return {
      items: get(this, 'statefulListItems'),
      component: get(this, 'listConfig.component'),
      expansion: {
        onCollapseAll: get(this, '_collapseItems'),
        onExpandAll: get(this, '_expandItems')
      },
      selection: {
        onSelect: get(this, '_selectItem')
      },
      sorting: {
        activeSorting: get(this, 'activeSorting'),
        properties: get(this, 'sortableProperties'),
        onSort: get(this, '_sortItems')
      },
      infiniteScroll: {
        loadNext: get(this, '_loadNext'),
        loadPrevious: get(this, '_loadPrevious')
      }
    }
  }),
  selectedItems: Ember.computed.filterBy('statefulListItems', 'isSelected', true),
  expandedItems: Ember.computed.filterBy('statefulListItems', 'isExpanded', true)
})
