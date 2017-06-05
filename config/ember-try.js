module.exports = {
  scenarios: [
    {
      name: 'default',
      npm: {
        devDependencies: {}
      }
    },
    {
      name: 'ember-2-3',
      bower: {
        dependencies: {
          'ember': '~2.3.0'
        },
        resolutions: {
          'ember': '~2.3.0'
        }
      }
    },
    {
      name: 'ember-2-8',
      bower: {
        dependencies: {
          'ember': '~2.8.0'
        },
        resolutions: {
          'ember': '~2.8.0'
        }
      }
    },
    {
      name: 'ember-release',
      bower: {
        dependencies: {
          'ember': 'components/ember#release'
        },
        resolutions: {
          'ember': 'release'
        }
      },
      npm: {
        devDependencies: {
          'ember-source': null
        }
      }
    },
    {
      name: 'ember-beta',
      bower: {
        dependencies: {
          'ember': 'components/ember#beta'
        },
        resolutions: {
          'ember': 'beta'
        }
      },
      npm: {
        devDependencies: {
          'ember-source': null
        }
      }
    },
    {
      name: 'ember-canary',
      bower: {
        dependencies: {
          'ember': 'components/ember#canary'
        },
        resolutions: {
          'ember': 'canary'
        }
      },
      npm: {
        devDependencies: {
          'ember-source': null
        }
      }
    }
  ]
}
