import Ember from 'ember'
const {Component} = Ember
import layout from '../templates/frost-list-expansion'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Component.extend(PropTypeMixin, {
  classNames: ['frost-list-expansion'],
  layout,
  propTypes: {
    hook: PropTypes.string
  }
})
