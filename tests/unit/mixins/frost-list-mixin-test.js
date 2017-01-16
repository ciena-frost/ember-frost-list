// import { expect } from 'chai'
// import { beforeEach, describe, it } from 'mocha'
// import Ember from 'ember'
// const { A, Controller, on } = Ember
// import FrostListMixin from 'ember-frost-list/mixins/frost-list-mixin'
// import FrostListSelectionMixin from 'ember-frost-list/mixins/frost-list-selection-mixin'
// import FrostListExpansionMixin from 'ember-frost-list/mixins/frost-list-expansion-mixin'
// import FrostListSortingMixin from 'ember-frost-list/mixins/frost-list-sorting-mixin'

// describe.skip('Unit: FrostListMixin', function () {
//   const testItems = [
//     {
//       id: '1'
//     }
//   ]
//   let subject

//   beforeEach(function () {
//     let testObject = Controller.extend(FrostListMixin)
//     subject = testObject.create({
//       listConfig: {
//         items: 'model'
//       }
//     })

//     subject.set('model', testItems)
//   })

//   it('successfully mixed', function () {
//     expect(
//       subject
//     ).to.be.ok
//   })

//   describe('expected Mixins', function () {
//     it('has FrostListSelectionMixin Mixin', function () {
//       expect(
//         FrostListSelectionMixin.detect(subject)
//       ).to.eql(true)
//     })

//     it('has FrostListExpansionMixin Mixin', function () {
//       expect(
//         FrostListExpansionMixin.detect(subject)
//       ).to.eql(true)
//     })

//     it('has FrostListSortingMixin Mixin', function () {
//       expect(
//         FrostListSortingMixin.detect(subject)
//       ).to.eql(true)
//     })
//   })

//   it('sets dependent keys correctly', function () {
//     const listMixinConfigDependentKeys = [
//       'activeSorting',
//       'sortableProperties',
//       'statefulListItems.[]'
//     ]

//     expect(
//       subject.listMixinConfig._dependentKeys
//     ).to.eql(listMixinConfigDependentKeys)
//   })

//   describe('"listMixinConfig" computed property', function () {
//     let listMixinConfig

//     beforeEach(function () {
//       let list = A()
//       list.addObject({
//         id: '1',
//         isExpanded: false
//       })

//       const mixinTestObject = Controller.extend(FrostListMixin)
//       const mixin = mixinTestObject.create({
//         listConfig: {
//           items: 'model',
//           sorting: {
//             active: [],
//             properties: []
//           }
//         },
//         initListMixin: on('init', function () {
//           this.set('_selectItem', '_selectItem')
//           this.set('_collapseItems', '_collapseItems')
//           this.set('_expandItems', '_expandItems')
//           this.set('_collapseItem', '_collapseItem')
//           this.set('_expandItem', '_expandItem')
//           this.set('_sortItems', '_sortItems')
//           this.set('_loadNext', '_loadNext')
//           this.set('_loadPrevious', '_loadPrevious')
//         })
//       })

//       mixin.setProperties(
//         {
//           'model': list,
//           'listConfig.component': 'my-list-item',
//           'activeSorting': [],
//           'properties': []
//         }
//       )

//       listMixinConfig = mixin.get('listMixinConfig')
//     })

//     it('has "items" property', function () {
//       expect(
//         listMixinConfig
//       ).to.have.property('items')
//     })

//     it('has component" property', function () {
//       expect(
//         listMixinConfig
//       ).to.have.property('component', 'my-list-item')
//     })

//     it('has "expansion" property with correct structure', function () {
//       expect(
//         listMixinConfig
//       ).to.have.property('expansion')
//         .that.deep.equals({
//           onCollapseAll: '_collapseItems',
//           onExpandAll: '_expandItems'
//         })
//     })

//     it('has "selection" propery with correct structure', function () {
//       expect(
//         listMixinConfig
//         ).to.have.property('selection')
//           .that.deep.equals({
//             onSelect: '_selectItem'
//           })
//     })

//     it('has "sorting" propery with correct structure', function () {
//       expect(
//         listMixinConfig,
//         '"sorting" propery exists and has correct structure'
//         ).to.have.property('sorting')
//           .that.deep.equals({
//             activeSorting: [],
//             properties: [],
//             onSort: '_sortItems'
//           })
//     })

//     it('has "infiniteScroll" propery with correct structure', function () {
//       expect(
//         listMixinConfig,
//         '"infiniteScroll" propery exists and has correct structure'
//         ).to.have.property('infiniteScroll')
//           .that.deep.equals({
//             loadNext: '_loadNext',
//             loadPrevious: '_loadPrevious'
//           })
//     })
//   })
// })
