import { expect } from 'chai'
import Ember from 'ember'
import { describeComponent } from 'ember-mocha'
import PropTypeMixin from 'ember-prop-types'
import { afterEach, beforeEach, describe, it } from 'mocha'
import sinon from 'sinon'

describeComponent(
  'frost-list',
  'Unit: FrostListComponent',
  {
    unit: true
  },
  function () {
    let component, sandbox

    beforeEach(function () {
      component = this.subject()
      sandbox = sinon.sandbox.create()
    })

    afterEach(function () {
      sandbox.restore()
    })

    it.skip('sets default properties value correctly', function () {
      expect(
        component.get('alwaysUseDefaultHeight')
      ).to.eql(false)
    })

    it.skip('has the expected Mixins', function () {
      expect(
        PropTypeMixin.detect(component)
      ).to.eql(true)
    })

    describe.skip('InitContext()', function () {
      it('errors when config is set with item', function () {
        const EmberLoggerSpy = sandbox.spy(Ember.Logger, 'error')

        component.setProperties(
          {
            'config': {},
            'item': {}
          }
        )
        component.initContext()

        expect(
          EmberLoggerSpy.called
        ).to.eql(true)
      })

      it('errors when config is set with expansion', function () {
        const EmberLoggerSpy = sandbox.spy(Ember.Logger, 'error')

        component.setProperties(
          {
            'config': {},
            'expansion': {}
          }
        )
        component.initContext()

        expect(
          EmberLoggerSpy.called
        ).to.eql(true)
      })

      it('errors when config is set with sorting', function () {
        const EmberLoggerSpy = sandbox.spy(Ember.Logger, 'error')

        component.setProperties(
          {
            'config': {},
            'sorting': {}
          }
        )
        component.initContext()

        expect(
          EmberLoggerSpy.called
        ).to.eql(true)
      })

      it('does not error when config is set by itself', function () {
        const EmberLoggerSpy = sandbox.spy(Ember.Logger, 'error')

        component.set('config', {})
        component.initContext()

        expect(
          EmberLoggerSpy.called
        ).to.eql(false)
      })
    })
  }
)
