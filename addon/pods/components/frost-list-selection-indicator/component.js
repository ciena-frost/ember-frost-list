import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['frost-list-selection-indicator'],
  classNameBindings: ['isSelected:selected']
});
