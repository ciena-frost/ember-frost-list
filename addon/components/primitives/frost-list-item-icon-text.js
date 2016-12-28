import Ember from 'ember'
import layout from '../../templates/components/frost-list-item-icon-text'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Ember.Component.extend(PropTypeMixin, {
  classNames: ['frost-list-item-icon-text'],

  propTypes: {
    text: PropTypes.string,
    pack: PropTypes.string,
    icon: PropTypes.string
  },

  getDefaultProps () {
    return {
      text: '',
      pack: 'frost',
      icon: ''
    }
  },

  layout
})
