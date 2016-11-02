import { expect } from 'chai'
import {
  beforeEach,
  describe,
  it
} from 'mocha'
import Ember from 'ember'
const {run} = Ember
import FrostListExpansionMixin from 'ember-frost-list/mixins/frost-list-expansion-mixin'
import FrostListCoreMixin from 'ember-frost-list/mixins/frost-list-core-mixin'
import createActionClosure from 'ember-frost-list/utils/action-closure'
import sinon from 'sinon'

describe('FrostListExpansionMixin', function () {
  const testItems = [
    {
      id: '1'
    },
    {
      id: '2'
    }
  ]
  let subject

  beforeEach(function () {
    let testObject = Ember.Object.extend(FrostListExpansionMixin, FrostListCoreMixin)
    subject = testObject.create({
      listConfig: {
        items: 'model'
      }
    })

    run(() => {
      subject.set('model', testItems)
      subject.set('collapseItems', createActionClosure.call(subject, subject.actions.collapseItems))
      subject.set('expandItems', createActionClosure.call(subject, subject.actions.expandItems))
    })
  })

  it('works', function () {
    expect(
      subject
    ).to.be.ok
  })

  it('collapseItems function sets id to false', function () {
    const records = subject.get('_listItems')
    const expandedItems = subject.get('expandedItems')
    records.map((record) => {
      expandedItems.set(record.id, true)
    })

    subject.collapseItems()

    expect(
      subject.get('expandedItems.1'),
      '"expandedItems.1" set to false'
    ).to.be.false

    expect(
      subject.get('expandedItems.2'),
      '"expandedItems.2" set to false'
    ).to.be.false
  })

  it('expandItems function sets id to true', function () {
    const records = subject.get('_listItems')
    const expandedItems = subject.get('expandedItems')
    records.map((record) => {
      expandedItems.set(record.id, false)
    })

    subject.expandItems()

    expect(
      subject.get('expandedItems.1'),
      '"expandedItems.1" set to true'
    ).to.be.true

    expect(
      subject.get('expandedItems.2'),
      '"expandedItems.2" set to true'
    ).to.be.true
  })

  it('notifyPropertyChange() is fireed', function () {
    const spy = sinon.spy(subject, 'notifyPropertyChange')

    subject.collapseItems()
    subject.expandItems()

    expect(
      spy.calledTwice,
      'notifyPropertyChange function is called'
    ).to.be.true
  })
})
