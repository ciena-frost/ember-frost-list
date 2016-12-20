module.exports = {
  coverageEnvVar: 'COVERAGE',
  coverageFolder: 'coverage',
  excludes: [
    'tests/dummy/**/*',
    'tests/factories/**/*'
  ],
  useBabelInstrumenter: true,
  reporters: [
    'lcov',
    'text-summary'
  ]
}
