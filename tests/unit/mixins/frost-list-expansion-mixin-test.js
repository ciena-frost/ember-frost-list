import {expect} from 'chai'
import Ember from 'ember'
const {
  Controller,
  Object,
  run
} = Ember
import {
  afterEach,
  beforeEach,
  describe,
  it
} from 'mocha'
import FrostListCoreMixin from 'ember-frost-list/mixins/frost-list-core-mixin'
import FrostListExpansionMixin from 'ember-frost-list/mixins/frost-list-expansion-mixin'
import sinon from 'sinon'

describe('Unit: FrostListExpansionMixin', function () {
  let sandbox

  const testItems = [
    {
      id: '1'
    }
  ]
  let subject

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    let testObject = Controller.extend(FrostListExpansionMixin)
    subject = testObject.create({
      listConfig: {
        items: 'model'
      }
    })

    run(() => subject.set('model', testItems))
  })

  afterEach(function () {
    sandbox.restore()
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
    ).to.eql(true)
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
      ).to.eql(undefined)
    })

    it('notifyPropertyChange() is called with correct parameter', function () {
      const collapseItemsSpy = sandbox.spy(subject, 'notifyPropertyChange')

      subject.send('collapseItems')

      expect(
        collapseItemsSpy.calledWith('expandedItems'),
        'notifyPropertyChange function is called with expandedItems'
      ).to.eql(true)
    })
  })

  describe('expandItems()', function () {
    it('expandItems function sets id to true', function () {
      subject.set('expandedItems', Object.create({ 1: false }))
      subject.send('expandItems')

      expect(
        subject.get('expandedItems.1'),
        'expandedItems is updated'
      ).to.eql(true)
    })

    it('notifyPropertyChange() is called with correct parameter', function () {
      const expandItemsSpy = sandbox.spy(subject, 'notifyPropertyChange')

      subject.send('expandItems')

      expect(
        expandItemsSpy.calledWith('expandedItems'),
        'notifyPropertyChange function is called with expandedItems'
      ).to.eql(true)
    })
  })
})
