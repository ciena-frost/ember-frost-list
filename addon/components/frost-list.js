import Ember from 'ember'
const {Component} = Ember
import layout from '../templates/frost-list'

const FrostListWrapper = Component.extend({
  layout,

  initContext: Ember.on('init', function () {
    const model = this.get('items')
    const expansion = this.get('expansion')

    const config = this.get('config')

    if (!model) {
      Ember.assert('Not receiving <items>. Consumer mush pass items/model to frost-list')
    } else {
      if (!(Array.isArray(model) || Array.isArray(model.content))) {
        Ember.assert(`Expecting <items> to be array or Ember.recordArray, got items:${model}`)
      }

      model.forEach((item) => {
        if (typeof item.isSelected === 'undefined') {
          Ember.assert('isSelected property must be declared for each record in collection')
        }
        if (expansion && typeof expansion === 'object') {
          if (typeof item.isExpanded === 'undefined') {
            Ember.assert('isExpanded property must be declared for each record in collection')
          }
        }
      })
    }

    if (config && (this.selection || this.expansion || this.sorting)) {
      Ember.assert('Consumer should not provide config hash and selection/expansion/sorting at the same time.')
    }

    if (config) {
      if (config.component) {
        this.set('recordComponent', config.component)
      }

      const keys = Object.keys(config)
      keys.forEach((key) => {
        Ember.defineProperty(this, key, undefined, config[key])
      })
    }
  })
})

FrostListWrapper.reopenClass({
  positionalParams: [
    'recordComponent'
  ]
})

export default FrostListWrapper
