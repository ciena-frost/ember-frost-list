import Ember from 'ember'
const {
  Mixin,
  get,
  on,
  defineProperty,
  computed: {alias},
  isNone
} = Ember
import computed from 'ember-computed-decorators'

export default Mixin.create({
  initListCoreMixin: on('init', function () {
    defineProperty(this, '_listItems', alias(get(this, 'listConfig.items')))
  }),

  @computed('_listItems.[]')
  wrappedListItems (listItems) {
    if (isNone(listItems)) {
      listItems = []
    }
    let wrapper = []
    return listItems.map((item) => {
      return wrapper.pushObject(Ember.Object.create({
        id: item.id,
        record: item
      }))
    })
  },

  @computed('wrappedListItems.[]', 'selectedItemDictionary', 'expandedItemDictionary')
  statefulListItems (listItems, selectedItemDictionary, expandedItemDictionary) {
    return listItems.map((item) => {
      item.set('isSelected', selectedItemDictionary.getWithDefault(item.id, false))
      item.set('isExpanded', expandedItemDictionary.getWithDefault(item.id, false))
      return item
    })
  }
})
