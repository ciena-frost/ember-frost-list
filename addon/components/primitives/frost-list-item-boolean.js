import Ember from 'ember'
import layout from '../../templates/components/frost-list-item-boolean'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Ember.Component.extend(PropTypeMixin, {
  classNames: ['frost-list-item-boolean'],

  propTypes: {
    text: PropTypes.string,
    value: PropTypes.bool.isRequired
  },

  getDefaultProps () {
    return {
      text: ''
    }
  },

  layout
})
