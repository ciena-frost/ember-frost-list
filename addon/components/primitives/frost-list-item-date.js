/* This one is under developing */
import Ember from 'ember'
import layout from '../../templates/components/frost-list-item-date'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Ember.Component.extend(PropTypeMixin, {
  classNames: ['frost-list-item-date'],

  propTypes: {
    date: PropTypes.string.isRequired
  },

  getDefaultProps () {
    return {
      date: ''
    }
  },

  layout
})
