module.exports = {
  afterInstall: function () {
    return this.addBowerPackageToProject('perfect-scrollbar', '0.6.10')
  },

  normalizeEntityName: function () {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  }
}
