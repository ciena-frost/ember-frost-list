/**
 * Integration test for the frost-list-item-selection component
 */

import {expect} from 'chai'
import Ember from 'ember'
import {$hook, initialize as initializeHook} from 'ember-hook'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

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
      model: model,
      singleSelection: false
    })
    this.render(hbs`
      {{frost-list-item-selection
        hook=hook
        isSelected=model.states.isSelected
        model=model
        size='medium'
        onSelect=(action 'selectAction')
        singleSelection=singleSelection
      }}
    `)
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should render with default class', function () {
    expect(this.$('.frost-list-item-selection')).to.be.length(1)
  })

  it('should set -checkbox hook correctly', function () {
    expect($hook('myListItemSelection-checkbox')).to.be.length(1)
  })

  it('should add correct size to checkbox', function () {
    expect($hook('myListItemSelection-checkbox')).to.have.class('medium')
  })

  describe('onSelect closure action', function () {
    beforeEach(function () {
      $hook('myListItemSelection').trigger('click')
    })

    it('should fire onSelect closure action', function () {
      expect(selectSpy).have.callCount(1)
    })

    it('should pass the isRangeSelect property', function () {
      expect(selectSpy.args[0][0]).to.have.property('isRangeSelect')
    })

    it('should pass the isSpecificSelect property', function () {
      expect(selectSpy.args[0][0]).to.have.property('isSpecificSelect')
    })

    it('should pass the model', function () {
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

  describe('when singleSelection is true', function () {
    beforeEach(function () {
      this.set('singleSelection', true)
    })

    it('should set -radio-button hook correctly', function () {
      expect($hook('myListItemSelection-radio-button')).to.be.length(1)
    })

    it('should use radio buttons instead of checkboxes', function () {
      expect($hook('myListItemSelection-radio-button-input').attr('type')).to.equal('radio')
    })

    it('should add correct size to the radio buttons', function () {
      expect($hook('myListItemSelection-radio-button')).to.have.class('medium')
    })
  })
})
