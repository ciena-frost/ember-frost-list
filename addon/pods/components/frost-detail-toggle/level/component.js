import Ember from 'ember';
import _ from 'lodash/lodash';

export default Ember.Component.extend({
  classNames: ['level'],

  computedClassNames: Ember.computed('isActive', function () {
    if (this.get('isActive')) {
      return 'active icon';
    }
    return 'icon';
  }),

  isActive: Ember.computed('activeDetailLevel', function () {
    return this.get('detailLevel') === this.get('activeDetailLevel');
  }),

  svgPath: Ember.computed(function () {
    return `frost/list-${this.get('detailLevel')}`;
  }),

  actions: {
    activateDetailLevel() {
      if (_.isFunction(this.attrs['on-change'])) {
        this.attrs['on-change']({
          value: this.get('detailLevel')
        });
      }
    }
  }
});
