module.exports = {
  coverageEnvVar: 'COVERAGE',
  coverageFolder: 'coverage',
  excludes: [
    /dummy\/(.*)/
  ],
  useBabelInstrumenter: true,
  reporters: [
    'json-summary',
    'lcov',
    'text-summary'
  ]
}
