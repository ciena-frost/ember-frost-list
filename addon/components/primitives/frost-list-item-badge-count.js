import Ember from 'ember'
import layout from '../../templates/components/frost-list-item-badge-count'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Ember.Component.extend(PropTypeMixin, {
  classNames: ['frost-list-item-badge-count'],

  propTypes: {
    count: PropTypes.number.isRequired
  },

  layout
})
