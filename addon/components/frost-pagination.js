import Ember from 'ember'
import layout from '../templates/frost-pagination'
import computed, {readOnly} from 'ember-computed-decorators'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Ember.Component.extend(PropTypeMixin, {
  classNames: ['frost-pagination'],
  layout: layout,

  propTypes: {
    total: PropTypes.number.isRequired
  },

  @readOnly
  @computed('page', 'itemsPerPage', 'total')
  computedOffset: function (page, itemsPerPage, total) {
    if (total === 0) {
      return 0
    }

    return page * itemsPerPage + 1
  },

  @readOnly
  @computed('page', 'itemsPerPage', 'total')
  computedEnd: function (page, itemsPerPage, total) {
    const pageMax = (page + 1) * itemsPerPage
    return (total < pageMax) ? total : pageMax
  },

  @readOnly
  @computed('computedOffset', 'computedEnd', 'total')
  paginationText (computedOffset, computedEnd, total) {
    if (total === 0) {
      return '0 results found'
    }

    return `${computedOffset} to ${computedEnd} of ${total}`
  },

  @readOnly
  @computed('page')
  leftButtonsDisabled: function (page) {
    return page === 0
  },

  @readOnly
  @computed('page', 'itemsPerPage', 'total')
  rightButtonsDisabled: function (page, itemsPerPage, total) {
    if (total === 0) {
      return true
    }

    return page === Math.floor((total - 1) / itemsPerPage)
  },

  actions: {
    _onChange (page) {
      this.onChange(page)
      var scrollbar = Ember.$('.frost-scroll')[0]
      if (scrollbar) {
        scrollbar.scrollTop = 0
        window.Ps.update(scrollbar)
      }
    }
  }

})
