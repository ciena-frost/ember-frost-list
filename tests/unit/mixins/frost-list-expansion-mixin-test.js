import {expect} from 'chai'
import Ember from 'ember'
const {
  Controller,
  Object,
  run
} = Ember
import {
  beforeEach,
  describe,
  it
} from 'mocha'
import FrostListCoreMixin from 'ember-frost-list/mixins/frost-list-core-mixin'
import FrostListExpansionMixin from 'ember-frost-list/mixins/frost-list-expansion-mixin'
import sinon from 'sinon'

describe('Unit: FrostListExpansionMixin', function () {
  const testItems = [
    {
      id: '1'
    }
  ]
  let subject

  beforeEach(function () {
    let testObject = Controller.extend(FrostListExpansionMixin)
    subject = testObject.create({
      listConfig: {
        items: 'model'
      }
    })

    run(() => subject.set('model', testItems))
  })

  it('successfully mixed', function () {
    expect(
      subject
    ).to.be.ok
  })

  it('creates "expandedItems" as an empty Ember.Object', function () {
    expect(
      subject.get('expandedItems'),
      'expandedItems: Ember.Object.create()'
    ).to.eql(Object.create())
  })

  it('has the expect Mixins', function () {
    expect(
      FrostListCoreMixin.detect(subject),
      'FrostListCoreMixin Mixin is present'
    ).to.be.true
  })

  describe('collapseItems()', function () {
    it('removes the expended id', function () {
      subject.set('expandedItems', Object.create({
        1: true
      }))
      subject.send('collapseItems')

      expect(
        subject.get('expandedItems.1'),
        'expandedItems is updated'
      ).to.be.undefined
    })

    it('notifyPropertyChange() is called with correct parameter', function () {
      const collapseItemsSpy = sinon.spy(subject, 'notifyPropertyChange')

      subject.send('collapseItems')

      expect(
        collapseItemsSpy.calledWith('expandedItems'),
        'notifyPropertyChange function is called with expandedItems'
      ).to.be.true
    })
  })

  describe('expandItems()', function () {
    it('expandItems function sets id to true', function () {
      subject.set('expandedItems', Object.create({ 1: false }))
      subject.send('expandItems')

      expect(
        subject.get('expandedItems.1'),
        'expandedItems is updated'
      ).to.be.true
    })

    it('notifyPropertyChange() is called with correct parameter', function () {
      const expandItemsSpy = sinon.spy(subject, 'notifyPropertyChange')

      subject.send('expandItems')

      expect(
        expandItemsSpy.calledWith('expandedItems'),
        'notifyPropertyChange function is called with expandedItems'
      ).to.be.true
    })
  })
})
