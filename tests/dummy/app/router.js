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
  this.route('typed')
})

export default Router
