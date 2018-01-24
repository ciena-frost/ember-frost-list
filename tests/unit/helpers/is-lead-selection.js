/* eslint-env node */

import {expect} from 'chai'
import {floor} from 'ember-frost-list/helpers/is-lead-selection'
import {describe, it} from 'mocha'

describe.skip('Unit / Helper / is-lead-selection', function () {
  // Replace this with your real tests.
  it('should work', function () {
    let result = floor([42.8])
    expect(result).to.equal(42)
  })
})
