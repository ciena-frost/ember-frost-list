import Ember from 'ember'

export default Ember.Route.extend({

  beforeModel() {
    this.store.unloadAll('list-item')
  },

  _fetch () {
    this.controllerFor('infinite-scroll').set('currentOffset', 0)
    this.controllerFor('infinite-scroll').set('currentPageSize', 0)

    return this.store.query('list-item', {
      pageSize: 100,
      start: 0
    }).then(() => {
      return {
        items: this.store.peekAll('list-item'),
        firstOffset: 0,
        lastOffset: 100
      }
    })
  },

  model () {
    return this._fetch()
  }
})
