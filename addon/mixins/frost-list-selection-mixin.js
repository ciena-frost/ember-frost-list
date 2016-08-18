import Ember from 'ember'
const {Mixin, on} = Ember

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

  // == Actions ================================================================
  actions: {
    selectItem (attrs) {
      let selectedItems = this.get('selectedItems')
      this.set('selectedItems', this.updateSelectedItemsHash(selectedItems, attrs))
      this.notifyPropertyChange('selectedItems')
    }
  }
})
