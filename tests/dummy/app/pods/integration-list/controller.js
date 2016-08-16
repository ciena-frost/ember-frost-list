import Ember from 'ember'
import config from '../../config/environment'
import _ from 'lodash'
import FrostListSelectionMixin from 'ember-frost-list/mixins/frost-list-selection-mixin'
import FrostListExpansionMixin from 'ember-frost-list/mixins/frost-list-expansion-mixin'

const {computed} = Ember

export default Ember.Controller.extend(FrostListSelectionMixin,FrostListExpansionMixin, {
  // the path of custom list-item component
  componentPath: computed({
    get () {
      if (config.isFrostGuideDirectory) {
        return 'user-list-item'
      } else {
        return 'integration-list/user-list-item'
      }
    }
  }),

  queryParams: {
    activeSorting: {
      refreshModel: true
    }
  },

  // sort related properties
  activeSorting: [{value: 'label', direction: 'asc'}],

  activeSortingString: Ember.computed('activeSorting', function () {
    let activeSorting = this.get('activeSorting')
    if(!activeSorting) return []
    return activeSorting.map((sortProperty) => {
      return `${sortProperty.value}${sortProperty.direction}`
    })
  }),

  sortableProperties: [
    {
      value: 'label',
      label: 'Label'
    },
    {
      value: 'id',
      label: 'Id'
    }
  ],

  // data model
  listItems: computed.alias('model'),
  sortedItems: Ember.computed.sort('listItems', 'activeSortingString'),

  // list item selection


  actions: {
    sortItems (sortItems) {
      let temp = []
      sortItems.map(function (item) {
        temp.push({
          value: item.value,
          direction: item.direction
        })
      })
      this.set('activeSorting', temp)
    }
  }
})
