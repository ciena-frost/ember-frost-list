import Ember from 'ember'
const {Mixin, on} = Ember
import FrostListSelectionMixin from 'ember-frost-list/mixins/frost-list-selection-mixin'
import FrostListExpansionMixin from 'ember-frost-list/mixins/frost-list-expansion-mixin'
import FrostListSortingMixin from 'ember-frost-list/mixins/frost-list-sorting-mixin'

function createClosureAction (func) {
  func.context = this
  return func
}

export default Mixin.create(FrostListSelectionMixin, FrostListExpansionMixin, FrostListSortingMixin, {
  initListMixin: on('init', function () {
    Ember.defineProperty(this, '_listItems', Ember.computed.alias(this.listConfig.items))

    // create closures
    Ember.defineProperty(this, '_selectItem', undefined,
      (function () {
        this.actions.selectItem.context = this
        return this.actions.selectItem
        //return (attrs) => {
        //  let selectedItems = this.get('selectedItems')
        //  this.set('selectedItems', this.updateSelectedItemsHash(selectedItems, attrs))
        //  this.notifyPropertyChange('selectedItems')
        //}
      }).call(this)
    )

    Ember.defineProperty(this, '_collapseItems', undefined,
      createClosureAction.call(this, this.actions.collapseItems)
    )

    Ember.defineProperty(this, '_expandItems', undefined,
      createClosureAction.call(this, this.actions.expandItems)
    )

    Ember.defineProperty(this, '_collapseItem', undefined,
      createClosureAction.call(this, this.actions.collapseItem)
    )

    Ember.defineProperty(this, '_expandItem', undefined,
      createClosureAction.call(this, this.actions.expandItem)
    )

    Ember.defineProperty(this, '_sortItems', undefined,
      (function () {
        return (sortItems) => {
          let activeSorting = sortItems.map(function (item) {
            return {value: item.value, direction: item.direction}
          })
          this.set('activeSorting', activeSorting)
        }
      }).call(this)
    )
  }),

  wrapperObj: Ember.computed('activeSorting', 'sortableProperties', function () {
    let activeSorting = this.get('activeSorting')
    let sortableProperties = this.get('sortableProperties')
    return {
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
