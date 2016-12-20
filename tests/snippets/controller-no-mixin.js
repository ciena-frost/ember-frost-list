import Ember from 'ember'
const { on } = Ember
import computed from 'ember-computed-decorators'
import {normalizeSort, defaultSort} from 'ember-frost-list/utils/utils'

export default Ember.Controller.extend({

  _listItems: Ember.computed.alias('model'),

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

  @computed('listItems.[]', 'selectedItemDictionary', 'expandedItemDictionary')
  statefulListItems (listItems, selectedItemDictionary, expandedItemDictionary) {
    return listItems.map((item) => {
      item.set('isSelected', selectedItemDictionary.getWithDefault(item.id, false))
      item.set('isExpanded', expandedItemDictionary.getWithDefault(item.id, false))
      return item
    })
  },

  // == Event =================================================================
  initListSelectionMixin: on('init', function () {
    this.set('expandedItemDictionary', Ember.Object.create())
    this.set('selectedItemDictionary', Ember.Object.create())
  }),

  // == Functions ==============================================================
  updateSelectedItemDictionary (selections, attrs) {
    let _selections = selections
    if (attrs.selectDesc.isSelected) {
      if (attrs.selectDesc.isShiftSelect) {
        attrs.records.forEach((record) => {
          _selections.set(record.id, true)
        })
      } else {
        if ((!attrs.selectDesc.isTargetSelectionIndicator &&
          !attrs.selectDesc.isCtrlSelect)) {
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

  sortableProperties: [
    {
      value: 'label',
      label: 'Label'
    },
    {
      value: 'id',
      label: 'Id'
    }
  ],

  activeSorting: [
    {
      value: 'label', direction: ':desc'
    }
  ],

  // == Computed Properties ===================================

  // == Actions ===============================================
  actions: {
    selectItem (attrs) {
      let selectedItemDictionary = this.get('selectedItemDictionary')
      this.set('selectedItemDictionary',
        this.updateSelectedItemDictionary(selectedItemDictionary, attrs))
      this.notifyPropertyChange('selectedItemDictionary')
    },

    collapseItems () {
      let records = this.get('listItems')
      let expandedItemDictionary = this.get('expandedItemDictionary')
      records.map((record) => {
        expandedItemDictionary.set(record.id, false)
      })
      this.notifyPropertyChange('expandedItemDictionary')
    },

    expandItems () {
      let records = this.get('listItems')
      let expandedItemDictionary = this.get('expandedItemDictionary')
      records.map((record) => {
        expandedItemDictionary.set(record.id, true)
      })
      this.notifyPropertyChange('expandedItemDictionary')
    },

    collapseItem () {

    },

    expandItem () {

    },

    sortItems (sortProperties) {
      let filteredSortProperties = sortProperties.map(function (item) {
        return {value: item.value, direction: item.direction}
      })
      let normalizedSortProperties = normalizeSort(filteredSortProperties)
      const dataKey = this.get('listConfig.items')
      this.set(dataKey, defaultSort(this.get(dataKey), normalizedSortProperties))
    }
  }
})
