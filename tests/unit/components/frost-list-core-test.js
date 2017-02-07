import {expect} from 'chai'
import Ember from 'ember'
const {A} = Ember
import PropTypeMixin from 'ember-prop-types'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

import {unit} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'

const test = unit('frost-list-core')
describe(test.label, function () {
  test.setup()

  let component, sandbox

  beforeEach(function () {
    component = this.subject()
    sandbox = sinon.sandbox.create()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it.skip('includes className frost-list', function () {
    expect(component.classNames).to.include('frost-list')
  })

  it.skip('includes className frost-list-core', function () {
    expect(component.classNames).to.include('frost-list-core')
  })

  describe.skip('default property values', function () {
    it('sets alwaysUseDefaultHeight to false', function () {
      expect(
        component.get('alwaysUseDefaultHeight')
      ).to.eql(false)
    })

    it('sets idForFirstItem to null', function () {
      expect(
        component.get('idForFirstItem')
      ).to.eql(null)
    })

    it('sets key to @identity', function () {
      expect(
        component.get('key')
      ).to.eql('@identity')
    })

    it('sets scrollPosition to 0', function () {
      expect(
        component.get('scrollPosition')
      ).to.eql(0)
    })
  })

  it.skip('sets dependent keys correctly', function () {
    const _recordsDependentKeys = [
      'items.[]'
    ]

    const _hasHeaderDependentKeys = [
      'expansion',
      'pagination',
      'sorting'
    ]

    it('sets correct dependent keys for _records computed property', function () {
      expect(
        component._records._dependentKeys
      ).to.eql(_recordsDependentKeys)
    })
    it('sets correct dependent keys for _hasHeader computed property', function () {
      expect(
        component._hasHeader._dependentKeys
      ).to.eql(_hasHeaderDependentKeys)
    })
  })

  it.skip('has the expected Mixins', function () {
    expect(
      PropTypeMixin.detect(component)
    ).to.eql(true)
  })

  describe.skip('"_records" computed property', function () {
    it('is set correctly when items is not empty', function () {
      component.set('items', A([1, 2, 3, 4]))

      expect(
        component.get('_records')
      ).to.eql(A([1, 2, 3, 4]))
    })

    it('is set correctly when items is empty', function () {
      component.set('items', undefined)

      expect(
        component.get('_records')
      ).to.eql([])
    })
  })

  describe.skip('"_hasHeader" computed property', function () {
    it('is set to "true" when "sorting" and "expansion" are set', function () {
      const sorting = {sortProperty: 'sortProperty'}
      const expansion = {expansion: 'expansionMethod'}

      component.setProperties({sorting, expansion})

      expect(
        component.get('_hasHeader')
      ).to.eql(true)
    })

    it('is set to "true" when "sorting" is set', function () {
      const sorting = {sortProperty: 'sortProperty'}

      component.set('sorting', sorting)

      expect(
        component.get('_hasHeader')
      ).to.eql(true)
    })

    it('is set to "true" when "expansion" is set', function () {
      const expansion = {expansion: 'expansionMethod'}

      component.set('expansion', expansion)

      expect(
        component.get('_hasHeader')
      ).to.eql(true)
    })

    it('is set to "false" when "sorting" and "expansion" are NOT set', function () {
      expect(
        component.get('_hasHeader')
      ).to.eql(false)
    })
  })

  describe.skip('"checkExpansionValidity" function', function () {
    it('returns "true" when expansion is set properly', function () {
      const expansion = {
        onCollapseAll: function () {},
        onExpandAll: function () {}
      }

      expect(
        component.checkExpansionValidity(expansion)
      ).to.eql(true)
    })

    it('returns "false" when "onExpandAll" function is missing in "expansion"', function () {
      const expansion = {
        onExpandAll: function () {}
      }

      expect(
        component.checkExpansionValidity(expansion)
      ).to.eql(false)
    })

    it('returns "false" when "onCollapseAll" function is missing in "expansion"', function () {
      const expansion = {
        onCollapseAll: function () {}
      }

      expect(
        component.checkExpansionValidity(expansion)
      ).to.eql(false)
    })
  })

  describe.skip('"checkSelectionValidity" function', function () {
    it('returns "true" when "selection" is set Properly', function () {
      const selection = {
        onSelect: function () {}
      }

      expect(
        component.checkSelectionValidity(selection)
      ).to.eql(true)
    })

    it('returns "false" when "onSelect" function is missing in "selection"', function () {
      const selection = {}

      expect(
        component.checkSelectionValidity(selection)
      ).to.eql(false)
    })
  })

  describe.skip('"checkSortingValidity" function', function () {
    it('returns "false" when "sorting" is NOT set properly', function () {
      const sorting = {}

      expect(
        component.checkSortingValidity(sorting)
      ).to.eql(false)
    })

    it('returns "false" when "activeSorting" and "properties" are missing in "sorting"', function () {
      const sorting = {
        onSort: function () {}
      }

      expect(
        component.checkSortingValidity(sorting)
      ).to.eql(false)
    })

    it('returns "false" when "activeSorting" is missing in "sorting"', function () {
      const sorting = {
        onSort: function () {},
        properties: []
      }

      expect(
        component.checkSortingValidity(sorting)
      ).to.eql(false)
    })

    it('returns "true" when "sorting" is set properly', function () {
      const sorting = {
        onSort: function () {},
        properties: [],
        activeSorting: []
      }

      expect(
        component.checkSortingValidity(sorting)
      ).to.eql(true)
    })
  })

  describe.skip('"_findElementsInBetween" function', function () {
    let array = []
    beforeEach(function () {
      for (let i = 0; i < 10; i++) {
        array.push({
          id: i
        })
      }
    })

    it('returns result array when all attributes are provided', function () {
      expect(
        component._findElementsInBetween(array, array[2], array[6]).length
      ).to.eql(5)
    })

    describe('returns last element when "firstElement" is missing', function () {
      it('returns only one element', function () {
        let result = component._findElementsInBetween(array, undefined, array[6])
        expect(
          result.length
        ).to.eql(1)
      })

      it('returns the last element id', function () {
        let result = component._findElementsInBetween(array, undefined, array[6])
        expect(
          result[0].id
        ).to.eql(6)
      })
    })
  })

  describe.skip('"selectItem" action', function () {
    const testItems = A([
      {
        id: '1'
      },
      {
        id: '2'
      },
      {
        id: '3'
      }
    ])

    it('updates persistedClickState with correct object', function () {
      const persistedClickState = {
        clickedRecord: {
          id: '1'
        },
        isSelected: true
      }

      const updatedPersistedClickState = {
        clickedRecord: {
          id: '3'
        },
        isSelected: true
      }
      const mockAttrs = {
        selectDesc: {
          isSelected: true,
          isTargetSelectionIndicator: false
        },
        record: {
          id: '3'
        }
      }

      component.set('persistedClickState', persistedClickState)
      component.send('selectItem', {}, mockAttrs)

      expect(
        component.get('persistedClickState')
      ).to.eql(updatedPersistedClickState)
    })

    it('triggers shiftKey selection', function () {
      const mockEvent = {
        shiftKey: true
      }

      const mockAttrs = {
        selectDesc: {
          isSelected: true,
          isTargetSelectionIndicator: false
        },
        record: {
          id: '3'
        }
      }

      const mockPersistedClickState = {
        isSelected: true,
        clickedRecord: {
          id: '1'
        }
      }
      const resultObject = {
        records: A([
          {
            id: '1'
          },
          {
            id: '2'
          },
          {
            id: '3'
          }
        ]),
        selectDesc: {
          isSelected: true,
          isTargetSelectionIndicator: false,
          isShiftSelect: true
        }
      }

      component.setProperties(
        {
          'onSelect': sandbox.spy(),
          '_records': testItems,
          'persistedClickState': mockPersistedClickState
        }
      )
      component.send('selectItem', mockEvent, mockAttrs)

      expect(
        component.get('onSelect').calledWith(resultObject),
        'calls onSelect() with the correct object'
      ).to.eql(true)
    })

    it('triggers command/control key selection', function () {
      const mockEvent = {
        shiftKey: false,
        ctrlKey: true
      }

      const mockAttrs = {
        selectDesc: {
          isSelected: true,
          isTargetSelectionIndicator: false
        },
        record: {
          id: '3'
        }
      }

      const mockPersistedClickState = {
        isSelected: true,
        clickedRecord: {
          id: '1'
        }
      }
      const resultObject = {
        records: A([
          {
            id: '3'
          }
        ]),
        selectDesc: {
          isSelected: true,
          isTargetSelectionIndicator: false,
          isShiftSelect: false,
          isCtrlSelect: true
        }
      }

      component.setProperties(
        {
          'onSelect': sandbox.spy(),
          '_records': testItems,
          'persistedClickState': mockPersistedClickState
        }
      )
      component.send('selectItem', mockEvent, mockAttrs)

      expect(
        component.get('onSelect').calledWith(resultObject),
        'calls onSelect() with the correct object'
      ).to.eql(true)
    })

    it('triggers single item selection', function () {
      const mockEvent = {
        shiftKey: false
      }

      const mockAttrs = {
        selectDesc: {
          isSelected: true,
          isTargetSelectionIndicator: false
        },
        record: {
          id: '1'
        }
      }

      const resultObject = {
        records: A([
          {
            id: '1'
          }
        ]),
        selectDesc: {
          isSelected: true,
          isTargetSelectionIndicator: false,
          isShiftSelect: false
        }
      }

      component.setProperties(
        {
          'onSelect': sandbox.spy(),
          '_records': testItems
        }
      )
      component.send('selectItem', mockEvent, mockAttrs)

      expect(
        component.get('onSelect').calledWith(resultObject),
        'calls onSelect() with the correct object'
      ).to.eql(true)
    })
  })
})
