import Ember from 'ember'
import FrostListItem from 'ember-frost-list/components/frost-list-item'

export default FrostListItem.extend({
  classNames: ['frost-list-item', 'pagination'], // TODO Move frost-list-item to FrostListItem component
  classNameBindings: ['isSmall:small', 'isMedium:medium', 'isLarge:large'], // TODO Move to FrostListItem

  detailLevel: Ember.computed(function () {
    const min = 1
    const max = 3
    const randomDetailLevel = Math.floor(Math.random() * (max - min + 1)) + min

    switch (randomDetailLevel) {
      case 1: return 'small'
      case 2: return 'medium'
      case 3: return 'large'
    }
  }),
  isSmall: Ember.computed.equal('detailLevel', 'small'),
  isMedium: Ember.computed.equal('detailLevel', 'medium'),
  isLarge: Ember.computed.equal('detailLevel', 'large')
})
