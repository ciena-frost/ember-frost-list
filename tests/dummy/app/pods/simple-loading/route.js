import Ember from 'ember'
const {RSVP: {Promise}, Route, run: {later}} = Ember

export default Route.extend({
  isModelRefreshing: false,

  model () {
    if (this.isModelRefreshing) {
      return new Promise((resolve, reject) => {
        later(() => {
          this.store.findAll('list-item').then((results) => {
            resolve(results)
          })
        }, 2500)
      })
    } else {
      return this.store.findAll('list-item')
    }
  },

  actions: {
    loading (transition, originRoute) {
      transition.promise.finally(() => {
        this.controller.set('isLoading', false)
      })
    },

    refreshModel () {
      this.set('isModelRefreshing', true)
      this.controller.set('isLoading', true)
      this.refresh()
    }
  }
})
