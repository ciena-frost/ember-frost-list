import Ember from 'ember'
const {
  Mixin,
  on
} = Ember
import {normalizeSort, defaultSort} from 'ember-frost-list/utils/utils'
import FrostListCoreMixin from 'ember-frost-list/mixins/frost-list-core-mixin'

export default Mixin.create(FrostListCoreMixin, {
  // == Event =================================================================
  initListSortingMixin: on('init', function () {
    Ember.defineProperty(this, 'sortableProperties', Ember.computed.alias('listConfig.sorting.properties'))
    Ember.defineProperty(this, 'activeSorting', Ember.computed.alias('listConfig.sorting.active'))
  }),

  // == Actions ================================================================
  actions: {
    sortItems (sortProperties) {
      const normalizedSortProperties = normalizeSort(sortProperties)
      const customSortMethod = this.get('listConfig.sorting.client')
      const sortMethod = typeof customSortMethod === 'function' ? customSortMethod : defaultSort
      const dataKey = this.get('listConfig.items')

      this.set(dataKey, sortMethod.call(this, this.get(dataKey), normalizedSortProperties))
    }
  }
})
