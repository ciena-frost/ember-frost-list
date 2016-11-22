import Ember from 'ember'
import config from './config/environment'

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
})

Router.map(function () {
  this.route('examples', {
    path: '/'
  })

  this.route('demo')
  this.route('documents', function () {
    this.route('overview', {path: '/'})
  })
  this.route('infinite-scroll')
  this.route('pagination')
  this.route('mixin-list')
  this.route('pre-selection')
  this.route('qp-binding')
})

export default Router
