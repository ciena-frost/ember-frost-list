import Ember from 'ember'
import config from '../../config/environment'
import {FrostListMixin} from 'ember-frost-list'
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
  @computed('__dataDriven', '__useMixin', '__selection', '__sorting', '__expansion')
  computedTemplateCase (__dataDriven, __useMixin, __selection, __sorting, __expansion) {
    if (__dataDriven) {
      return 'case1'
    } else {
      if (__useMixin) {
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
      } else {
        return 'case6'
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

  selectionState: {
    isApiSelectDisabled: false,
    isMixinSelectDisabled: true,
    apiSelectionValue: '',
    mixinSelectionValue: ''
  },

  actions: {
    /* eslint-disable complexity */
    changeSelection (attrs) {
      let selectedValue = attrs[0]
      if (selectedValue === 'Data driven' || selectedValue === 'Full API') {
        if (selectedValue === 'Data driven') {
          this.set('selectionState.mixinSelectionValue', 'Use Mixin')
          this.set('selectionState.isMixinSelectDisabled', true)
        } else {
          this.set('selectionState.isMixinSelectDisabled', false)
        }
        this.set('selectionState.apiSelectionValue', selectedValue)
      } else if (selectedValue === 'Use Mixin') {
        this.set('selectionState.mixinSelectionValue', selectedValue)
      } else if (selectedValue === 'No Mixin') {
        this.set('selectionState.mixinSelectionValue', selectedValue)
      }
    },
    /* eslint-enable complexity */

    renderDemo (attrs) {
      this.set('selectedItems', Ember.Object.create())
      this.set('expandedItems', Ember.Object.create())

      this.set('renderDemo', true)

      this.set('__dataDriven', this.get('selectionState.apiSelectionValue') === 'Data driven')
      this.set('__useMixin', this.get('selectionState.mixinSelectionValue') === 'Use Mixin')
      this.set('__selection', attrs.selection)
      this.set('__sorting', attrs.sorting)
      this.set('__expansion', attrs.expansion)
    }
  }
})
