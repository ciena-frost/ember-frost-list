/**
 * Integration test for the frost-list-item-content component
 */

import {expect} from 'chai'
import Ember from 'ember'
import {$hook, initialize as initializeHook} from 'ember-hook'
import wait from 'ember-test-helpers/wait'
import {registerMockComponent, unregisterMockComponent} from 'ember-test-utils/test-support/mock-component'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'

const test = integration('frost-list-item-content')
describe(test.label, function () {
  test.setup()

  beforeEach(function () {
    initializeHook()
  })

  describe('renders frost-list-item-content', function () {
    beforeEach(function () {
      registerMockComponent(this, 'mock-list-item')

      this.setProperties({
        model: Ember.Object.create({id: '0'}),
        index: 0,
        onExpand: function () {},
        onSelect: function () {}
      })

      this.render(hbs`
        {{frost-list-item-content
          hook='myListItemContent'
          hookQualifiers=(hash index=index)
          model=model
          index=index
          onExpand=onExpand
          onSelect=onSelect
          item=(component 'mock-list-item')
        }}
      `)

      return wait()
    })

    afterEach(function () {
      unregisterMockComponent(this, 'mock-list-item')
    })

    it('sets "frost-list-item-content" class', function () {
      expect(this.$('.frost-list-item-content')).to.have.length(1)
    })

    it('creates one list item content', function () {
      expect($hook('myListItemContent', {index: 0})).to.have.length(1)
    })
  })
})
