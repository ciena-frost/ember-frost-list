import Ember from 'ember'
import config from '../../config/environment'
import FrostListMixin from 'ember-frost-list/mixins/frost-list-mixin'
import computed from 'ember-computed-decorators'

export default Ember.Controller.extend(FrostListMixin, {
  // the path of custom list-item component
  componentPath: Ember.computed({
    get () {
      if (config.isFrostGuideDirectory) {
        return 'user-list-item'
      } else {
        return 'examples/user-list-item'
      }
    }
  }),

  // FIXME: code is too complex (was overly complex before adding eslint rule)
  /* eslint-disable complexity */
  @computed('__useMixin', '__useHash', '__selection', '__sorting', '__expansion')
  computedTemplateCase (__useMixin, __useHash, __selection, __sorting, __expansion) {
    if (!__useMixin) {
      return 'case2'
    } else {
      if (__useHash) {
        return 'case1'
      } else {
        if (__expansion && __sorting) {
          return 'case2'
        }
        if (__expansion && !__sorting) {
          return 'case3'
        }
        if (!__expansion && __sorting) {
          return 'case4'
        }
        if (!__expansion && !__sorting) {
          return 'case5'
        }
      }
    }
  },
  /* eslint-enable complexity */

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
  },

  actions: {
    renderDemo (attrs) {
      this.set('selectedItems', [])
      this.set('expandedItems', [])

      this.set('renderDemo', true)
      this.set('__useMixin', attrs.useMixin)
      this.set('__useHash', attrs.useHash)
      this.set('__selection', attrs.selection)
      this.set('__sorting', attrs.sorting)
      this.set('__expansion', attrs.expansion)
    }
  }
})
