import { expect } from 'chai'
import {
  beforeEach,
  describe,
  it
} from 'mocha'
import Ember from 'ember'
const {run} = Ember
import FrostListCoreMixin from 'ember-frost-list/mixins/frost-list-core-mixin'

describe('FrostListCoreMixin', function () {
  let testObject
  let subject
  const testItems = [
    {
      id: '1'
    },
    {
      id: '2'
    }
  ]
  beforeEach(function () {
    testObject = Ember.Object.extend(FrostListCoreMixin)
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

  it('filteredItems computed property is correctly set', function () {
    expect(
      subject.get('filteredItems'),
      'listConfig.item is identical to filteredItems'
    ).to.eql(testItems)
  })

  it('listItems computed property is correctly set', function () {
    expect(
      subject.get('listItems')[0].id,
      'listItems[0].id is set to 1'
    ).to.eql('1')

    expect(
      subject.get('listItems')[1].id,
      'listItems[1].id is set to 2'
    ).to.eql('2')
  })
})
