import Ember from 'ember'
const {
  Mixin,
  on
} = Ember
import FrostListSelectionMixin from 'ember-frost-list/mixins/frost-list-selection-mixin'
import FrostListExpansionMixin from 'ember-frost-list/mixins/frost-list-expansion-mixin'
import FrostListSortingMixin from 'ember-frost-list/mixins/frost-list-sorting-mixin'
import createActionClosure from 'ember-frost-list/utils/action-closure'

export default Mixin.create(FrostListSelectionMixin, FrostListExpansionMixin, FrostListSortingMixin, {
  initListMixin: on('init', function () {
    // create closures
    this.set('_selectItem',
      createActionClosure.call(this, this.actions.selectItem)
    )

    this.set('_collapseItems',
      createActionClosure.call(this, this.actions.collapseItems)
    )

    this.set('_expandItems',
      createActionClosure.call(this, this.actions.expandItems)
    )

    this.set('_collapseItem',
      createActionClosure.call(this, this.actions.collapseItem)
    )

    this.set('_expandItem',
      createActionClosure.call(this, this.actions.expandItem)
    )

    this.set('_sortItems',
      createActionClosure.call(this, this.actions.sortItems)
    )

    this.set('_loadNext',
      createActionClosure.call(this, this.actions.loadNext || function () {})
    )

    this.set('_loadPrevious',
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
