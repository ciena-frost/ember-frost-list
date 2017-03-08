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
  this.route('simple-loading')
  this.route('infinite')
  this.route('infinite-loading')
  this.route('paged')
  this.route('paged-loading')
})

export default Router
