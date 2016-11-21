import Ember from 'ember'
const {
  Mixin,
  on,
  defineProperty,
  computed: {alias}
} = Ember
import {normalizeSort, defaultSort} from 'ember-frost-list/utils/utils'
import FrostListCoreMixin from 'ember-frost-list/mixins/frost-list-core-mixin'

export default Mixin.create(FrostListCoreMixin, {
  // == Event =================================================================
  initListSortingMixin: on('init', function () {
    defineProperty(this, 'sortableProperties', alias('listConfig.sorting.properties'))
    defineProperty(this, 'activeSorting', alias('listConfig.sorting.active'))
  }),

  // == Actions ================================================================
  actions: {
    sortItems (sortProperties) {
      const normalizedSortProperties = normalizeSort(sortProperties)
      const customSortMethod = this.get('listConfig.sorting.client')
      let sortMethod
      if (customSortMethod) {
        if (typeof customSortMethod !== 'function') {
          Ember.assert(`Expect custom sort method to be function, received ${typeof customSortMethod}.`)
        }
        sortMethod = customSortMethod
      } else {
        sortMethod = defaultSort
      }
      const dataKey = this.get('listConfig.items')
      this.set(dataKey, sortMethod.call(this, this.get(dataKey), normalizedSortProperties))
    }
  }
})
