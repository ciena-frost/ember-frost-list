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

  it('collapseItems function sets id to false', function () {
    subject.set('expandedItems', Object.create({ 1: true }))
    subject.send('collapseItems')

    expect(
      subject.get('expandedItems.1'),
      '"expandedItems.1" set to false'
    ).to.be.false
  })

  it('expandItems function sets id to true', function () {
    subject.set('expandedItems', Object.create({ 1: false }))
    subject.send('expandItems')

    expect(
      subject.get('expandedItems.1'),
      '"expandedItems.1" set to true'
    ).to.be.true
  })

  it('notifyPropertyChange() is fired', function () {
    const spy = sinon.spy(subject, 'notifyPropertyChange')

    subject.send('collapseItems')
    subject.send('expandItems')

    expect(
      spy.calledTwice,
      'notifyPropertyChange function is called twice'
    ).to.be.true
  })
})
