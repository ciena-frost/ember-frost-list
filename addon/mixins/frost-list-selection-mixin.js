import Ember from 'ember'
const {
  Mixin,
  get,
  on,
  set
} = Ember
import {updateSelectedItemDictionary} from 'ember-frost-list/utils/utils'
import FrostListCoreMixin from 'ember-frost-list/mixins/frost-list-core-mixin'

export default Mixin.create(FrostListCoreMixin, {
  // == Event =================================================================
  initListSelectionMixin: on('init', function () {
    set(this, 'selectedItemDictionary', Ember.Object.create())
  }),

  // == Actions ================================================================
  actions: {
    selectItem (attrs) {
      let selectedItemDictionary = get(this, 'selectedItemDictionary')
      set(this, 'selectedItemDictionary', updateSelectedItemDictionary(selectedItemDictionary, attrs))
      this.notifyPropertyChange('selectedItemDictionary')
    }
  }
})
