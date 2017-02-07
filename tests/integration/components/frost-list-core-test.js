import {expect} from 'chai'
import hbs from 'htmlbars-inline-precompile'
import {describe, it} from 'mocha'
import {registerMockComponent, unregisterMockComponent} from '../../helpers/mock-component'

import {integration} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'

const test = integration('frost-list-core')
describe.skip(test.label, function () {
  test.setup()

  it.skip('Header section renders when "sorting" is passed in', function () {
    registerMockComponent(this, 'mock-sort')

    this.render(hbs`
      {{frost-list-core
        sorting=(component 'mock-sort' class='mock-sort')
      }}
    `)

    expect(
      this.$('.frost-list-header'),
      'header section is rendered'
    ).to.have.length(1)

    expect(
      this.$('.mock-sort'),
      'sort component is rendered'
    ).to.have.length(1)

    unregisterMockComponent(this)
  })

  it.skip('Header section renders when "expansion" is passed in', function () {
    registerMockComponent(this, 'mock-expansion')

    this.render(hbs`
      {{frost-list-core
        expansion=(component 'mock-expansion' class='mock-expansion')
      }}
    `)

    expect(
      this.$('.frost-list-header'),
      'header section is rendered'
    ).to.have.length(1)

    expect(
      this.$('.mock-expansion'),
      'expansion component is rendered'
    ).to.have.length(1)

    unregisterMockComponent(this)
  })
})
