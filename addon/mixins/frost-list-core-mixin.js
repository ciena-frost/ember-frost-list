import Ember from 'ember'
const {
  Mixin,
  get,
  on,
  defineProperty,
  computed: {alias}
} = Ember
import computed from 'ember-computed-decorators'

export default Mixin.create({
  initListCoreMixin: on('init', function () {
    defineProperty(this, '_listItems', alias(get(this, 'listConfig.items')))
  }),

  @computed('_listItems.[]')
  listItems (listItems) {
    let wrapper = []
    return listItems.map((item) => {
      return wrapper.pushObject(Ember.Object.create({
        id: item.id,
        record: item
      }))
    })
  },

  @computed('listItems.[]', 'selectedItemDictionary', 'expandedItems')
  statefulListItems (listItems, selectedItemDictionary, expandedItems) {
    return listItems.map((item) => {
      item.set('isSelected', selectedItemDictionary.getWithDefault(item.id, false))
      item.set('isExpanded', expandedItems.getWithDefault(item.id, false))
      return item
    })
  }
})
