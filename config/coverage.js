module.exports = {
  coverageEnvVar: 'COVERAGE',
  coverageFolder: 'coverage',
  excludes: [
    /tests\/(.*)/
  ],
  useBabelInstrumenter: true,
  reporters: [
    'lcov',
    'text-summary'
  ]
}
