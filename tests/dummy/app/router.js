import Ember from 'ember'
import config from './config/environment'

const Router = Ember.Router.extend({
  location: config.locationType
})

Router.map(function () {
  this.route('examples', {
    path: '/'
  })

  this.route('demo')
  this.route('demo-lists')
  this.route('infinite-scroll')
  this.route('integration-list')
  this.route('mixin-list')
  this.route('lists-demo')
})

export default Router
