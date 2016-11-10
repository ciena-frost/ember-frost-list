import Ember from 'ember'
const {
  Mixin,
  on,
  set
} = Ember
import {updateSelectedItemsHash} from 'ember-frost-list/utils/utils'
import FrostListCoreMixin from 'ember-frost-list/mixins/frost-list-core-mixin'

export default Mixin.create(FrostListCoreMixin, {
  // == Event =================================================================
  initListSelectionMixin: on('init', function () {
    set(this, 'selectedItems', Ember.Object.create())
  }),

  // == Actions ================================================================
  actions: {
    selectItem (attrs) {
      let selectedItems = this.get('selectedItems')
      this.set('selectedItems', updateSelectedItemsHash(selectedItems, attrs))
      this.notifyPropertyChange('selectedItems')
    }
  }
})
