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
      registerMockComponent(this, 'mock-list-item-expansion')

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
          itemExpansion=(component 'mock-list-item-expansion')
        }}
      `)

      return wait()
    })

    afterEach(function () {
      unregisterMockComponent(this, 'mock-list-item')
      unregisterMockComponent(this, 'mock-list-item-expansion')
    })

    it('should set "frost-list-item-content" class', function () {
      expect(this.$('.frost-list-item-content')).to.have.length(1)
    })

    it('should create one list item content', function () {
      expect($hook('myListItemContent', {index: 0})).to.have.length(1)
    })

    it('should concatenate the -item-container hook property', function () {
      expect($hook('myListItemContent-item-container', {index: 0})).to.have.length(1)
    })

    it('should concatenate the -item hook property', function () {
      expect($hook('myListItemContent-item', {index: 0})).to.have.length(1)
    })

    it('should concatenate the -expnansion hook property', function () {
      expect($hook('myListItemContent-expansion', {index: 0})).to.have.length(1)
    })
  })
})
