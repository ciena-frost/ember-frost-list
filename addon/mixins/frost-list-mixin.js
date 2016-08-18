import Ember from 'ember'
const {Mixin, on} = Ember
import FrostListSelectionMixin from 'ember-frost-list/mixins/frost-list-selection-mixin'
import FrostListExpansionMixin from 'ember-frost-list/mixins/frost-list-expansion-mixin'
import FrostListSortingMixin from 'ember-frost-list/mixins/frost-list-sorting-mixin'

//function parseFunction(source) {
//
//}
//
//let newFun = parseFunction(this.actions.selectItem.toString)
//this.actions.selectItem.context = this
//return this.actions.selectItem


export default Mixin.create(FrostListSelectionMixin, FrostListExpansionMixin, FrostListSortingMixin, {
  initListMixin: on('init', function () {
    Ember.defineProperty(this, '_listItems', Ember.computed.alias(this.listConfig.items))


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

  wrapperObj: Ember.computed(function () {
    return Ember.Object.create({
      expansion: {

      },
      selection: {
        onSelect: this._selectItem
      },
      sorting: Ember.Object.create({
        activeSorting: this.activeSorting,
        sortableProperties: this.sortableProperties,
        onSort: this._sortItems
      })
    })
  })
})
