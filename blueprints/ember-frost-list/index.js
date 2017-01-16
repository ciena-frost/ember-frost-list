module.exports = {
  afterInstall: function () {
    return this.addAddonsToProject({
      packages: [
        {name: 'ember-frost-core', target: '^1.5.1'},
        {name: 'ember-frost-sort', target: '^7.0.0'},
        {name: 'smoke-and-mirrors', target: '~0.6.2'}
      ]
    })
  },

  normalizeEntityName: function () {
  }
}
