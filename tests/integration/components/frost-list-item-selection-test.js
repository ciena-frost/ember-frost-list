/**
 * Integration test for the frost-list-item-selection component
 */

import {expect} from 'chai'
import Ember from 'ember'
import {$hook, initialize as initializeHook} from 'ember-hook'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

import {integration} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'

const test = integration('frost-list-item-selection')
describe(test.label, function () {
  test.setup()

  let selectSpy, sandbox
  let model = Ember.Object.create({
    id: '400',
    states: {isSelected: false}
  })

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    initializeHook()
    selectSpy = sandbox.spy()
    this.on('selectAction', selectSpy)
    this.setProperties({
      hook: 'myListItemSelection',
      model: model
    })
    this.render(hbs`
      {{frost-list-item-selection
        hook=hook
        isSelected=model.states.isSelected
        model=model
        onSelect=(action 'selectAction')
      }}
    `)
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('renders with default class', function () {
    expect(this.$('.frost-list-item-selection')).to.be.length(1)
  })

  it('sets -checkbox hook correctly', function () {
    expect($hook('myListItemSelection-checkbox')).to.be.length(1)
  })

  it('adds correct size to checkbox', function () {
    expect($hook('myListItemSelection-checkbox')).to.have.class('medium')
  })

  describe('onSelect closure action', function () {
    beforeEach(function () {
      $hook('myListItemSelection').trigger('click')
    })

    it('fires onSelect closure action', function () {
      expect(selectSpy).have.callCount(1)
    })

    it('passes the isRangeSelect property', function () {
      expect(selectSpy.args[0][0]).to.have.property('isRangeSelect')
    })

    it('passes the isSpecificSelect property', function () {
      expect(selectSpy.args[0][0]).to.have.property('isSpecificSelect')
    })

    it('passes the model', function () {
      expect(selectSpy.args[0][0].item.id).to.equal('400')
    })
  })

  describe('when the isSelected computed property is set', function () {
    beforeEach(function () {
      model.set('states.isSelected', true)
    })

    it('should have an "is-selected" class', function () {
      expect($hook('myListItemSelection')).to.have.class('is-selected')
    })
  })
})
