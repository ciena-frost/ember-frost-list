import Ember from 'ember'
import {FrostListMixin} from 'ember-frost-list'

export default Ember.Controller.extend(FrostListMixin, {
  // config hash used for list mixin
  listConfig: {
    items: 'model',
    sorting: {
      active: [{value: 'label', direction: ':desc'}],
      properties: [
        {value: 'label', label: 'Label'},
        {value: 'id', label: 'Id'}
      ]
    }
  }
})

