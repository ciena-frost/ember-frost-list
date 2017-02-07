import {expect} from 'chai'
import {beforeEach, describe, it} from 'mocha'

import {unit} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'

const test = unit('frost-list-selection-indicator')
describe(test.label, function () {
  test.setup()

  let component

  beforeEach(function () {
    component = this.subject()
  })

  it.skip('includes className frost-list-selection-indicator', function () {
    expect(component.classNames).to.include('frost-list-selection-indicator')
  })
})
