import Ember from 'ember'
const {Mixin, on} = Ember

export default Mixin.create({
  initListSelectionMixin: on('init', function() {
    this.set('selectedItems', Ember.Object.create())
  }),

  updateSelectedItemsHash (selections, attrs) {
    let _selections = selections
    if (attrs.selectDesc.isSelected) {
      if (attrs.selectDesc.isShiftSelect) {
        _.forEach(attrs.records, (record) => {
          _selections.set(record.id, true)
        })
      } else {
        if ((!attrs.selectDesc.isTargetSelectionIndicator && !attrs.selectDesc.isCtrlSelect)) {
          Object.keys(_selections).forEach((key) => {
            _selections.set(key, false)
          })
        }
        _.forEach(attrs.records, (record) => {
          _selections.set(record.id, true)
        })
      }
    } else {
      _.forEach(attrs.records, (record) => {
        _selections.set(record.id, false)
      })
    }
    return _selections
  },

  wrappedRecords: Ember.computed('_listItems.[]', function() {
    let listItems = this.get('_listItems')
    let wrapper = []
    return listItems.map((item) => {
      return wrapper.pushObject(Ember.Object.create({
        id: item.id,
        record: item
      }))
    })
  }),

  mappedRecords: Ember.computed('wrappedRecords.[]', 'selectedItems', 'expandedItems', function() {
    let listItems = this.get('wrappedRecords')
    const selectedItems = this.get('selectedItems')
    const expandedItems = this.get('expandedItems')
    return listItems.map((item) => {
      item.set('isSelected', selectedItems.getWithDefault(item.id, false))
      item.set('isExpanded', expandedItems.getWithDefault(item.id, false))
      return item
    })
  }),

  actions: {
    selectItem (attrs) {
      let selectedItems = this.get('selectedItems')
      this.set('selectedItems', this.updateSelectedItemsHash(selectedItems, attrs))
      this.notifyPropertyChange('selectedItems');
    }
  }

})
