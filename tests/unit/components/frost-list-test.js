import {expect} from 'chai'
import Ember from 'ember'
const {run} = Ember
import {describeComponent} from 'ember-mocha'
import PropTypeMixin from 'ember-prop-types'
import {
  beforeEach,
  it
} from 'mocha'
import sinon from 'sinon'

describeComponent(
  'frost-list',
  'Unit: FrostListComponent',
  {
    unit: true
  },
  function () {
    let component

    beforeEach(function () {
      component = this.subject()
    })

    it('sets default properties value correctly', function () {
      expect(
        component.get('alwaysUseDefaultHeight'),
        'alwaysUseDefaultHeight: false'
      ).to.eql(false)
    })

    it('has the expected Mixins', function () {
      expect(
        PropTypeMixin.detect(component),
        'PropTypeMixin Mixin is present'
      ).to.eql(true)
    })

    it('InitContext() errors when config is set with item, expansion or sorting', function () {
      const EmberLoggerSpy = sinon.spy(Ember.Logger, 'error')

      run(() => {
        component.set('config', {})
        component.set('expansion', {})
      })

      component.initContext()

      expect(
        EmberLoggerSpy.called,
        'Logger.error is called'
      ).to.eql(true)
    })
  }
)
