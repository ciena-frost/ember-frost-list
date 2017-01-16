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

    it.skip('includes className frost-pagination', function () {
      expect(component.classNames).to.include('frost-pagination')
    })

    describe.skip('dependent keys', function () {
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

      it.skip('sets correct dependent keys for _end computed property', function () {
        expect(
          component._end._dependentKeys
        ).to.eql(_endDependentKeys)
      })

      it.skip('sets correct dependent keys for _isLeftDisabled computed property', function () {
        expect(
          component._isLeftDisabled._dependentKeys
        ).to.eql(_isLeftDisabledDependentKeys)
      })

      it.skip('sets correct dependent keys for _isRightDisabled computed property', function () {
        expect(
          component._isRightDisabled._dependentKeys
        ).to.eql(_isRightDisabledDependentKeys)
      })

      it.skip('sets correct dependent keys for _offset computed property', function () {
        expect(
          component._offset._dependentKeys
        ).to.eql(_offsetDependentKeys)
      })

      it.skip('sets correct dependent keys for _paginationText computed property', function () {
        expect(
          component._paginationText._dependentKeys
        ).to.eql(_paginationTextDependentKeys)
      })
    })

    it.skip('has the expected Mixins', function () {
      expect(
        PropTypeMixin.detect(component)
      ).to.eql(true)
    })

    describe.skip('_end computed property', function () {
      it('is set to pageMax when NOT on the last page', function () {
        const itemsPerPage = 10
        const page = 5
        const total = 100

        component.setProperties({itemsPerPage, page, total})

        // on page 5 would be item 51 to 60 so _end is 60
        expect(
          component.get('_end')
        ).to.eql(60)
      })

      it('is set to total on the last page', function () {
        const itemsPerPage = 10
        const page = 9
        const total = 100

        component.setProperties({itemsPerPage, page, total})
        const expectedResult = component.get('total')

        expect(
          component.get('_end')
        ).to.eql(expectedResult)
      })
    })

    describe.skip('_isLeftDisabled computed property', function () {
      it('is set to true on the first page', function () {
        component.set('page', 0)

        expect(
          component.get('_isLeftDisabled')
        ).to.eql(true)
      })

      it('is set to false when NOT on the first page', function () {
        component.set('page', 5)

        expect(
          component.get('_isLeftDisabled')
        ).to.eql(false)
      })
    })

    describe.skip('_isRightDisabled computed property', function () {
      it('is set to true when total is equal to 0', function () {
        component.set('total', 0)

        expect(
          component.get('_isRightDisabled')
        ).to.eql(true)
      })

      it('is set to true on the last page', function () {
        const itemsPerPage = 10
        const page = 9
        const total = 100

        component.setProperties({itemsPerPage, page, total})

        expect(
          component.get('_isRightDisabled')
        ).to.eql(true)
      })

      it('is set to false when NOT on the last page', function () {
        const itemsPerPage = 10
        const page = 5
        const total = 100

        component.setProperties({itemsPerPage, page, total})

        expect(
          component.get('_isRightDisabled')
        ).to.eql(false)
      })
    })

    describe.skip('_offset computed property', function () {
      it('is set to 0 when total is equal to 0', function () {
        component.set('total', 0)

        expect(
          component.get('_offset')
        ).to.eql(0)
      })

      it('is set to correct offset of that page', function () {
        const itemsPerPage = 10
        const page = 2
        const total = 100

        component.setProperties({itemsPerPage, page, total})

        // on page 2 would be item 21 to 30 so _offset is 21
        expect(
          component.get('_offset')
        ).to.eql(21)
      })
    })

    describe.skip('_paginationText computed property', function () {
      it('is set to "0 results found" when total is equal to 0', function () {
        component.set('total', 0)

        expect(
          component.get('_paginationText')
        ).to.eql('0 results found')
      })

      it('is set to "1 to 10 of 100" on the first page', function () {
        const itemsPerPage = 10
        const page = 0
        const total = 100

        component.setProperties({itemsPerPage, page, total})

        expect(
          component.get('_paginationText')
        ).to.eql('1 to 10 of 100')
      })
    })
  }
)
