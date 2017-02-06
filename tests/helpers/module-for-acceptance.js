import {
  module
}
from 'qunit'
import destroyApp from '../helpers/destroy-app'
import startApp from '../helpers/start-app'

export default function (name, options = {}) {
  module(name, {
    beforeEach () {
      this.application = startApp()

      if (options.beforeEach) {
        options.beforeEach.apply(this, arguments)
      }
    },

    afterEach () {
      destroyApp(this.application)

      if (options.afterEach) {
        options.afterEach.apply(this, arguments)
      }
    }
  })
}
