import { expect } from 'chai'
import { describeComponent } from 'ember-mocha'
import PropTypeMixin from 'ember-prop-types'
import { beforeEach, it } from 'mocha'

describeComponent(
  'frost-pagination',
  'Unit: FrostPaginationComponent',
  {
    unit: true
  },
  function () {
    let component

    beforeEach(function () {
      component = this.subject()
    })

    it('includes className frost-pagination', function () {
      expect(component.classNames).to.include('frost-pagination')
    })

    it('sets dependent keys correctly', function () {
      const _endDependentKeys = [
        'itemsPerPage',
        'page',
        'total'
      ]

      const _isLeftDisabledDependentKeys = [
        'page'
      ]

      const _isRightDisabledDependentKeys = [
        'itemsPerPage',
        'page',
        'total'
      ]

      const _offsetDependentKeys = [
        'itemsPerPage',
        'page',
        'total'
      ]

      const _paginationTextDependentKeys = [
        '_offset',
        '_end',
        'total'
      ]

      expect(
        component._end._dependentKeys,
        'Dependent keys are correct for _end computed property'
      ).to.eql(_endDependentKeys)

      expect(
        component._isLeftDisabled._dependentKeys,
        'Dependent keys are correct for _isLeftDisabled computed property'
      ).to.eql(_isLeftDisabledDependentKeys)

      expect(
        component._isRightDisabled._dependentKeys,
        'Dependent keys are correct for _isRightDisabled computed property'
      ).to.eql(_isRightDisabledDependentKeys)

      expect(
        component._offset._dependentKeys,
        'Dependent keys are correct for _offset computed property'
      ).to.eql(_offsetDependentKeys)

      expect(
        component._paginationText._dependentKeys,
        'Dependent keys are correct for _paginationText computed property'
      ).to.eql(_paginationTextDependentKeys)
    })

    it('has the expected Mixins', function () {
      expect(
        PropTypeMixin.detect(component),
        'PropTypeMixin Mixin is present'
      ).to.eql(true)
    })
  }
)
