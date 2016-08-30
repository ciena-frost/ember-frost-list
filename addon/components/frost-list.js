import Ember from 'ember'
const {Component} = Ember
import layout from '../templates/frost-list'

const FrostListWrapper = Component.extend({
  layout,

  // FIXME: code is too complex (was overly complex before adding eslint rule)
  /* eslint-disable complexity */
  initContext: Ember.on('init', function () {
    const config = this.get('config')

    if (config && (this.selection || this.expansion || this.sorting)) {
      Ember.assert('Consumer should not provide config hash and selection/expansion/sorting at the same time.')
    }

    if (config) {
      if (config.component) {
        this.set('recordComponent', config.component)
      }

      const keys = Object.keys(config)
      keys.forEach((key) => {
        Ember.defineProperty(this, key, Ember.computed.readOnly(`config.${key}`))
      })
    }

    const model = this.get('items')

    if (!model) {
      Ember.assert('Not receiving <items>. Consumer mush pass items/model to frost-list')
    } else {
      if (!(Array.isArray(model) || Array.isArray(model.content))) {
        Ember.assert(`Expecting <items> to be array or Ember.recordArray, got items:${model}`)
      }
    }
  })
  /* eslint-enable complexity */
})

FrostListWrapper.reopenClass({
  positionalParams: [
    'recordComponent'
  ]
})

export default FrostListWrapper
