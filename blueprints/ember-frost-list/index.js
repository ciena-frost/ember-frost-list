module.exports = {
  afterInstall: function () {
    // TODO: Evaluate which packages need to be installed via blueprint
    return this.addAddonsToProject({
      packages: [
        {name: 'ember-frost-core', target: '^1.5.1'},
        {name: 'ember-frost-sort', target: '^7.0.0'}
      ]
    })
  },

  normalizeEntityName: function () {
  }
}
