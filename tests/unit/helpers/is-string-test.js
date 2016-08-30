/* jshint expr:true */
import { expect } from 'chai'
import {
  describe,
  it
} from 'mocha'
import {
  isString
} from 'ember-frost-list/helpers/is-string'

describe('IsStringHelper', function () {
  // Replace this with your real tests.
  it('false', function () {
    let result = isString(42)
    expect(result).to.be.false
  })

  it('true', function () {
    let result = isString('foo')
    expect(result).to.be.true
  })
})
