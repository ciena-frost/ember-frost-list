import Ember from 'ember'

export default Ember.Component.extend({
  // selections
  isSelectDisabled_1: false,
  isSelectDisabled_2: true,

  // checkbox

  showCheckbox: false,

  isSelectionChecked: true,
  isSortingChecked: false,
  isExpansionChecked: false,

  isButtonDisabled: true,

  data1: [
    {
      label: 'Use Mixin',
      value: true
    },
    {
      label: 'No Mixin',
      value: false
    }
  ],

  data2: [
    {
      label: 'Hash',
      value: true
    },
    {
      label: 'No hash',
      value: false
    }
  ],

  actions: {
    onChangeHandler1 (attrs) {
      if (attrs[0]) {
        this.set('isSelectDisabled_2', false)
      } else {
        this.set('isSelectDisabled_2', true)
        this.set('showCheckbox', false)
      }
      this.set('isButtonDisabled', false)
      this.set('selectValue_1', attrs[0])
    },

    onChangeHandler2 (attrs) {
      if (attrs[0]) {
        this.set('showCheckbox', false)
      } else {
        this.set('showCheckbox', true)

        this.set('isSelectionChecked', true)
        this.set('isSortingChecked', false)
        this.set('isExpansionChecked', false)
      }
      this.set('selectValue_2', attrs[0])
    },

    clickHandler () {
      this.get('onRender')({
        useMixin: this.get('selectValue_1'),
        useHash: this.get('selectValue_2'),
        selection: this.get('isSelectionChecked'),
        sorting: this.get('isSortingChecked'),
        expansion: this.get('isExpansionChecked')
      })
    }
  }

})
