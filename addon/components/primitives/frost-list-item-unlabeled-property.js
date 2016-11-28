import Ember from 'ember'
import layout from '../../templates/components/frost-list-item-unlabeled-property'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Ember.Component.extend(PropTypeMixin, {
  classNames: ['frost-list-item-unlabeled-property'],

  propTypes: {
    value: PropTypes.string
  },

  getDefaultProps () {
    return {
      value: ''
    }
  },

  layout
})
