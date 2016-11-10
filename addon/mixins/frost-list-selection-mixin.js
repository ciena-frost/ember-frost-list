import Ember from 'ember'
const {
  Mixin,
  get,
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
      let selectedItems = get(this, 'selectedItems')
      set(this, 'selectedItems', updateSelectedItemsHash(selectedItems, attrs))
      this.notifyPropertyChange('selectedItems')
    }
  }
})
