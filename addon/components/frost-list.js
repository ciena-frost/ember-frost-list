import Ember from 'ember'
const {
  Component,
  isPresent,
  Logger,
} = Ember
import layout from '../templates/frost-list'
import PropTypeMixin,{PropTypes} from 'ember-prop-types'

const FrostListWrapper = Component.extend(PropTypeMixin, {
  layout,
  propTypes: {
    config: PropTypes.object,
    items: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.EmberObject
    ])
  },

  // FIXME: code is too complex (was overly complex before adding eslint rule)
  /* eslint-disable complexity */
  initContext: Ember.on('init', function () {
    const config = this.get('config')

    if (!isPresent(config)) {
      return
    } else {
      if (this.selection || this.expansion || this.sorting) {
        Logger.error('Consumer should not provide config hash and selection/expansion/sorting at the same time.')
      }
      if (config.component) {
        this.set('recordComponent', config.component)
      }

      const keys = Object.keys(config)
      keys.forEach((key) => {
        Ember.defineProperty(this, key, Ember.computed.readOnly(`config.${key}`))
      })
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
