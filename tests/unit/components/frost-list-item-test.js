import { expect } from 'chai'
import { describeComponent } from 'ember-mocha'
import { beforeEach, describe, it } from 'mocha'

describeComponent(
  'frost-list-item',
  'Unit: FrostListItemComponent',
  {
    unit: true
  },
  function () {
    let component

    beforeEach(function () {
      component = this.subject()
    })

    it('includes className frost-list-item', function () {
      expect(component.classNames).to.include('frost-list-item')
    })
    describe('dependent keys', function () {
      let isSelectedDependentKeys, isExpandedDependentKeys
      beforeEach(function () {
        isSelectedDependentKeys = [
          'model.isSelected'
        ]

        isExpandedDependentKeys = [
          'model.isExpanded'
        ]
      })
      it('sets correct dependent keys for isSelected computed property', function () {
        expect(
          component.isSelected._dependentKeys
        ).to.eql(isSelectedDependentKeys)
      })

      it('sets correct dependent keys for isExpanded computed property', function () {
        expect(
          component.isExpanded._dependentKeys
        ).to.eql(isExpandedDependentKeys)
      })
    })

    it('"isExpanded" computed property', function () {
      component.set('model', { isExpanded: true })

      expect(
        component.get('isExpanded')
      ).to.eql(true)
    })

    it('"isSelected" computed property', function () {
      component.set('model', { isSelected: true })

      expect(
        component.get('isSelected')
      ).to.eql(true)
    })
  }
)
