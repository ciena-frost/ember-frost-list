import Ember from 'ember'
const {Mixin} = Ember

export default Mixin.create({
  init () {
    this._super(...arguments)
    this.set('selectedItems', Ember.Object.create())
  },

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

  mapSelectedItemsToSource (records, selections) {
    //records.map((record) => {
    //  record.set('isSelected', selections.getWithDefault(record.id, false))
    //})
  },

  //mappedRecords: Ember.computed('listItems.[]', 'selectedItems', 'expandedItems', 'hello', function() {
  //  debugger;
  //  let listItems = this.get('listItems')
  //  let selectedItems = this.get('selectedItems')
  //  let expandedItems = this.get('expandedItems')
  //  return listItems.map((item) => {
  //    let newItem = Ember.assign(Ember.Object.create(), item)
  //    newItem.set('isSelected', selectedItems.getWithDefault(newItem.id, false))
  //    newItem.set('isExpanded', expandedItems.getWithDefault(newItem.id, false))
  //    return newItem
  //  })
  //}),


  wrappedRecords: Ember.computed('listItems.[]', function() {
    let listItems = this.get('listItems')
    let wrapper = []
    return listItems.map((item) => {
      return wrapper.pushObject(Ember.Object.create({
        id: item.id,
        record: item
      }))
    })
  }),

  mappedRecords: Ember.computed('wrappedRecords', 'selectedItems', 'expandedItems', 'hello', function() {
    let listItems = this.get('wrappedRecords')
    const selectedItems = this.get('selectedItems')
    const expandedItems = this.get('expandedItems')
    return listItems.map((item) => {
      item.set('isSelected', selectedItems.getWithDefault(item.id, false))
      item.set('isExpanded', expandedItems.getWithDefault(item.id, false))
      return item
    })
  }),

  hello: false,

  actions: {
    selectItem (attrs) {
      let selectedItems = this.get('selectedItems')
      this.toggleProperty('hello')
      this.set('selectedItems', this.updateSelectedItemsHash(selectedItems, attrs))
      //let records = this.get('listItems')
      //this.mapSelectedItemsToSource(records, selectedItems)
    }
  }

})
