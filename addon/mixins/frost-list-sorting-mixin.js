import Ember from 'ember'
const {
  Mixin,
  get,
  on,
  set,
  defineProperty,
  computed: {alias}
} = Ember
import {normalizeSort, defaultSort} from 'ember-frost-list/utils/utils'
import FrostListCoreMixin from 'ember-frost-list/mixins/frost-list-core-mixin'

export default Mixin.create(FrostListCoreMixin, {
  // == Event =================================================================
  //TODO replace defineProperty when there's a public method available
  initListSortingMixin: on('init', function () {
    defineProperty(this, 'sortableProperties', alias('listConfig.sorting.properties'))
    defineProperty(this, 'activeSorting', alias('listConfig.sorting.active'))
  }),

  // == Actions ================================================================
  actions: {
    sortItems (sortProperties) {
      const normalizedSortProperties = normalizeSort(sortProperties)
      const customSortMethod = get(this, 'listConfig.sorting.client')
      const sortMethod = typeof customSortMethod === 'function' ? customSortMethod : defaultSort
      const dataKey = get(this, 'listConfig.items')

      set(this, dataKey, sortMethod.call(this, get(this, dataKey), normalizedSortProperties))
    }
  }
})
