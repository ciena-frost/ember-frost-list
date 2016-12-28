import Ember from 'ember'
import layout from '../../templates/components/frost-list-item-small-view'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Ember.Component.extend(PropTypeMixin, {
  classNames: ['frost-list-item-small-view'],

  propTypes: {
    data: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.EmberObject
    ])
  },

  layout
})
