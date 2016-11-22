import Ember from 'ember'
import { FrostListMixin } from 'ember-frost-list'

export default Ember.Controller.extend(FrostListMixin, {
  listConfig: {
    items: 'model',
    component: 'pagination/user-list-item'
  },
  itemsPerPage: 10,
  page: 0, // TODO From qp
  selectedItems: Ember.A(),
  total: 100, // TODO From meta

  fetchPage (page) {
    this.store.unloadAll('list-item')
    this.store.query('list-item', {
      pageSize: this.get('itemsPerPage'), // TODO Getting 500 from factory-guy
      start: (page * this.get('itemsPerPage'))
    }).then(() => {
      this.set('model', this.store.peekAll('list-item'))
    })
  },

  actions: {
    changePage (page) {
      this.set('page', page)
      this.fetchPage(page)
    }
  }
})
