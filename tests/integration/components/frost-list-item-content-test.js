/**
 * Integration test for the frost-list-item-content component
 */

import {expect} from 'chai'
import Ember from 'ember'
const {A} = Ember
import {$hook, initialize as initializeHook} from 'ember-hook'
import wait from 'ember-test-helpers/wait'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach, describe, it} from 'mocha'

const test = integration('frost-list-item-content')
describe(test.label, function () {
  test.setup()

  beforeEach(function () {
    initializeHook()
  })

  describe('renders frost-list-item-content', function () {
    beforeEach(function () {
      const list = A([
        Ember.Object.create({id: '0'})
      ])

      this.set('items', list)

      this.render(hbs`
        {{frost-list
          hook='myList'
          item=(component 'frost-list-item')
          items=items
        }}
      `)
      return wait()
    })

    it('sets "frost-list-item-content" class', function () {
      expect(this.$('.frost-list-item-content')).to.have.length(1)
    })

    it('creates one list item content', function () {
      expect($hook('myList-itemContent', {index: 0})).to.have.length(1)
    })
  })
})
