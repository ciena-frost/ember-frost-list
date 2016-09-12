import Ember from 'ember'
import config from '../../config/environment'
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

  // config hash used for list mixin
  listConfig: {
    items: 'model',
    component: Ember.computed({
      get () {
        if (config.isFrostGuideDirectory) {
          return 'user-list-item'
        } else {
          return 'examples/user-list-item'
        }
      }
    }),
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
      ]
    }
  }


})
