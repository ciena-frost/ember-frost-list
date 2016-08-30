import Ember from 'ember'
import config from '../../config/environment'
import _ from 'lodash'

const {computed} = Ember

export default Ember.Controller.extend({

  itemsInList: Ember.computed('listItems.content.[]', function () {
    return this.get('listItems.content.length')
  }),

  itemsInStore: computed('listItems.content.[]', function () {
    return this.store.peekAll('list-item').content.length
  }),

  isButtonActive: computed('selectedItems.[]', function () {
    let selectedItem = this.get('selectedItems')
    if (!selectedItem.length) {
      return {
        updateButton: true,
        deleteButton: true
      }
    } else {
      return {
        updateButton: false,
        deleteButton: false
      }
    }
  }),

  listItems: computed.alias('model'),

  selectedItems: Ember.A(),
  componentPath: computed({
    get () {
      if (config.isFrostGuideDirectory) {
        return 'user-list-item'
      } else {
        return 'infinite-scroll/user-list-item'
      }
    }
  }),

  actions: {
    selected (attrs) {
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

    updateHandler () {
      let selectedItems = this.get('selectedItems')
      _.each(selectedItems, (item) => {
        item.set('label', 'updated label')
        item.save()
          .then(
            (/* success */) => {
            },
            (/* fail */reason) => {
            }
          )
      })
    },

    deleteHandler () {
      let selectedItems = this.get('selectedItems')
      _.each(selectedItems, (item) => {
        item.destroyRecord().then(
          (/* success */) => {
          },
          (/* fail */) => {
          }
        )
      })
    }
  }
})
