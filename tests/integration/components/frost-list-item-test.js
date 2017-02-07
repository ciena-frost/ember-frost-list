import {expect} from 'chai'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

import {integration} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'

const test = integration('frost-list-item')
describe(test.label, function () {
  test.setup()

  let sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe.skip('default state has no class "is-selected" and "is-expanded"', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-list-item}}
      `)
    })

    it('does NOT set "is-selected" class', function () {
      expect(
        this.$('.frost-list-item').hasClass('is-selected')
      ).to.eql(false)
    })

    it('does NOT set "is-expanded" class', function () {
      expect(
        this.$('.frost-list-item').hasClass('is-expanded')
      ).to.eql(false)
    })
  })

  it.skip('sets "is-selected" class when model.isSelected=true', function () {
    this.set('model', {isSelected: true})

    this.render(hbs`
      {{frost-list-item
        model=model
      }}
    `)

    expect(
      this.$('.frost-list-item').hasClass('is-selected')
    ).to.eql(true)
  })

  it.skip('sets "is-expanded" class when model.isSelected=true', function () {
    this.set('model', {isExpanded: true})

    this.render(hbs`
      {{frost-list-item
        model=model
      }}
    `)

    expect(
      this.$('.frost-list-item').hasClass('is-expanded')
    ).to.eql(true)
  })

  describe.skip('onSelect closure action', function () {
    let externalActionSpy
    beforeEach(function () {
      externalActionSpy = sandbox.spy()

      this.on('externalAction', externalActionSpy)
      this.set('model', {isSelected: true})

      this.render(hbs`
        {{frost-list-item
          model=model
          onSelect=(action 'externalAction')
        }}
      `)

      this.$('.frost-list-item').trigger('click')
    })

    it('passes event obeject', function () {
      expect(
        externalActionSpy.args[0][0]
      ).to.have.property('type', 'click')
    })

    it('passes "record" property', function () {
      expect(
        externalActionSpy.args[0][1].record.isSelected
      ).to.eql(true)
    })

    it('passes selectDesc object', function () {
      expect(
        externalActionSpy.args[0][1].selectDesc
      ).to.eql(
        {
          'isSelected': false,
          'isTargetSelectionIndicator': false
        }
      )
    })
  })
})
