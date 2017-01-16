// import Ember from 'ember'
// import { expect } from 'chai'
// const { A, Object } = Ember
// import { beforeEach, describe, it } from 'mocha'
// import { updateSelectedItemsHash, normalizeSort, defaultSort } from 'ember-frost-list/utils/utils'

// describe('Unit: Utils', function () {
//   describe('updateSelectedItemsHash function', function () {
//     describe('single item or multiple items selection', function () {
//       describe('single item selection', function () {
//         let attr

//         beforeEach(function () {
//           attr = Object.create({
//             selectDesc: {
//               isSelected: true,
//               isShiftSelect: false
//             },
//             records: [
//               {
//                 id: '1'
//               }
//             ]
//           })
//         })

//         it('updates selection', function () {
//           expect(
//             updateSelectedItemsHash(Object.create(), attr)
//           ).to.eql(Object.create({ 1: true }))
//         })

//         it('clicks on the item but not the check box', function () {
//           const selections = Object.create({
//             2: true,
//             3: true
//           })

//           expect(
//             updateSelectedItemsHash(selections, attr),
//             'previous selected record/records are deleted'
//           ).to.eql(Object.create({ 1: true }))
//         })
//       })

//       describe('shiftKey selection', function () {
//         let attr

//         beforeEach(function () {
//           attr = Object.create({
//             selectDesc: {
//               isSelected: true,
//               isShiftSelect: true
//             },
//             records: [
//               {
//                 id: '1'
//               }
//             ]
//           })
//         })

//         it('updates selections', function () {
//           expect(
//             updateSelectedItemsHash(Object.create(), attr)
//           ).to.eql(Object.create({ 1: true }))
//         })
//       })

//       describe('control or command key selection', function () {
//         let attr

//         beforeEach(function () {
//           attr = Object.create({
//             selectDesc: {
//               isSelected: true,
//               isShiftSelect: false,
//               isCtrlSelect: true
//             },
//             records: [
//               {
//                 id: '2'
//               }
//             ]
//           })
//         })

//         it('updates selections and does NOT delete prevous record/records', function () {
//           expect(
//             updateSelectedItemsHash(Object.create({ 1: true }), attr)
//           ).to.eql(Object.create(
//             {
//               1: true,
//               2: true
//             })
//           )
//         })
//       })
//     })

//     describe('unselect item', function () {
//       let attr

//       beforeEach(function () {
//         attr = Object.create({
//           selectDesc: {
//             isSelected: false
//           },
//           records: [
//             {
//               id: '1'
//             }
//           ]
//         })
//       })

//       it('deletes id from selections', function () {
//         expect(
//           updateSelectedItemsHash(Object.create({ 1: true }), attr)
//         ).to.eql(Object.create())
//       })
//     })
//   })

//   describe('normalizeSort function', function () {
//     describe('sort array is NOT present', function () {
//       it('returns empty array', function () {
//         expect(
//           normalizeSort()
//         ).to.eql([])
//       })
//     })

//     describe('sort array exists', function () {
//       it('returns output prefixed with "-"', function () {
//         const sort = A([
//           {
//             direction: ':desc',
//             value: 'label'
//           }
//         ])

//         expect(
//           normalizeSort(sort)
//         ).to.eql(A(['-label']))
//       })

//       it('returns output prefixed with no "-"', function () {
//         const sort = A([
//           {
//             direction: ':asc',
//             value: 'label'
//           }
//         ])

//         expect(
//           normalizeSort(sort)
//         ).to.eql(A(['label']))
//       })
//     })
//   })

//   describe('defaultSort function', function () {
//     describe('sortProperties is NOT present', function () {
//       it('returns and does nothing', function () {
//         expect(
//           defaultSort(Object.create())
//         ).to.eql(undefined)
//       })
//     })

//     describe('sortProperties is present', function () {
//       it('sorts items in ascending order', function () {
//         const sortProperties = A(['label'])

//         const items = A([
//           {
//             label: '2'
//           },
//           {
//             label: '1'
//           }
//         ])

//         const sortedItems = A([
//           {
//             label: '1'
//           },
//           {
//             label: '2'
//           }
//         ])

//         expect(
//           defaultSort(items, sortProperties)
//         ).to.eql(sortedItems)
//       })

//       it('sorts items in descending order', function () {
//         const sortProperties = A(['-label'])

//         const items = A([
//           {
//             label: '1'
//           },
//           {
//             label: '2'
//           }
//         ])

//         const sortedItems = A([
//           {
//             label: '2'
//           },
//           {
//             label: '1'
//           }
//         ])

//         expect(
//           defaultSort(items, sortProperties)
//         ).to.eql(sortedItems)
//       })
//     })
//   })
// })

