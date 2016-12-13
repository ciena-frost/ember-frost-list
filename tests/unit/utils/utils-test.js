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
	  })

	  describe('unselect item', function () {
	  	let selections, attr

	  	beforeEach(function () {
	  		selections =  Object.create({ 1: true })

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
		describe('sort array does NOT exist', function () {
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
						direction: ":desc",
						value: "label"
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

	})
})

