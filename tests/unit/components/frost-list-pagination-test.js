/**
 * Unit test for the frost-list-pagination utility
 */

import {expect} from 'chai'
import Ember from 'ember'
import {unit} from 'ember-test-utils/test-support/setup-component-test'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'
const {run} = Ember

const test = unit('frost-list-pagination')
describe(test.label, function () {
  let component, sandbox, onChangeSpy
  test.setup()
  describe('no debounce', function () {
    beforeEach(function () {
      sandbox = sinon.sandbox.create()
      onChangeSpy = sinon.spy()
      component = this.subject({
        hook: 'pagination-hook',
        total: 8,
        page: 1,
        itemsPerPage: 2,
        onChange: onChangeSpy
      })
    })

    afterEach(function () {
      component = null
      sandbox.restore()
    })

    it('should call onChange immediately if no debounce', function () {
      component.send('_onChange', 2)
      expect(onChangeSpy.calledOnce).to.eq(true)
    })
  })
  describe('debounced paging', function () {
    beforeEach(function () {
      sandbox = sinon.sandbox.create()
      onChangeSpy = sinon.spy()
      component = this.subject({
        hook: 'pagination-hook',
        total: 8,
        page: 1,
        itemsPerPage: 2,
        onChange: onChangeSpy,
        debounceInterval: 2
      })
    })

    afterEach(function () {
      component = null
      sandbox.restore()
    })
    it('should call onChange once', function (done) {
      component.send('_onChange', 2)
      component.send('_onChange', 2)
      run.later(() => {
        expect(onChangeSpy.calledOnce).to.eq(true)
        expect(onChangeSpy.calledWith(3)).to.eq(true)
        done()
      }, 4)
    })
    it('should not go over total', function (done) {
      component.send('_onChange', 2)
      component.send('_onChange', 2)
      component.send('_onChange', 2)
      component.send('_onChange', 2)
      component.send('_onChange', 2)
      run.later(() => {
        expect(onChangeSpy.calledOnce).to.eq(true)
        expect(onChangeSpy.calledWith(3)).to.eq(true)
        done()
      }, 4)
    })
    it('should not be less than 0', function (done) {
      component.set('page', 2)
      component.send('_onChange', 1)
      component.send('_onChange', 1)
      component.send('_onChange', 1)
      component.send('_onChange', 1)
      component.send('_onChange', 1)
      run.later(() => {
        expect(onChangeSpy.calledOnce).to.eq(true)
        expect(onChangeSpy.calledWith(0)).to.eq(true)
        done()
      }, 4)
    })
    it('should immediately go to page if difference is greater than one', function () {
      component.send('_onChange', 3)
      expect(onChangeSpy.calledOnce).to.eq(true)
      expect(onChangeSpy.calledWith(3)).to.eq(true)
    })

    it('should immediately go to last page if difference is greater than one', function () {
      component.set('page', 2)
      component.send('_onChange', 0)
      expect(onChangeSpy.calledOnce).to.eq(true)
      expect(onChangeSpy.calledWith(0)).to.eq(true)
    })

    it('should add and subtract count', function (done) {
      component.set('page', 5)
      component.set('total', 20)
      component.send('_onChange', 6)
      component.send('_onChange', 6)
      component.send('_onChange', 4)
      run.later(() => {
        expect(onChangeSpy.calledOnce).to.eq(true)
        expect(onChangeSpy.calledWith(6)).to.eq(true)
        done()
      }, 4)
    })
    it('should be able to cancel out paging', function (done) {
      component.set('page', 5)
      component.set('total', 20)
      component.send('_onChange', 6)
      component.send('_onChange', 4)
      run.later(() => {
        expect(onChangeSpy.calledOnce).to.eq(true)
        expect(onChangeSpy.calledWith(5)).to.eq(true)
        done()
      }, 4)
    })

    it('should cancel debounce if go to last page', function (done) {
      component.set('page', 5)
      component.set('total', 20)
      component.send('_onChange', 6)
      component.send('_onChange', 10)
      expect(onChangeSpy.calledOnce).to.eq(true)
      expect(onChangeSpy.calledWith(10)).to.eq(true)
      run.later(() => {
        expect(onChangeSpy.calledOnce).to.eq(true)
        done()
      }, 4)
    })
  })
})
