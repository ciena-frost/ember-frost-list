import {expect} from 'chai'
import {beforeEach, describe, it} from 'mocha'

import {unit} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'

const test = unit('frost-list-expansion')
describe(test.label, function () {
  test.setup()

  let component

  beforeEach(function () {
    component = this.subject()
  })

  it.skip('includes className frost-list-expansion', function () {
    expect(component.classNames).to.include('frost-list-expansion')
  })
})
