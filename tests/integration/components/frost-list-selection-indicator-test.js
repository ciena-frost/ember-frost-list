import {expect} from 'chai'
import hbs from 'htmlbars-inline-precompile'
import {describe, it} from 'mocha'

import {integration} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'

const test = integration('frost-list-selection-indicator')
describe(test.label, function () {
  test.setup()

  it.skip('"selected" class is NOT set by default', function () {
    this.render(hbs`
      {{frost-list-selection-indicator}}
    `)

    expect(
      this.$('.frost-list-selection-indicator').hasClass('selected')
    ).to.eql(false)
  })

  it.skip('sets "selected" class when isSelected=true', function () {
    this.render(hbs`
      {{frost-list-selection-indicator
        isSelected=true
      }}
    `)

    expect(
      this.$('.frost-list-selection-indicator').hasClass('selected')
    ).to.eql(true)
  })
})
