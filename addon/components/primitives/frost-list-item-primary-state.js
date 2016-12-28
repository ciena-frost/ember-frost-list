import Ember from 'ember'
import layout from '../../templates/components/frost-list-item-primary-state'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Ember.Component.extend(PropTypeMixin, {
  classNames: ['frost-list-item-primary-state'],
  classNameBindings: ['state'],

  propTypes: {
    text: PropTypes.string,
    state: PropTypes.string
  },

  getDefaultProps () {
    return {
      text: '',
      state: 'neutral'
    }
  },

  layout
})
