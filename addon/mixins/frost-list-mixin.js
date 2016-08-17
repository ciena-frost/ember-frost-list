import Ember from 'ember'
const {Mixin, on} = Ember
import FrostListSelectionMixin from 'ember-frost-list/mixins/frost-list-selection-mixin'
import FrostListExpansionMixin from 'ember-frost-list/mixins/frost-list-expansion-mixin'
import FrostListSortingMixin from 'ember-frost-list/mixins/frost-list-sorting-mixin'

export default Mixin.create(FrostListSelectionMixin, FrostListExpansionMixin, FrostListSortingMixin, {

  initListMixin: on('init', function() {
    Ember.defineProperty(this, '_listItems', Ember.computed.alias(this.listConfig.items))
  })
})
