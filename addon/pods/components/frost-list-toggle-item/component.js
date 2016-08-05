import Ember from 'ember';
const {Component, ViewUtils} = Ember
import computed from 'ember-computed-decorators'
import layout from './template'

export default Component.extend({
  classNames: ['frost-list-toggle-item'],
  classNameBinds: ['isActive'],
  layout,

  @computed('shouldExpand', 'showDetail')
  isActive(shouldExpand, showDetail) {
    return shouldExpand === showDetail
  },

  click(e) {
    if (!ViewUtils.isSimpleClick(e)) {
      return true
    }

    e.stopPropagation()
    e.preventDefault()

    e.target.value = this.get('shouldExpand')

    const onClick = this.get('onClick')
    if(onClick && typeof onClick === 'function') onClick(e)
  }
});
