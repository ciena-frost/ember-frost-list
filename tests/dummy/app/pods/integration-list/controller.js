import Ember from 'ember'
import config from '../../config/environment'
import _ from 'lodash'
import FrostListMixin from 'ember-frost-list/mixins/frost-list-mixin'

const {computed} = Ember

export default Ember.Controller.extend(FrostListMixin, {
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


  listItems: Ember.computed.alias('model'),

  //// This is what I want in my Mixin, but obviously I can't use `this` here
  //lists: Ember.computed.alias(this.listConfig.items),
  //
  //// This is my Config object
  //listConfig: {
  //  items: 'model'
  //},


  listConfig: {
    items: 'model',
    sorting: {
      active: [{value: 'label', direction: ':desc'}],

      properties: [
        {
          value: 'label',
          label: 'Label'
        },
        {
          value: 'id',
          label: 'Id'
        }
      ],
      sort() {

      }
    }
  },


  // sort related properties and actions
  queryParams: ['activeSorting'],

  activeSorting: [{value: 'label', direction: ':desc'}],

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


  sortedItems: Ember.computed.sort('mappedRecords', 'activeSortingString')
})
