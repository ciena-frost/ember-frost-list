import Ember from 'ember'
const {Mixin, on} = Ember
import computed from 'ember-computed-decorators'

export default Mixin.create({
  initListCoreMixin: on('init', function () {
    Ember.defineProperty(this, '_listItems', Ember.computed.alias(this.get('listConfig.items')))
  }),

  @computed('_listItems.[]')
  filteredItems (listItems) {
    return listItems
  },

  @computed('sortedItems.[]')
  listItems (listItems) {
    let wrapper = []
    return listItems.map((item) => {
      return wrapper.pushObject(Ember.Object.create({
        id: item.id,
        record: item
      }))
    })
  },

  @computed('listItems.[]', 'selectedItems', 'expandedItems')
  statefulListItems (listItems, selectedItems, expandedItems) {
    return listItems.map((item) => {
      item.set('isSelected', selectedItems.getWithDefault(item.id, false))
      item.set('isExpanded', expandedItems.getWithDefault(item.id, false))
      return item
    })
  }
})
