import Ember from 'ember'
import config from '../../config/environment'
import _ from 'lodash'

const {computed} = Ember

export default Ember.Controller.extend({

  // the path of custom list-item component
  componentPath: computed({
    get () {
      if (config.isFrostGuideDirectory) {
        return 'user-list-item'
      } else {
        return 'infinite-scroll/user-list-item'
      }
    }
  }),

  queryParams: {
    querySortOrder: {
      refreshModel: true
    }
  },

  // sort related properties
  querySortOrder: [{value: 'label', direction: 'asc'}],
  sortOrder: ['id:asc'],
  sortAttributes: [
    {
      value: 'label',
      label: 'Label'
    },
    {
      value: 'id',
      label: 'Id'
    }
  ],

  // data model
  listItems: computed.alias('model'),
  sortedItems: Ember.computed.sort('listItems', 'sortOrder'),

  // list item selection
  selectedItems: [],

  actions: {
    selectHandler (attrs) {
      if (attrs.isSelected) {
        if (attrs.isShiftSelect) {
          _.each(attrs.record, (record) => {
            this.get('selectedItems').addObject(record)
          })
        } else {
          if ((!attrs.isTargetSelectionIndicator && !attrs.isCtrlSelect)) this.set('selectedItems', [])
          this.get('selectedItems').addObject(attrs.record)
        }
      } else {
        this.get('selectedItems').removeObject(attrs.record)
      }
    },

    sortHandler(sortItems) {
      console.log('sort handler')
      let temp = []
      sortItems.map(function (item) {
        temp.push({
          value: item.value,
          direction: item.direction
        })
      })
      this.set('sortOrder', sortItems.map(function (sortProperty) {
        return `${sortProperty.value}${sortProperty.direction}`
      }))
      this.set('querySortOrder', temp)
    },

    expandHandler() {

    }
  }
})
