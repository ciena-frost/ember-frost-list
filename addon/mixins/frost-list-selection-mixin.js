import Ember from 'ember'
const {Mixin, on} = Ember
import computed from 'ember-computed-decorators'

export default Mixin.create({
  // == Event =================================================================
  initListSelectionMixin: on('init', function () {
    this.set('selectedItems', Ember.Object.create())
  }),

  // == Functions ==============================================================
  updateSelectedItemsHash (selections, attrs) {
    let _selections = selections
    if (attrs.selectDesc.isSelected) {
      if (attrs.selectDesc.isShiftSelect) {
        attrs.records.forEach((record) => {
          _selections.set(record.id, true)
        })
      } else {
        if ((!attrs.selectDesc.isTargetSelectionIndicator && !attrs.selectDesc.isCtrlSelect)) {
          Object.keys(_selections).forEach((key) => {
            _selections.set(key, false)
          })
        }
        attrs.records.forEach((record) => {
          _selections.set(record.id, true)
        })
      }
    } else {
      attrs.records.forEach((record) => {
        _selections.set(record.id, false)
      })
    }
    return _selections
  },

  // == Computed Properties ====================================================
  @computed('_listItems.[]')
  wrappedRecords (listItems) {
    let wrapper = []
    return listItems.map((item) => {
      return wrapper.pushObject(Ember.Object.create({
        id: item.id,
        record: item
      }))
    })
  },

  @computed('wrappedRecords.[]', 'selectedItems', 'expandedItems')
  mappedRecords (listItems, selectedItems, expandedItems) {
    return listItems.map((item) => {
      item.set('isSelected', selectedItems.getWithDefault(item.id, false))
      item.set('isExpanded', expandedItems.getWithDefault(item.id, false))
      return item
    })
  },

  // == Actions ================================================================
  actions: {
    selectItem (attrs, context) {
      let selectedItems = context.get('selectedItems')
      context.set('selectedItems', context.updateSelectedItemsHash(selectedItems, attrs))
      context.notifyPropertyChange('selectedItems')
    }
  }
})
