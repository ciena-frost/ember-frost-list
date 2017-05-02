/**
 * Integration test for the frost-list-content-container component
 */

import {expect} from 'chai'
const {A} = Ember
import Ember from 'ember'
import {$hook} from 'ember-hook'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'
import {registerMockComponent, unregisterMockComponent} from '../../helpers/mock-component'

import {integration} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'

const test = integration('frost-list-content-container')
describe(test.label, function () {
  test.setup()

  beforeEach(function () {
    const list = A([
      Ember.Object.create({uuid: '0'})
    ])

    this.setProperties({
      alwaysUseDefaultHeight: false,
      bufferSize: 10,
      defaultHeight: 50,
      hook: 'myListContentContainer',
      items: list,
      scrollTop: 0
    })
  })

  describe('without the pagination property set', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-list-content-container
          alwaysUseDefaultHeight=alwaysUseDefaultHeight
          bufferSize=bufferSize
          defaultHeight=defaultHeight
          hook=hook
          items=items
          scrollTop=scrollTop
        }}
      `)
    })

    it('has one vertical item created', function () {
      expect(this.$('.vertical-item')).to.have.length(1)
    })
  })

  describe('when the pagination property is set', function () {
    beforeEach(function () {
      registerMockComponent(this, 'mock-pagination')

      this.render(hbs`
        {{frost-list-content-container
          alwaysUseDefaultHeight=alwaysUseDefaultHeight
          bufferSize=bufferSize
          defaultHeight=defaultHeight
          hook=hook
          items=items
          pagination=(component 'mock-pagination' class='mock-pagination')
          scrollTop=scrollTop
        }}
      `)
    })

    afterEach(function () {
      unregisterMockComponent(this)
    })

    it('should set the "paged" class', function () {
      expect($hook('myListContentContainer')).to.have.class('paged')
    })

    it('should have a scroll bar', function () {
      expect($hook('myListContentContainer-scroll')).to.have.length(1)
    })
  })
})
