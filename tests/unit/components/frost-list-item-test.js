import {expect} from 'chai'
import Ember from 'ember'
const {run} = Ember
import {describeComponent} from 'ember-mocha'
import {
  beforeEach,
  describe,
  it
} from 'mocha'

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

    it('sets dependent keys correctly', function () {
      const isSelectedDependentKeys = [
        'model.isSelected'
      ]

      const isExpandedDependentKeys = [
        'model.isExpanded'
      ]

      expect(
        component.isSelected._dependentKeys,
        'Dependent keys are correct for _records computed property'
      ).to.eql(isSelectedDependentKeys)

      expect(
        component.isExpanded._dependentKeys,
        'Dependent keys are correct for _hasHeader computed property'
      ).to.eql(isExpandedDependentKeys)
    })

    it('"isExpanded" computed property', function () {
      run(() => { component.set('model', { isExpanded: true }) })

      expect(
        component.get('isExpanded'),
        'isExpanded: "true"'
      ).to.be.true
    })

    it('"isSelected" computed property', function () {
      run(() => { component.set('model', { isSelected: true }) })

      expect(
        component.get('isSelected'),
        'isSelected: "true"'
      ).to.be.true
    })
  }
)
