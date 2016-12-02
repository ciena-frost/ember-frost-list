import { expect } from 'chai'
import Ember from 'ember'
const { run } = Ember
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
          component._end._dependentKeys
        ).to.eql(_endDependentKeys)
      })

      it('sets correct dependent keys for _isLeftDisabled computed property', function () {
        expect(
          component._isLeftDisabled._dependentKeys
        ).to.eql(_isLeftDisabledDependentKeys)
      })

      it('sets correct dependent keys for _isRightDisabled computed property', function () {
        expect(
          component._isRightDisabled._dependentKeys
        ).to.eql(_isRightDisabledDependentKeys)
      })

      it('sets correct dependent keys for _offset computed property', function () {
        expect(
          component._offset._dependentKeys
        ).to.eql(_offsetDependentKeys)
      })

      it('sets correct dependent keys for _paginationText computed property', function () {
        expect(
          component._paginationText._dependentKeys
        ).to.eql(_paginationTextDependentKeys)
      })
    })

    it('has the expected Mixins', function () {
      expect(
        PropTypeMixin.detect(component)
      ).to.eql(true)
    })

    describe('_end computed property', function () {
      it('is set to pageMax when NOT on the last page', function () {
        run(() => {
          component.set('itemsPerPage', 10)
          component.set('page', 5)
          component.set('total', 100)
        })

        // on page 5 would be item 51 to 60 so _end is 60
        expect(
          component.get('_end')
        ).to.eql(60)
      })

      it('is set to total on the last page', function () {
        run(() => {
          component.set('itemsPerPage', 10)
          component.set('page', 9)
          component.set('total', 100)
        })

        const total = component.get('total')

        expect(
          component.get('_end')
        ).to.eql(total)
      })
    })

    describe('_isLeftDisabled computed property', function () {
      it('is set to true on the first page', function () {
        run(() => component.set('page', 0))

        expect(
          component.get('_isLeftDisabled')
        ).to.eql(true)
      })

      it('is set to false when NOT on the first page', function () {
        run(() => component.set('page', 5))

        expect(
          component.get('_isLeftDisabled')
        ).to.eql(false)
      })
    })

    describe('_isRightDisabled computed property', function () {
      it('is set to true when total is equal to 0', function () {
        run(() => component.set('total', 0))

        expect(
          component.get('_isRightDisabled')
        ).to.eql(true)
      })

      it('is set to true on the last page', function () {
        run(() => {
          component.set('itemsPerPage', 10)
          component.set('page', 9)
          component.set('total', 100)
        })

        expect(
          component.get('_isRightDisabled')
        ).to.eql(true)
      })

      it('is set to false when NOT on the last page', function () {
        run(() => {
          component.set('itemsPerPage', 10)
          component.set('page', 5)
          component.set('total', 100)
        })

        expect(
          component.get('_isRightDisabled')
        ).to.eql(false)
      })
    })

    describe('_offset computed property', function () {
      it('is set to 0 when total is equal to 0', function () {
        run(() => component.set('total', 0))

        expect(
          component.get('_offset')
        ).to.eql(0)
      })

      it('is set to correct offset of that page', function () {
        run(() => {
          component.set('itemsPerPage', 10)
          component.set('page', 2)
          component.set('total', 100)
        })

        // on page 2 would be item 21 to 30 so _offset is 21
        expect(
          component.get('_offset')
        ).to.eql(21)
      })
    })

    describe('_paginationText computed property', function () {
      it('is set to "0 results found" when total is equal to 0', function () {
        run(() => component.set('total', 0))

        expect(
          component.get('_paginationText')
        ).to.eql('0 results found')
      })

      it('is set to "1 to 10 of 100" on the first page', function () {
        run(() => {
          component.set('itemsPerPage', 10)
          component.set('page', 0)
          component.set('total', 100)
        })

        expect(
          component.get('_paginationText')
        ).to.eql('1 to 10 of 100')
      })
    })
  }
)
