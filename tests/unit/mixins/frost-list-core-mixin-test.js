import { expect } from 'chai'
import {
  beforeEach,
  describe,
  it
} from 'mocha'
import Ember from 'ember'
const {on} = Ember
import FrostListCoreMixin from 'ember-frost-list/mixins/frost-list-core-mixin'

describe('FrostListCoreMixin', function () {
  let controller
  let listConfig
  const testItems = [
    {
      id: 1
    },
    {
      id: 2
    }
  ]
  beforeEach(function () {
    listConfig = {
      items: 'model',
      component: 'user-list-item'
    }
    controller = Ember.Controller.extend(FrostListCoreMixin).create({
      initListCoreMixin: on('init', function () {
        Ember.defineProperty(this, listConfig.items, undefined, testItems)
        Ember.defineProperty(this, '_listItems', Ember.computed.alias(listConfig.items))
      })
    })
  })

  it('works', function () {
    let testObject = Ember.Object.extend(FrostListCoreMixin)
    let subject = testObject.create({
      initListCoreMixin: on('init', function () {
        Ember.defineProperty(this, '_listItems', Ember.computed.alias(listConfig.items))
      })
    })
    expect(
      subject
    ).to.be.ok
  })

  it('filteredItems computed property is correctly set', function () {
    expect(
      controller.get('filteredItems'),
      'listConfig.item is identical to filteredItems'
    ).to.eql(testItems)
  })

  it('listItems computed property is correctly set', function () {
    expect(
      controller.get('listItems')[0].id,
      'listItems[0].id is set to 1'
    ).to.eql(1)

    expect(
      controller.get('listItems')[1].id,
      'listItems[1].id is set to 2'
    ).to.eql(2)
  })
})
