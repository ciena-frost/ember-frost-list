<<<<<<< HEAD
/**
 * Integration test for the frost-list-item component
 */

import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import {$hook, initialize as initializeHook} from 'ember-hook'
import wait from 'ember-test-helpers/wait'
import {afterEach, beforeEach, describe} from 'mocha'
import sinon from 'sinon'

import {integration} from 'ember-frost-list/tests/helpers/ember-test-utils/describe-component'

describeComponent(...integration('frost-list-item'), function () {
  let sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    initializeHook()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should have real tests', function () {
    expect(true).to.equal(false)
  })

  describe('after render', function () {
    beforeEach(function () {
      this.setProperties({
        myHook: 'myThing'
      })

      this.render(hbs`
        {{frost-list-item
          hook=myHook
        }}
      `)

      return wait()
    })

    it('should have an element', function () {
      expect(this.$()).to.have.length(1)
    })

    it('should be accessible via the hook', function () {
      expect($hook('myThing')).to.have.length(1)
    })
  })
})
=======
import { expect } from 'chai'
import { describeComponent, it } from 'ember-mocha'
import { afterEach, beforeEach, describe } from 'mocha'
import hbs from 'htmlbars-inline-precompile'
import sinon from 'sinon'

describeComponent(
  'frost-list-item',
  'Integration: FrostListItemComponent',
  {
    integration: true
  },
  function () {
    let sandbox

    beforeEach(function () {
      sandbox = sinon.sandbox.create()
    })

    afterEach(function () {
      sandbox.restore()
    })

    describe('default state has no class "is-selected" and "is-expanded"', function () {
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

    it('sets "is-selected" class when model.isSelected=true', function () {
      this.set('model', { isSelected: true })

      this.render(hbs`
        {{frost-list-item
          model=model
        }}
      `)

      expect(
        this.$('.frost-list-item').hasClass('is-selected')
      ).to.eql(true)
    })

    it('sets "is-expanded" class when model.isSelected=true', function () {
      this.set('model', { isExpanded: true })

      this.render(hbs`
        {{frost-list-item
          model=model
        }}
      `)

      expect(
        this.$('.frost-list-item').hasClass('is-expanded')
      ).to.eql(true)
    })

    describe('onSelect closure action', function () {
      let externalActionSpy
      beforeEach(function () {
        externalActionSpy = sandbox.spy()

        this.on('externalAction', externalActionSpy)
        this.set('model', { isSelected: true })

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
  }
)
>>>>>>> 6eef66e301094525ab7c7a0c4c4390538080546b
