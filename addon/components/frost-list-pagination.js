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
import Ember from 'ember'
import computed, {readOnly} from 'ember-computed-decorators'
import {Component} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-list-pagination'

const {run} = Ember

export default Component.extend({

  // == Dependencies ==========================================================

  layout,

  // == Properties ============================================================
  _pageClickCounter: 0,
  propTypes: {
    // Options
    debounceInterval: PropTypes.number,
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
  },
  @readOnly
  @computed('total', 'itemsPerPage')
  _lastPage (total, itemsPerPage) {
    return Math.floor((total - 1) / itemsPerPage)
  },
  // == Functions =============================================================
  _sendDebounceOnChange (page) {
    this.sendAction('onChange', page)
    this.set('pageClickCounter', 0)
  },
  /* eslint-disable complexity */
  _handleDebouncedOnChange (page, debounceInterval) {
    const currentPage = this.get('page')

    if (Math.abs(currentPage - page) > 1) {
      this._sendDebounceOnChange(page)
    } else {
      const totalPages = this.get('_lastPage')
      let counter = this.get('pageClickCounter') || 0
      currentPage > page ? counter-- : counter++
      this.set('pageClickCounter', counter)
      let newPage = counter ? currentPage + counter : page
      newPage = newPage < 0 ? 0 : newPage
      newPage = newPage > totalPages ? totalPages : newPage

      run.debounce(this, this._sendDebounceOnChange, newPage, debounceInterval)
    }
  },
  // == Ember Lifecycle Hooks =================================================

  // == DOM Events ============================================================

  // == Actions ===============================================================
  actions: {
    _onChange (page) {
      const debounceInterval = this.get('debounceInterval')
      if (debounceInterval) {
        this._handleDebouncedOnChange(page, debounceInterval)
      } else {
        this.sendAction('onChange', page)
      }
    }
  }
})
