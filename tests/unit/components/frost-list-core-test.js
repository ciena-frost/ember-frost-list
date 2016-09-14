import {expect} from 'chai'
import Ember from 'ember'
const {run} = Ember
import {describeComponent} from 'ember-mocha'
import PropTypeMixin from 'ember-prop-types'
import {
  afterEach,
  beforeEach,
  describe,
  it
} from 'mocha'
import sinon from 'sinon'

describeComponent(
  'frost-list-core',
  'Unit: FrostListCore',
  {
    unit: true
  },
  function () {
    let component

    beforeEach(function () {
      component = this.subject()
    })

    it('includes className frost-list', function () {
      expect(component.classNames).to.include('frost-list')
    })

    it('includes className frost-list-core', function () {
      expect(component.classNames).to.include('frost-list-core')
    })

    it('sets default properties value correct', function () {
      expect(component.get('alwaysUseDefaultHeight'),
      'alwaysUseDefaultHeight: false'
      ).to.be.false

      expect(component.get('defaultHeight'),
        'defaultHeight: 45'
      ).to.eql(45)

      expect(component.get('idForFirstItem'),
        'idForFirstItem: null'
      ).to.be.null

      expect(component.get('key'),
        'key: @identity'
      ).to.eql('@identity')

      expect(component.get('scrollPosition'),
        'scrollPosition: 0'
      ).to.eql(0)
    })

    it('sets dependent keys correctly', function () {
      const _recordsDependentKeys = [
        'items.[]'
      ]

      const _hasHeaderDependentKeys = [
        'sorting',
        'expansion'
      ]

      expect(
        component._records._dependentKeys,
        'Dependent keys are correct for _records computed property'
      ).to.eql(_recordsDependentKeys)

      expect(
        component._hasHeader._dependentKeys,
        'Dependent keys are correct for _hasHeader computed property'
      ).to.eql(_hasHeaderDependentKeys)
    })

    it('has the expected Mixins', function () {
      expect(
        PropTypeMixin.detect(component),
        'PropTypeMixin Mixin is present'
      ).to.be.true
    })

    describe('"_records" computed property', function () {
      it('is set correctly', function () {
        const items = [1, 2, 3, 4]
        run(() => { component.set('items', items) })
        expect(component.get('_records')).to.eql(items)
      })

      it('is set correctly when items is undefined', function () {
        const items = undefined
        run(() => { component.set('items', items) })
        expect(component.get('_records')).to.eql([])
      })

      it('is set correctly when items is null', function () {
        const items = null
        run(() => { component.set('items', items) })
        expect(component.get('_records')).to.eql([])
      })
    })

    describe('"_hasHeader" computed property', function () {
      it('is set to "true" when "sorting" and "expansion" are set', function () {
        const sorting = {sortProperty: 'sortProperty'}
        const expansion = {expansion: 'expansionMethod'}

        run(() => {
          component.set('sorting', sorting)
          component.set('expansion', expansion)
        })

        expect(
          component.get('_hasHeader'),
          '_hasHeader: "true"'
        ).to.be.true
      })

      it('is set to "true" when "sorting" is set', function () {
        const sorting = {sortProperty: 'sortProperty'}

        run(() => {
          component.set('sorting', sorting)
        })

        expect(
          component.get('_hasHeader'),
          '_hasHeader: "true"'
        ).to.be.true
      })

      it('is set to "true" when "expansion" is set', function () {
        const expansion = {expansion: 'expansionMethod'}

        run(() => {
          component.set('expansion', expansion)
        })

        expect(
          component.get('_hasHeader'),
          '_hasHeader: "true"'
        ).to.be.true
      })

      it('is set to "false" when both "sorting" and "expansion" are NOT set', function () {
        expect(
          component.get('_hasHeader'),
          '_hasHeader: "false"'
        ).to.be.false
      })
    })

    describe('"checkExpansionValidity" function', function () {
      it('returns "true" when expansion is set Properly', function () {
        const expansion = {
          onCollapseAll: function () {},
          onExpandAll: function () {}
        }

        expect(
          component.checkExpansionValidity(expansion),
          'isExpansionValid: "true"'
        ).to.be.true
      })

      it('returns "false" when "onExpandAll" function is missing in "expansion"', function () {
        const expansion = {
          onExpandAll: function () {}
        }

        expect(
          component.checkExpansionValidity(expansion),
          'isExpansionValid: "false"'
        ).to.be.false
      })

      it('returns "false" when "onCollapseAll" function is missing in "expansion"', function () {
        const expansion = {
          onCollapseAll: function () {}
        }

        expect(
          component.checkExpansionValidity(expansion),
          'isExpansionValid: "false"'
        ).to.be.false
      })
    })

    describe('"checkSelectionValidity" function', function () {
      it('returns "true" when "selection" is set Properly', function () {
        const selection = {
          onSelect: function () {}
        }

        expect(
          component.checkSelectionValidity(selection),
          'isSelectionValid: "true"'
        ).to.be.true
      })

      it('returns "false" when "onSelect" function is missing in "selection"', function () {
        const selection = {}

        expect(
          component.checkSelectionValidity(selection),
          'isSelectionValid: "true"'
        ).to.be.false
      })
    })

    describe('"checkSortingValidity" function', function () {
      let selection = {}

      it('returns "false" when "sorting" is NOT set Properly', function () {
        expect(
          component.checkSortingValidity(selection),
          'isSortingValid: "false"'
        ).to.be.false
      })

      it('returns "false" when "activeSorting" and "properties" are missing in "sorting"', function () {
        Object.defineProperty(selection, 'onSort', {value: function () {}})

        expect(
          component.checkSortingValidity(selection),
          'isSortingValid: "false"'
        ).to.be.false
      })

      it('returns "false" when "activeSorting" is missing in "sorting"', function () {
        Object.defineProperty(selection, 'properties', {value: []})

        expect(
          component.checkSortingValidity(selection),
          'isSortingValid: "false"'
        ).to.be.false
      })

      it('returns "true" when "selection" is set properly', function () {
        Object.defineProperty(selection, 'activeSorting', {value: []})

        expect(
          component.checkSortingValidity(selection),
          'isSortingValid: "true"'
        ).to.be.true
      })
    })

    describe('"_findElementsInBetween" function', function () {
      let array = []
      for (let i = 0; i < 10; i++) {
        array.push({
          id: i
        })
      }

      it('returns result array when all attributes are provided', function () {
        expect(
          component._findElementsInBetween(array, array[2], array[6]).length,
          'isSelectionValid: "true"'
        ).to.eql(5)
      })

      it('returns last element when "firstElement" is missing', function () {
        let result = component._findElementsInBetween(array, undefined, array[6])
        expect(
          result.length,
          'result array contains one element'
        ).to.eql(1)

        expect(
          result[0].id,
          'result: {id: 6}'
        ).to.eql(6)
      })
    })
  }
)
