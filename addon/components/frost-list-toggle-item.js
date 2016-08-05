import Ember from 'ember'
const {Component, ViewUtils} = Ember
import computed from 'ember-computed-decorators'
import layout from '../templates/frost-list-toggle-item'

export default Component.extend({
  classNames: ['frost-list-toggle-item'],
  classNameBinds: ['active'],
  layout,

  //  currently not used
  @computed('shouldExpand', 'showDetail')
  active (shouldExpand, showDetail) {
    return shouldExpand === showDetail
  },

  click (e) {
    if (!ViewUtils.isSimpleClick(e)) {
      return true
    }

    e.stopPropagation()
    e.preventDefault()

    e.target.value = this.get('shouldExpand')

    const onClick = this.get('onClick')
    if (onClick && typeof onClick === 'function') onClick(e)
  }
})
