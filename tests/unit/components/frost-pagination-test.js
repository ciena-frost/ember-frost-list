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
        'PropTypeMixin Mixin is present'
      ).to.eql(true)
    })

    describe('_end computed property', function () {
      it('is set to pageMax NOT at the last page', function () {
        run(() => {
          component.set('itemsPerPage', 10)
          component.set('page', 5)
          component.set('total', 100)
        })

        const expectedPageMax = (component.get('page') + 1) * component.get('itemsPerPage')

        expect(
          component.get('_end'),
        ).to.eql(expectedPageMax)
      })

      it('is set to total at the last page', function () {
        run(() => {
          component.set('itemsPerPage', 10)
          component.set('page', 9)
          component.set('total', 100)
        })

        const total = component.get('total')

        expect(
          component.get('_end'),
        ).to.eql(total)
      })
    })

    describe('_isLeftDisabled computed property', function () {
      it('is set to true at the first page', function () {
        run(() => component.set('page', 0))

        expect(
          component.get('_isLeftDisabled'),
        ).to.eql(true)
      })

      it('is set to false NOT at the first page', function () {
        run(() => component.set('page', 5))

        expect(
          component.get('_isLeftDisabled'),
        ).to.eql(false)
      })
    })

    describe('_isRightDisabled computed property', function () {
      it('is set to true when total is equal to 0', function () {
        run(() => component.set('total', 0))

        expect(
          component.get('_isRightDisabled'),
        ).to.eql(true)
      })

      it('is set to true at the last page', function () {
        run(() => {
          component.set('itemsPerPage', 10)
          component.set('page', 9)
          component.set('total', 100)
        })

        expect(
          component.get('_isRightDisabled'),
        ).to.eql(true)
      })

      it('is set to false NOT at the last page', function () {
        run(() => { 
          component.set('itemsPerPage', 10)
          component.set('page', 5)
          component.set('total', 100)
        })

        expect(
          component.get('_isRightDisabled'),
        ).to.eql(false)
      })
    })

    describe('_offset computed property', function () {
      it('is set to 0 when total is equal to 0', function () {
        run(() => component.set('total', 0))

        expect(
          component.get('_offset'),
        ).to.eql(0)
      })

      it('is set to correct off set of that page', function () {
        run(() => {
          component.set('itemsPerPage', 10)
          component.set('page', 2)
          component.set('total', 100)
        })

        const page = component.get('page')
        const itemsPerPage = component.get('itemsPerPage')
        const expectedOffset = page * itemsPerPage + 1

        expect(
          component.get('_offset'),
        ).to.eql(expectedOffset)
      })
    })

    describe('_paginationText computed property', function () {
      it('is set to "0 results found" when total is equal to 0', function () {
        run(() => component.set('total', 0))

        expect(
          component.get('_paginationText'),
        ).to.eql('0 results found')
      })

      it('is set to "1 to 10 of 100" at frist page', function () {
        run(() => {
          component.set('itemsPerPage', 10)
          component.set('page', 0)
          component.set('total', 100)
        })

        expect(
          component.get('_paginationText'),
        ).to.eql('1 to 10 of 100')
      })
    })
  }
)
