import Ember from 'ember';

export default Ember.Controller.extend({
  selectedItems: Ember.A(),

  actions: {
    selected(attrs) {
        if (attrs.isSelected) {
          this.get('selectedItems').addObject(attrs.record);
        } else {
          this.get('selectedItems').removeObject(attrs.record);
        }
      },

      yEndReached() {
        this.notifications.addNotification({
          message: 'Scroll reached end of y axis',
          type: 'success',
          autoClear: true,
          clearDuration: 2000
        });
      }
  }
});