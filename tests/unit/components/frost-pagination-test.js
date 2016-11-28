import { expect } from 'chai'
import { describeComponent } from 'ember-mocha'
import PropTypeMixin from 'ember-prop-types'
import { beforeEach, describe, it } from 'mocha'

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

    describe('dependent keys', function () {
      let _endDependentKeys,
        _isLeftDisabledDependentKeys,
        _isRightDisabledDependentKeys,
        _offsetDependentKeys,
        _paginationTextDependentKeys

      beforeEach(function () {
        _endDependentKeys = [
          'itemsPerPage',
          'page',
          'total'
        ]

        _isLeftDisabledDependentKeys = [
          'page'
        ]

        _isRightDisabledDependentKeys = [
          'itemsPerPage',
          'page',
          'total'
        ]

        _offsetDependentKeys = [
          'itemsPerPage',
          'page',
          'total'
        ]

        _paginationTextDependentKeys = [
          '_offset',
          '_end',
          'total'
        ]
      })

      it('sets correct dependent keys for _end computed property', function () {
        expect(
          component._end._dependentKeys,
        ).to.eql(_endDependentKeys)
      })
      it('sets correct dependent keys for _isLeftDisabled computed property', function () {
        expect(
          component._isLeftDisabled._dependentKeys,
        ).to.eql(_isLeftDisabledDependentKeys)
      })
      it('sets correct dependent keys for _isRightDisabled computed property', function () {
        expect(
          component._isRightDisabled._dependentKeys,
        ).to.eql(_isRightDisabledDependentKeys)
      })
      it('sets correct dependent keys for _offset computed property', function () {
        expect(
          component._offset._dependentKeys,
        ).to.eql(_offsetDependentKeys)
      })
      it('sets correct dependent keys for _paginationText computed property', function () {
        expect(
          component._paginationText._dependentKeys,
        ).to.eql(_paginationTextDependentKeys)
      })
    })

    it('has the expected Mixins', function () {
      expect(
        PropTypeMixin.detect(component),
      ).to.eql(true)
    })
  }
)
