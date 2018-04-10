import Ember from 'ember'
const {Router: EmberRouter} = Ember

import config from './config/environment'

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
})

Router.map(function () {
  this.route('simple', {
    path: '/'
  })
  this.route('infinite')
  this.route('paged')
  this.route('size')
  this.route('typed')
  this.route('single')
  this.route('expansion-type')
})

export default Router
