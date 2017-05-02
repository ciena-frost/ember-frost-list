import {expect} from 'chai'
import Ember from 'ember'
const {A} = Ember
import selection from 'ember-frost-list/utils/selection'
import {afterEach, before, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

describe('Unit / Utility / selection', function () {
  const itemComparator = function (lhs, rhs) {
    return lhs === rhs
  }
  let sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('basic()', function () {
    const itemComparator = function (lhs, rhs) {
      return lhs === rhs
    }
    let newSelectedItem
    let previouslySelectedItem
    let rangeState
    let selectedItems

    describe('when selectedItems[] has one item and a new item is selected', function () {
      before(function () {
        newSelectedItem = Ember.Object.create({id: 1})
        previouslySelectedItem = Ember.Object.create({id: 0})
        rangeState = {
          anchor: null,
          endpoint: 'testId'
        }
        selectedItems = A([previouslySelectedItem])
        selection.basic(selectedItems, newSelectedItem, rangeState, itemComparator)
      })

      it('should set the new item in "selectedItems[]"', function () {
        expect(selectedItems[0]).to.have.property('id', 1)
      })

      // eslint-disable-next-line quotes
      it(`should set the "rangeState['anchor']"`, function () {
        expect(rangeState).to.have.deep.property('anchor.id', 1)
      })

      // eslint-disable-next-line quotes
      it(`should reset the "rangeState['endpoint']" to "null"`, function () {
        expect(rangeState.endpoint).to.equal(null)
      })
    })

    describe('when selectedItems[] has more than one item', function () {
      let anotherPreviouslySelectedItem
      before(function () {
        anotherPreviouslySelectedItem = Ember.Object.create({id: 2})
        newSelectedItem = Ember.Object.create({id: 1})
        previouslySelectedItem = Ember.Object.create({id: 0})
        rangeState = {
          anchor: null,
          endpoint: 'testId'
        }
        selectedItems = A([previouslySelectedItem, anotherPreviouslySelectedItem])
        selection.basic(selectedItems, newSelectedItem, rangeState, itemComparator)
      })

      it('should set the new item in "selectedItems[]"', function () {
        expect(selectedItems[0]).to.have.property('id', 1)
      })

      // eslint-disable-next-line quotes
      it(`should set the "rangeState['anchor']"`, function () {
        expect(rangeState).to.have.deep.property('anchor.id', 1)
      })

      // eslint-disable-next-line quotes
      it(`should reset the "rangeState['endpoint']" to "null"`, function () {
        expect(rangeState.endpoint).to.equal(null)
      })
    })

    describe('when selectedItems[] has more than one item and the new selected item is already in the []', function () {
      let anotherPreviouslySelectedItem
      before(function () {
        anotherPreviouslySelectedItem = Ember.Object.create({id: 2})
        previouslySelectedItem = Ember.Object.create({id: 0})
        rangeState = {
          anchor: null,
          endpoint: 'testId'
        }
        selectedItems = A([previouslySelectedItem, anotherPreviouslySelectedItem])
        selection.basic(selectedItems, anotherPreviouslySelectedItem, rangeState, itemComparator)
      })

      it('should reset "selectedItems[]" with the previously selected item', function () {
        expect(selectedItems[0]).to.have.property('id', 2)
      })

      // eslint-disable-next-line quotes
      it(`should set the "rangeState['anchor']"`, function () {
        expect(rangeState).to.have.deep.property('anchor.id', 2)
      })

      // eslint-disable-next-line quotes
      it(`should reset the "rangeState['endpoint']" to "null"`, function () {
        expect(rangeState.endpoint).to.equal(null)
      })
    })

    describe('when the item is already in "selectedItems[]"', function () {
      beforeEach(function () {
        newSelectedItem = Ember.Object.create({id: 2})
        previouslySelectedItem = Ember.Object.create({id: 0})
        rangeState = {
          anchor: null,
          endpoint: null
        }
        selectedItems = A([previouslySelectedItem])
        sandbox.stub(selection, '_findIndex').returns(0)
        selection.basic(selectedItems, previouslySelectedItem, rangeState, itemComparator)
      })

      it('should remove the item from "selectedItems[]"', function () {
        expect(selectedItems[0]).to.equal(undefined)
      })
    })
  })

  describe('specific()', function () {
    let newSelectedItem = Ember.Object.create({id: 1})
    let previouslySelectedItem = Ember.Object.create({id: 0})
    let rangeState = {
      anchor: null,
      endpoint: 'testId'
    }
    let selectedItems

    // eslint-disable-next-line quotes
    describe(`when "rangeState['endpoint']" has a value`, function () {
      beforeEach(function () {
        sandbox.stub(selection, '_findIndex').returns(-1)
        selectedItems = A([previouslySelectedItem])
        selection.specific(selectedItems, newSelectedItem, rangeState, itemComparator)
      })

      // eslint-disable-next-line quotes
      it(`should reset the "rangeState['endpoint']" to "null"`, function () {
        expect(rangeState.endpoint).to.equal(null)
      })
    })

    describe('when an item is not already in "selectedItems[]"', function () {
      beforeEach(function () {
        sandbox.stub(selection, '_findIndex').returns(-1)
        selectedItems = A([previouslySelectedItem])
        selection.specific(selectedItems, newSelectedItem, rangeState, itemComparator)
      })

      it('should add the new item to the "selectedItems[]"', function () {
        expect(selectedItems[1]).to.have.property('id', 1)
      })

      // eslint-disable-next-line quotes
      it(`should set "rangeState['anchor']" to the new item`, function () {
        expect(rangeState).to.have.deep.property('anchor.id', 1)
      })
    })

    describe('when an item is in "selectedItems[]" it is removed', function () {
      beforeEach(function () {
        sandbox.stub(selection, '_findIndex').returns(1)
        selectedItems = A([previouslySelectedItem, newSelectedItem])
        selection.specific(selectedItems, newSelectedItem, rangeState, itemComparator)
      })

      it('should not remove the other items', function () {
        expect(selectedItems[0]).to.have.property('id', 0)
      })

      it('should remove the correct item', function () {
        expect(selectedItems[1]).to.equal(undefined)
      })
    })
  })

  describe('_findIndex()', function () {
    const item0 = Ember.Object.create({id: 0})
    const item1 = Ember.Object.create({id: 1})
    const item2 = Ember.Object.create({id: 2})
    const testArray = [item0, item1]

    describe('when an item exists in the array', function () {
      it('should return the index of the item', function () {
        expect(selection._findIndex(testArray, item1, itemComparator)).to.equal(1)
      })
    })

    describe('when the item does not exist in the array', function () {
      it('should return "-1"', function () {
        expect(selection._findIndex(testArray, item2, itemComparator)).to.equal(-1)
      })
    })

    describe('when findIndex() does not exist', function () {
      let testEmberArray

      beforeEach(function () {
        sandbox.stub(selection, 'isSupportedInEnvironment').returns(false)
        testEmberArray = A([item0, item1])
      })

      describe('when an item exists in the array', function () {
        it('should return the index of the item', function () {
          expect(selection._findIndex(testEmberArray, item1, itemComparator)).to.equal(1)
        })
      })

      describe('when the item does not exist in the array', function () {
        it('should return "-1"', function () {
          expect(selection._findIndex(testEmberArray, item2, itemComparator)).to.equal(-1)
        })
      })
    })
  })

  describe('isSupportedInEnvironment()', function () {
    describe('when objectName is not an object', function () {
      it('returns false', function () {
        expect(selection.isSupportedInEnvironment('testObject', 'testMethod')).to.be.equal(false)
      })
    })

    describe('when methodName is not an string', function () {
      let testObject = {testMethod: function () {}}
      it('returns false', function () {
        expect(selection.isSupportedInEnvironment(testObject, 1)).to.be.equal(false)
      })
    })

    describe('when objectName is an "Object" and methodName is a "String"', function () {
      let testObject = {testMethod: function () {}}
      it('returns true', function () {
        expect(selection.isSupportedInEnvironment(testObject, 'testMethod')).to.be.equal(true)
      })
    })
  })

  describe('range()', function () {
    const item0 = Ember.Object.create({id: 0})
    const item1 = Ember.Object.create({id: 1})
    const item2 = Ember.Object.create({id: 2})
    const item3 = Ember.Object.create({id: 3})
    const item4 = Ember.Object.create({id: 4})
    let items = A([item0, item1, item2, item3, item4])
    let selectedItems
    let rangeState

    describe('when the selected item is not in "selectedItems[]"', function () {
      before(function () {
        rangeState = {
          anchor: null,
          endpoint: 'testId'
        }
        selectedItems = A([item0])
        selection.range(items, selectedItems, item2, rangeState, itemComparator)
      })

      // eslint-disable-next-line quotes
      it(`should set the "rangeState['anchor']"`, function () {
        expect(rangeState).to.have.deep.property('anchor.id', 2)
      })

      // eslint-disable-next-line quotes
      it(`should reset the "rangeState['endpoint']" to "null"`, function () {
        expect(rangeState.endpoint).to.equal(null)
      })

      it('should set the new item in "SelectedItems[]"', function () {
        expect(selectedItems[1]).to.have.property('id', 2)
      })
    })

    describe('when selecting a range when the anchor is less than the endpoint', function () {
      const testItems = [
        {in: 'item0', out: 0},
        {in: 'item1', out: 1},
        {in: 'item2', out: 2},
        {in: 'item3', out: 3}
      ]

      before(function () {
        selectedItems = A([])
        rangeState = {
          anchor: item0,
          endpoint: null
        }
        selection.range(items, selectedItems, item3, rangeState, itemComparator)
      })

      testItems.forEach((test) => {
        it(`should have ${test.in} in "selectedItems[]"`, function () {
          expect(selectedItems[test.out]).to.have.property('id', test.out)
        })
      })

      // eslint-disable-next-line quotes
      it(`should set the "rangeState['endpoint']" to the new selected item`, function () {
        expect(rangeState.endpoint).to.equal(item3)
      })
    })

    describe('when selecting a range when the anchor is greater than the endpoint', function () {
      const testItems = [
        {in: 'item0', out: 0},
        {in: 'item1', out: 1},
        {in: 'item2', out: 2},
        {in: 'item3', out: 3}
      ]

      before(function () {
        selectedItems = A([])
        rangeState = {
          anchor: item3,
          endpoint: null
        }
        selection.range(items, selectedItems, item0, rangeState, itemComparator)
      })

      testItems.forEach((test) => {
        it(`should have ${test.in} in "selectedItems[]"`, function () {
          expect(selectedItems[test.out]).to.have.property('id', test.out)
        })
      })

      // eslint-disable-next-line quotes
      it(`should set the "rangeState['endpoint']" to the new selected item`, function () {
        expect(rangeState.endpoint).to.equal(item0)
      })
    })

    describe('when there is an exising range selection', function () {
      describe('items outside the new range should be removed from the bottom of the list', function () {
        const testItems = [
          {in: 'item0', out: 0},
          {in: 'item1', out: 1}
        ]

        before(function () {
          selectedItems = A([item0, item1, item2, item3, item4])
          rangeState = {
            anchor: item0,
            endpoint: item4
          }
          selection.range(items, selectedItems, item1, rangeState, itemComparator)
        })

        testItems.forEach((test) => {
          it(`should have ${test.in} in "selectedItems[]"`, function () {
            expect(selectedItems[test.out]).to.have.property('id', test.out)
          })
        })

        // eslint-disable-next-line quotes
        it(`should set the "rangeState['endpoint']" to the new selected item`, function () {
          expect(rangeState.endpoint).to.equal(item1)
        })
      })

      describe('items outside the new range should be removed from the top of the list', function () {
        const testItems = [
          {in: 'item3', out: 3},
          {in: 'item4', out: 4}
        ]

        before(function () {
          selectedItems = A([item0, item1, item2, item3, item4])
          rangeState = {
            anchor: item4,
            endpoint: item0
          }
          selection.range(items, selectedItems, item3, rangeState, itemComparator)
        })

        testItems.forEach((test, index) => {
          it(`should have ${test.in} in "selectedItems[]"`, function () {
            expect(selectedItems[index]).to.have.property('id', test.out)
          })
        })

        // eslint-disable-next-line quotes
        it(`should set the "rangeState['endpoint']" to the new selected item`, function () {
          expect(rangeState.endpoint).to.equal(item3)
        })
      })

      describe('items in the range should be removed except for the top selected item', function () {
        const testItems = [
          {in: 'item1', out: 1}
        ]

        before(function () {
          selectedItems = A([item1, item2, item3, item4])
          rangeState = {
            anchor: item1,
            endpoint: item4
          }
          selection.range(items, selectedItems, item1, rangeState, itemComparator)
        })

        testItems.forEach((test, index) => {
          it(`should have ${test.in} in "selectedItems[]"`, function () {
            expect(selectedItems[index]).to.have.property('id', test.out)
          })
        })

        // eslint-disable-next-line quotes
        it(`should set the "rangeState['endpoint']" to the new selected item`, function () {
          expect(rangeState.endpoint).to.equal(item1)
        })
      })

      describe('items in the range should be removed except for the bottom selected item', function () {
        const testItems = [
          {in: 'item4', out: 4}
        ]

        before(function () {
          selectedItems = A([item1, item2, item3, item4])
          rangeState = {
            anchor: item4,
            endpoint: item1
          }
          selection.range(items, selectedItems, item4, rangeState, itemComparator)
        })

        testItems.forEach((test, index) => {
          it(`should have ${test.in} in "selectedItems[]"`, function () {
            expect(selectedItems[index]).to.have.property('id', test.out)
          })
        })

        // eslint-disable-next-line quotes
        it(`should set the "rangeState['endpoint']" to the new selected item`, function () {
          expect(rangeState.endpoint).to.equal(item4)
        })
      })

      describe('when using itemKey duplicate items are removed', function () {
        const itemKey = 'id'
        const testItems = [
          {in: 'item0', out: 0},
          {in: 'item1', out: 1},
          {in: 'item2', out: 2},
          {in: 'item3', out: 3},
          {in: 'item4', out: 4}
        ]

        before(function () {
          selectedItems = A([item0, item1, item2, item1, item3, item1, item4])
          rangeState = {
            anchor: item0,
            endpoint: null
          }
          selection.range(items, selectedItems, item1, rangeState, itemComparator, itemKey)
        })

        testItems.forEach((test, index) => {
          it(`should have ${test.in} in "selectedItems[]"`, function () {
            expect(selectedItems[index]).to.have.property('id', test.out)
          })
        })

        // eslint-disable-next-line quotes
        it(`should set the "rangeState['endpoint']" to the new selected item`, function () {
          expect(rangeState.endpoint).to.equal(item1)
        })
      })
    })
  })
})
