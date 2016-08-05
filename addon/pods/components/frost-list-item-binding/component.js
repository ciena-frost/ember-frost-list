import layout from './template'
import FrostListItem from '../frost-list-item/component'
import Ember from 'ember'
export default FrostListItem.extend({
  layout,
  classNames: ['frost-list-item'], // TODO Move frost-list-item to FrostListItem component
  classNameBindings: ['isExpanded:expanded'], // TODO: add in expanded stuff

  isExpanded: Ember.computed.equal('detailLevel', 'expanded') // TODO: add in expanded stuff
})
