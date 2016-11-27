import Ember from 'ember'
const {
  Component,
  get,
  isPresent,
  Logger
} = Ember
import layout from '../templates/frost-list'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Component.extend(PropTypeMixin, {
  tagName: '',
  layout,
  propTypes: {
    config: PropTypes.object,
    expansion: PropTypes.object,
    hook: PropTypes.string,
    infinite: PropTypes.bool,
    item: PropTypes.object,
    items: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.EmberObject
    ]),
    pagination: PropTypes.shape({
      itemsPerPage: PropTypes.number.isRequired,
      page: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
      onChange: PropTypes.func.isRequired
    }),
    sorting: PropTypes.object,
    onSelect: PropTypes.func,

    // proxy properties for smoke-and-mirror
    alwaysUseDefaultHeight: PropTypes.bool,
    defaultHeight: PropTypes.number,
    scrollPosition: PropTypes.number,
    size: PropTypes.string
  },

  getDefaultProps () {
    return {
      //  Optional attrs for smoke-and-mirror vertical-collection
      //  https://github.com/runspired/smoke-and-mirrors/blob/develop/addon/components/vertical-collection.js
      alwaysUseDefaultHeight: false,
      infinite: true
    }
  },

  // FIXME: code is too complex (was overly complex before adding eslint rule)
  /* eslint-disable complexity */
  initContext: Ember.on('init', function () {
    const config = get(this, 'config')

    if (!isPresent(config)) {
      return
    } else {
      if (this.item || this.expansion || this.sorting) {
        Logger.error('Consumer should not provide config hash and item/expansion/sorting at the same time.')
      }
    }
  })
  /* eslint-enable complexity */
})

