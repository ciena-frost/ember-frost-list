/**
 * frost-pagination
 *
 * << < x to y of total > >>
 *
 * Standard pagination control.  Primarily intended for usage
 * with frost-list in a finite (infinite=false) scenario.
 *
 * Usage in frost-list:
 *
 * {{frost-list
 *   pagination=(hash
 *     itemsPerPage=___
 *     page=___
 *     total=___
 *     onChange=(action '___')
 *   )
 * }}
 */

import Ember from 'ember'
const {
  Component
} = Ember
import layout from '../templates/frost-pagination'
import computed, {readOnly} from 'ember-computed-decorators'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Component.extend(PropTypeMixin, {

  // == Dependencies ==========================================================

  // == Properties ============================================================

  propTypes: {
    // Keywords
    classNames: PropTypes.arrayOf(PropTypes.string),
    layout: PropTypes.any,

    // Options
    hook: PropTypes.string.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired

    // State
  },

  getDefaultProps () {
    return {
      // Keywords
      classNames: ['frost-pagination'],
      layout

      // Options
    }
  },

  // == Computed Properties ===================================================

   @readOnly
  @computed('itemsPerPage', 'page', 'total')
  _end: function (itemsPerPage, page, total) {
    const pageMax = (page + 1) * itemsPerPage
    return (total < pageMax) ? total : pageMax
  },

  @readOnly
  @computed('page')
  _isLeftDisabled: function (page) {
    return page === 0
  },

  @readOnly
  @computed('itemsPerPage', 'page', 'total')
  _isRightDisabled: function (itemsPerPage, page, total) {
    return total === 0 ? true : page === Math.floor((total - 1) / itemsPerPage)
  },

  @readOnly
  @computed('itemsPerPage', 'page', 'total')
  _offset: function (itemsPerPage, page, total) {
    return total === 0 ? 0 : page * itemsPerPage + 1
  },

  @readOnly
  @computed('_offset', '_end', 'total')
  _paginationText (_offset, _end, total) {
    return total === 0 ? '0 results found' : `${_offset} to ${_end} of ${total}`
  }

  // == Functions =============================================================

  // == Ember Lifecycle Hooks =================================================

  // == DOM Events ============================================================

  // == Actions ===============================================================

})
