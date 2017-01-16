/* jshint expr:true */
import { expect } from 'chai'
import {
  describe,
  it
} from 'mocha'
import {
  floor
} from 'ember-frost-list/helpers/is-lead-selection'

describe('FloorHelper', function () {
  // Replace this with your real tests.
  it('works', function () {
    let result = floor([42.8])
    expect(result).to.equal(42)
  })
})
