/* eslint-env node */

'use strict'

const path = require('path')
const MergeTrees = require('broccoli-merge-trees')
const Funnel = require('broccoli-funnel')

module.exports = {
  name: 'ember-frost-list',

  included: function (app) {
    // Addons - see: https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      this.app = app = app.app
    }

    this._super.included.apply(this, arguments)

    if (app) {
      app.import(path.join('vendor', 'ua-parser.min.js'))
      app.import(path.join('vendor', 'shims', 'ua-parser-js.js'))
    }
  },

  /* eslint-disable complexity */
  init: function (app) {
    this.options = this.options || {}
    this.options.babel = this.options.babel || {}
    this.options.babel.optional = this.options.babel.optional || []

    if (this.options.babel.optional.indexOf('es7.decorators') === -1) {
      this.options.babel.optional.push('es7.decorators')
    }

    /* eslint-disable no-unused-expressions */
    this._super.init && this._super.init.apply(this, arguments)
    /* eslint-enable no-unused-expressions */
  },
  /* eslint-enable complexity */

  treeForVendor: function (vendorTree) {
    const packageTree = new Funnel(path.join(this.project.root, 'node_modules', 'ua-parser-js', 'dist'), {
      files: ['ua-parser.min.js']
    })

    return new MergeTrees([vendorTree, packageTree])
  }
}
