import Ember from 'ember'
import { expect } from 'chai'
const { A, Object } = Ember
import { beforeEach, describe, it } from 'mocha'
import { updateSelectedItemsHash, normalizeSort, defaultSort } from 'ember-frost-list/utils/utils'

describe('Unit: Utils', function () {
  describe('updateSelectedItemsHash function', function () {
    describe('single item or multiple items selection', function () {
      describe('single item selection', function () {
        let attr

        beforeEach(function () {
          attr = Object.create({
            selectDesc: {
              isSelected: true,
              isShiftSelect: false
            },
            records: [
              {
                id: '1'
              }
            ]
          })
        })

        it('updates selection', function () {
          const selections = Object.create({})

          const updatedSelections = updateSelectedItemsHash(selections, attr)

          expect(
            updatedSelections
          ).to.eql(Object.create({ 1: true }))
        })

        it('clicks on the item but not the check box', function () {
          const selections = Object.create({
            2: true,
            3: true
          })

          const updatedSelections = updateSelectedItemsHash(selections, attr)

          expect(
            updatedSelections,
            'previous selected record/records are deleted'
          ).to.eql(Object.create({ 1: true }))
        })
      })

      describe('shiftKey selection', function () {
        let selections, attr

        beforeEach(function () {
          selections = Object.create({})

          attr = Object.create({
            selectDesc: {
              isSelected: true,
              isShiftSelect: true
            },
            records: [
              {
                id: '1'
              }
            ]
          })
        })

        it('updates selections', function () {
          const updatedSelections = updateSelectedItemsHash(selections, attr)

          expect(
            updatedSelections
          ).to.eql(Object.create({ 1: true }))
        })
      })

      describe('control or command key selection', function () {
        let selections, attr

        beforeEach(function () {
          selections = Object.create({ 1: true })

          attr = Object.create({
            selectDesc: {
              isSelected: true,
              isShiftSelect: false,
              isCtrlSelect: true
            },
            records: [
              {
                id: '2'
              }
            ]
          })
        })

        it('updates selections and does NOT delete prevous record/records', function () {
          const updatedSelections = updateSelectedItemsHash(selections, attr)
          const expectedSelections = Object.create({
            1: true,
            2: true
          })

          expect(
            updatedSelections
          ).to.eql(expectedSelections)
        })
      })
    })

    describe('unselect item', function () {
      let selections, attr

      beforeEach(function () {
        selections = Object.create({ 1: true })

        attr = Object.create({
          selectDesc: {
            isSelected: false
          },
          records: [
            {
              id: '1'
            }
          ]
        })
      })

      it('deletes id from selections', function () {
        const updatedSelections = updateSelectedItemsHash(selections, attr)

        expect(
          updatedSelections
        ).to.eql(Object.create({}))
      })
    })
  })

  describe('normalizeSort function', function () {
    describe('sort array is NOT present', function () {
      it('returns empty array', function () {
        const normalizedSort = normalizeSort('')

        expect(
          normalizedSort
        ).to.eql([])
      })
    })

    describe('sort array exists', function () {
      let sort

      beforeEach(function () {
        sort = A([
          {
            direction: ':desc',
            value: 'label'
          }
        ])
      })

      it('returns correct output', function () {
        const normalizedSort = normalizeSort(sort)

        expect(
          normalizedSort
        ).to.eql(A(['-label']))
      })
    })
  })

  describe('defaultSort function', function () {
    describe('sortProperties is NOT present', function () {
      it('returns and does nothing', function () {
        const items = Object.create({})
        defaultSort(items, '')

        expect(
          items
        ).to.eql(Object.create({}))
      })
    })
    describe('sortProperties is present', function () {
      it('sorts items in ascending order', function () {
        const sortProperties = A(['label'])

        const items = A([
          {
            label: '2'
          },
          {
            label: '1'
          }
        ])

        const sortedItems = A([
          {
            label: '1'
          },
          {
            label: '2'
          }
        ])
        const sortedArray = defaultSort(items, sortProperties)

        expect(
          sortedArray
        ).to.eql(sortedItems)
      })

      it('sorts items in descending order', function () {
        const sortProperties = A(['-label'])

        const items = A([
          {
            label: '1'
          },
          {
            label: '2'
          }
        ])

        const sortedItems = A([
          {
            label: '2'
          },
          {
            label: '1'
          }
        ])
        const sortedArray = defaultSort(items, sortProperties)

        expect(
          sortedArray
        ).to.eql(sortedItems)
      })
    })
  })
})

