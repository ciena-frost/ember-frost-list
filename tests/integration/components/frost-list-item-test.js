import {expect} from 'chai'
import {$hook, initialize as initializeHook} from 'ember-hook'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

const test = integration('frost-list-item')
describe(test.label, function () {
  test.setup()

  let sandbox, selectSpy

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    initializeHook()
    selectSpy = sandbox.spy()
    this.on('selectAction', selectSpy)
    this.setProperties({
      hook: 'myListItem',
      model: {id: '400'}
    })
    this.render(hbs`
      {{frost-list-item
        hook=hook
        model=model
        onSelect=(action 'selectAction')
      }}
    `)
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('renders with default class', function () {
    expect(this.$('.frost-list-item')).to.be.length(1)
  })

  describe('onSelect closure action', function () {
    beforeEach(function () {
      $hook('myListItem').trigger('click')
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
})
