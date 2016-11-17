import {expect} from 'chai'
import Ember from 'ember'
const {
  Controller,
  Object,
  run
} = Ember
import FrostListCoreMixin from 'ember-frost-list/mixins/frost-list-core-mixin'
import FrostListSelectionMixin from 'ember-frost-list/mixins/frost-list-selection-mixin'
import * as utils from 'ember-frost-list/utils/utils'
import {
  beforeEach,
  describe,
  it
} from 'mocha'
import sinon from 'sinon'

describe('Unit: FrostListSelectionMixin', function () {
  const testItems = [
    {
      id: '1',
      isSelected: false
    }
  ]
  let subject

  beforeEach(function () {
    let testObject = Controller.extend(FrostListSelectionMixin)
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

  it('sets up "selectedItems" with an empty object', function () {
    expect(
      subject.get('selectedItems'),
      'selectedItems: Ember.Object.create()'
    ).to.eql(Object.create())
  })

  it('has the expect Mixins', function () {
    expect(
      FrostListCoreMixin.detect(subject),
      'FrostListCoreMixin Mixin is present'
    ).to.eql(true)
  })

  describe('"selectedItem()" action', function () {
    it('udpates selectedItems', function () {
      sinon.stub(utils, 'updateSelectedItemsHash').returns({ 1: true })

      subject.send('selectItem', {})
      expect(
        subject.get('selectedItems'),
        'selectedItems is updated'
      ).to.eql({ 1: true })

      utils.updateSelectedItemsHash.restore()
    })

    it('calls "updateSelectedItemsHash()" with correct parameters', function () {
      const updateSelectedItemsHashSpy =
        sinon.stub(utils, 'updateSelectedItemsHash').returns({ 1: true })

      run(() => subject.set('selectedItems', { 1: true }))

      subject.send('selectItem', {})

      expect(
        updateSelectedItemsHashSpy.calledWith({ 1: true }, {}),
        'updateSelectedItemsHash() is called with correct parameter'
      ).to.eql(true)

      utils.updateSelectedItemsHash.restore()
    })

    it('calls "notifyPropertyChange" with correct parameter', function () {
      const notifyPropertyChangeSpy = sinon.spy(subject, 'notifyPropertyChange')
      sinon.stub(utils, 'updateSelectedItemsHash').returns({ 1: true })

      subject.send('selectItem', {})
      expect(
        notifyPropertyChangeSpy.calledWith('selectedItems'),
        'notifyPropertyChange() is called with correct parameter'
      ).to.eql(true)

      utils.updateSelectedItemsHash.restore()
    })
  })
})
