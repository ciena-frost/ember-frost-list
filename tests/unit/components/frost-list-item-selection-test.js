/**
 * Unit test for the frost-list-item-selection component
 */

import {expect} from 'chai'
import {unit} from 'ember-test-utils/test-support/setup-component-test'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

const test = unit('frost-list-item-selection')
describe(test.label, function () {
  test.setup()

  let component, sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    component = this.subject({
      hook: 'myHook',
      onSelect: sinon.stub()
    })
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('singleSelection', function () {
    it('should default to false', function () {
      expect(component.get('singleSelection')).to.equal(false)
    })
  })
})
