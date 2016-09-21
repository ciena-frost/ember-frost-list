import Ember from 'ember'

export default Ember.Route.extend({
  _fetch () {
    return this.get('store').query('list-item', {pageSize: 30, start: 0})
  },

  model () {
    return this._fetch()
  }
})
