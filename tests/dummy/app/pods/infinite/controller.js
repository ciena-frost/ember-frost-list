/**
 * TODO
 */

import Ember from 'ember'
const {A, Controller, inject, isEmpty} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {sort} from 'ember-frost-sort'

export default Controller.extend({

  // == Dependencies ==========================================================

  notifications: inject.service('notification-messages'),

  // == Properties ============================================================
  debug: false,
  expandedItems: A([]),
  itemsPerPage: 100,
  lastPage: 0,
  selectedItems: A([]),
  sortOrder: A(['id']),
  sortingProperties: [
    {label: 'Id', value: 'id'},
    {label: 'Label', value: 'label'}
  ],

  // == Computed Properties ===================================================

  @readOnly
  @computed('model.[]', 'sortOrder.[]')
  items (model, sortOrder) {
    if (isEmpty(model)) {
      return []
    }
    return sort(model, sortOrder) // Client side sorting
  },

  // == Functions =============================================================

  fetchPage (page) {
    this.get('notifications').success(`Fetching page ${page}`, {
      autoClear: true,
      clearDuration: 2000
    })
    this.store.query('list-item', {
      pageSize: this.get('itemsPerPage'),
      start: (page * this.get('itemsPerPage'))
    }).then(() => {
      this.set('model', this.store.peekAll('list-item'))
    })
  },

  // == Lifecycle Hooks =======================================================

  // == Actions ===============================================================

  actions: {
    onExpansionChange (expandedItems) {
      this.get('expandedItems').setObjects(expandedItems)
    },

    onLoadNext (page) {
      this.set('lastPage', this.get('lastPage') + 1)
      this.fetchPage(this.get('lastPage'))
    },

    onSelectionChange (selectedItems) {
      this.get('selectedItems').setObjects(selectedItems)
    },

    onSortingChange (sortOrder) {
      this.get('sortOrder').setObjects(sortOrder)
    }
  }
})
