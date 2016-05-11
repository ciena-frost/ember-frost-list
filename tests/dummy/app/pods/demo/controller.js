import Ember from 'ember'
import config from '../../config/environment'

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
      if(attrs.isSelected) {
        if(!attrs.isTargetSelectionIndicator) this.set('selectedItems', []);
        this.get('selectedItems').addObject(attrs.record)
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
