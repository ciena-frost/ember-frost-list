import {expect} from 'chai'
import {floor} from 'ember-frost-list/helpers/floor'
import {describe, it} from 'mocha'

describe('Unit / Helper / floor', function () {
  it('should work for positive numbers', function () {
    let result = floor([42.8])
    expect(result).to.equal(42)
  })

  it('should work for negative numbers', function () {
    let result = floor([-42.8])
    expect(result).to.equal(-43)
  })
})
