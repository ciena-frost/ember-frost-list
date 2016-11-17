import {expect} from 'chai'
import {
  beforeEach,
  describe,
  it
} from 'mocha'
import Ember from 'ember'
const {
  Object,
  run
} = Ember
import FrostListCoreMixin from 'ember-frost-list/mixins/frost-list-core-mixin'

describe('Unit: FrostListCoreMixin', function () {
  const testItems = [
    {
      id: '1'
    }
  ]
  let subject

  beforeEach(function () {
    let testObject = Object.extend(FrostListCoreMixin)
    subject = testObject.create({
      listConfig: {
        items: 'model'
      }
    })

    run(() => {
      subject.set('model', testItems)
    })
  })

  it('successfully mixed', function () {
    expect(
      subject
    ).to.be.ok
  })

  it('sets up "_listItems" as a computed alias to listConfig.items', function () {
    expect(
      subject.get('_listItems'),
      '_listItems is setup'
    ).to.eql(testItems)
  })

  it('listItems computed property is correctly set', function () {
    expect(
      subject.get('listItems')[0].id,
      'listItems[0].id is set to 1'
    ).to.eql('1')

    expect(
      subject.get('listItems')[0].record,
      'listItems[0].record is set to the item object'
    ).to.eql({
      id: '1'
    })
  })

  describe('statefulListItems computed property', function () {
    it('sets default to false for "isSelected" and "isExpanded"', function () {
      run(() => {
        subject.set('selectedItems', Object.create())
        subject.set('expandedItems', Object.create())
      })

      expect(
        subject.get('statefulListItems')[0].isExpanded,
        'statefulListItems.isExpanded defaults to false'
      ).to.eql(false)

      expect(
        subject.get('statefulListItems')[0].isSelected,
        'statefulListItems.isSelected defaults to false'
      ).to.eql(false)
    })

    it('sets "isSelected" correctly when it already has a value', function () {
      run(() => {
        subject.set('selectedItems', Object.create({ 1: true }))
        subject.set('expandedItems', Object.create())
      })

      expect(
        subject.get('statefulListItems')[0].isSelected,
        'statefulListItems.isSelected is set correctly when it has a value already'
      ).to.eql(true)
    })

    it('sets "isExpanded" correctly when it already has a value', function () {
      run(() => {
        subject.set('selectedItems', Object.create())
        subject.set('expandedItems', Object.create({ 1: true }))
      })

      expect(
        subject.get('statefulListItems')[0].isExpanded,
        'statefulListItems.isExpanded is set correctly when it has a value already'
      ).to.eql(true)
    })
  })
})
