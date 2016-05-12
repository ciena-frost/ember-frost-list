import Ember from 'ember'
import config from '../../config/environment'
import _ from 'lodash'

export default Ember.Controller.extend({
  selectedItems: Ember.A(),
  componentPath: Ember.computed({
    get () {
      if (config.isFrostGuideDirectory) {
        return 'user-list-item'
      } else {
        return 'demo/user-list-item'
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
    yEndReached () {
      this.notifications.addNotification({
        message: 'Scroll reached end of y axis',
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    }
  }
})
