import Ember from 'ember'

export default Ember.Component.extend({

  // checkbox

  showCheckbox: Ember.computed('selectionState.apiSelectionValue', function () {
    return this.get('selectionState.apiSelectionValue') === 'Full API'
  }),

  isButtonDisabled: Ember.computed('selectionState.apiSelectionValue', 'selectionState.mixinSelectionValue', function () {
    return !(this.get('selectionState.apiSelectionValue') && this.get('selectionState.mixinSelectionValue'))
  }),

  isSelectionChecked: true,
  isSortingChecked: false,
  isExpansionChecked: false,

  apiOptions: [
    {
      label: 'Data driven',
      value: 'Data driven'
    },
    {
      label: 'Full API',
      value: 'Full API'
    }
  ],

  preSelectedValue: false,


  mixinOptions: [
    {
      label: 'Use Mixin',
      value: 'Use Mixin'
    },
    {
      label: 'No Mixin',
      value: 'No Mixin'
    }
  ],

  actions: {
    onSelectChangeHandler (attrs) {
      const onChange = this.get('onChange')
      if (onChange && typeof onChange === 'function') {
        onChange(attrs)
      }
    },

    clickHandler () {
      const onRender = this.get('onRender')
      if (onRender && typeof onRender == 'function') {
        onRender({
          selection: this.get('isSelectionChecked'),
          sorting: this.get('isSortingChecked'),
          expansion: this.get('isExpansionChecked')
        })
      }
    }
  }

})
