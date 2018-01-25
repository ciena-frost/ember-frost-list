/**
 * Integration test for the frost-list-item-expansion component
 */

import {expect} from 'chai'
import Ember from 'ember'
import {$hook, initialize as initializeHook} from 'ember-hook'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

const test = integration('frost-list-item-expansion')
describe(test.label, function () {
  test.setup()

  let expandSpy, sandbox
  let model = Ember.Object.create({
    id: '400',
    states: {isExpanded: false}
  })

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    initializeHook()
    expandSpy = sandbox.spy()
    this.on('expandAction', expandSpy)
    this.setProperties({
      hook: 'myListItemExpansion',
      model: model
    })
    this.render(hbs`
      {{frost-list-item-expansion
        hook=hook
        isExpanded=model.states.isExpanded
        model=model
        onExpand=(action 'expandAction')
      }}
    `)
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should render with default class', function () {
    expect(this.$('.frost-list-item-expansion')).to.be.length(1)
  })

  it('should add correct class to frost-icon', function () {
    expect(this.$('.frost-list-item-expansion-icon')).to.be.length(1)
  })

  it('should set -icon hook correctly', function () {
    expect($hook('myListItemExpansion-icon')).to.be.length(1)
  })

  it('should set the correct icon', function () {
    expect(
      $hook('myListItemExpansion-icon')
    ).to.have.class('frost-icon-frost-list-chevron-thin')
  })

  describe('onExpand closure action', function () {
    beforeEach(function () {
      $hook('myListItemExpansion').trigger('click')
    })

    it('should fire onExpand closure action', function () {
      expect(expandSpy).have.callCount(1)
    })

    it('should pass the model', function () {
      expect(expandSpy.args[0][0].id).to.equal('400')
    })
  })

  describe('when the isExpanded computed property is set', function () {
    beforeEach(function () {
      model.set('states.isExpanded', true)
    })

    it('should have an "is-expanded" class', function () {
      expect($hook('myListItemExpansion')).to.have.class('is-expanded')
    })

    it('should have an "is-expanded" class set for frost-icon', function () {
      expect($hook('myListItemExpansion-icon')).to.have.class('is-expanded')
    })
  })
})
