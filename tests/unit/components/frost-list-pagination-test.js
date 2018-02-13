/**
 * Unit test for the frost-list-pagination utility
 */

import {expect} from 'chai'
import {unit} from 'ember-test-utils/test-support/setup-component-test'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

const test = unit('frost-list-pagination')
describe(test.label, function () {
  let component, sandbox, onChangeSpy

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    onChangeSpy = sinon.spy()
    component = this.subject({
      total: 8,
      page: 1,
      itemsPerPage: 2,
      onChange: onChangeSpy
    })
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should call onChange if no debounce', function () {
    component.send('_onChange', 2)
    expect(onChangeSpy.calledOnce).to.eq(true)
  })
})
