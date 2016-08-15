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
    records.map((record) => {
      record.set('isSelected', selections.getWithDefault(record.id, false))
    })
  },

  actions: {
    selectItem (attrs) {
      let selectedItems = this.get('selectedItems')
      this.set('selectedItems', this.updateSelectedItemsHash(selectedItems, attrs))

      let records = this.get('listItems')
      this.mapSelectedItemsToSource(records, selectedItems)
    }
  }
})
