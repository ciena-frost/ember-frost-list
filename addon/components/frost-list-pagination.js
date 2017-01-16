/**
 * frost-list-pagination
 *
 * << < x to y of total > >>
 *
 * Standard pagination control.  Primarily intended for usage
 * with frost-list in a finite (infinite=false) scenario.
 *
 * Usage in frost-list:
 *
 * {{frost-list
 *   pagination=(component 'frost-list-pagination'
 *     itemsPerPage=___
 *     page=___
 *     total=___
 *     onChange=(action '___')
 *   )
 * }}
 */

import computed, {readOnly} from 'ember-computed-decorators'
import {Component} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-list-pagination'

export default Component.extend({

  // == Dependencies ==========================================================

  layout,

  // == Properties ============================================================

  propTypes: {
    // Options
    itemsPerPage: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,

    onChange: PropTypes.func.isRequired
  },

  getDefaultProps () {
    return {
    }
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('itemsPerPage', 'page', 'total')
  _end (itemsPerPage, page, total) {
    const pageMax = (page + 1) * itemsPerPage
    return (total < pageMax) ? total : pageMax
  },

  @readOnly
  @computed('page')
  _isLeftDisabled (page) {
    return page === 0
  },

  @readOnly
  @computed('itemsPerPage', 'page', 'total')
  _isRightDisabled (itemsPerPage, page, total) {
    return total === 0 ? true : page === Math.floor((total - 1) / itemsPerPage)
  },

  @readOnly
  @computed('itemsPerPage', 'page', 'total')
  _offset (itemsPerPage, page, total) {
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
