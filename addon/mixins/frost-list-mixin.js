import Ember from 'ember'
const {
  Mixin,
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
      items: this.get('statefulListItems'),
      component: this.get('listConfig.component'),
      expansion: {
        onCollapseAll: this.get('_collapseItems'),
        onExpandAll: this.get('_expandItems')
      },
      selection: {
        onSelect: this.get('_selectItem')
      },
      sorting: {
        activeSorting: this.get('activeSorting'),
        properties: this.get('sortableProperties'),
        onSort: this.get('_sortItems')
      },
      infiniteScroll: {
        loadNext: this.get('_loadNext'),
        loadPrevious: this.get('_loadPrevious')
      }
    }
  })
})
