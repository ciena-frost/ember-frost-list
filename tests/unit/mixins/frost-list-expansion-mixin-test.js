import { expect } from 'chai'
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
import FrostListExpansionMixin from 'ember-frost-list/mixins/frost-list-expansion-mixin'
import sinon from 'sinon'

describe('FrostListExpansionMixin', function () {
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

  describe('collapseItems()', function () {
    it('collapseItems function sets id to false', function () {
      subject.set('expandedItems', Object.create({ 1: true }))
      subject.send('collapseItems')

      expect(
        subject.get('expandedItems.1'),
        'expandedItems is updated'
      ).to.be.false
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