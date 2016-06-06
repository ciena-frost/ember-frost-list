import Ember from 'ember'
import FrostListItem from 'ember-frost-list/pods/components/frost-list-item/component'

export default FrostListItem.extend({
  classNames: ['frost-list-item', 'user'], // TODO Move frost-list-item to FrostListItem component
  classNameBindings: ['isSmall:small', 'isMedium:medium', 'isLarge:large'], // TODO Move to FrostListItem

  isSmall: Ember.computed.equal('detailLevel', 'small'),
  isMedium: Ember.computed.equal('detailLevel', 'medium'),
  isLarge: Ember.computed.equal('detailLevel', 'large')
})
