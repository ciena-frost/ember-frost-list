import Ember from 'ember'

export default Ember.Route.extend({

  queryParams: {
    'listConfig.sorting.active': {
      as: 'sortOrder',
      replace: true
    }
  },

  _fetch () {
    return this.get('store').query('list-item', {pageSize: 10, start: 0})
  },

  model () {
    return this._fetch()
  }
})
