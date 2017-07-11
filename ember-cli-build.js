/* eslint-env node */
const EmberAddon = require('ember-cli/lib/broccoli/ember-addon')

module.exports = function (defaults) {
  var app = new EmberAddon(defaults, {
    'ember-cli-mocha': {
      useLintTree: false
    },
    sassOptions: {
      includePaths: [
      ]
    },
    babel: {
      optional: ['es7.decorators']
    },

    snippetPaths: ['snippets', 'tests/snippets'],
    snippetSearchPaths: [
      'tests/dummy'
    ]
  })

  // Development dependencies
  app.import(app.bowerDirectory + '/Faker/build/build/faker.js')

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree()
}
