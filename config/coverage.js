module.exports = {
  coverageEnvVar: 'COVERAGE',
  coverageFolder: 'coverage',
  excludes: [
    /dummy\/(.*)/
  ],
  useBabelInstrumenter: true,
  reporters: [
    'lcov',
    'text-summary'
  ]
}
