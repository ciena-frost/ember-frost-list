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
    let records = subject.get('_listItems')
    let expandedItems = subject.get('expandedItems')
    records.map((record) => {
      expandedItems.set(record.id, true)
    })

    subject.collapseItems()

    console.log(subject.get('expandedItems'))
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
    let records = subject.get('_listItems')
    let expandedItems = subject.get('expandedItems')
    records.map((record) => {
      expandedItems.set(record.id, false)
    })
    subject.expandItems()

    console.log(subject.get('expandedItems'))
    expect(
      subject.get('expandedItems.1'),
      '"expandedItems.1" set to true'
    ).to.be.true

    expect(
      subject.get('expandedItems.2'),
      '"expandedItems.2" set to true'
    ).to.be.true
  })
})
