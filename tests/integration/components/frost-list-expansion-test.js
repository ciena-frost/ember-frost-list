import {expect} from 'chai'
import {$hook, initialize as initializeHook} from 'ember-hook'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

const test = integration('frost-list-expansion')
describe(test.label, function () {
  test.setup()

  let sandbox

  beforeEach(function () {
    initializeHook()
    sandbox = sinon.sandbox.create()
  })

  afterEach(function () {
    sandbox.restore()
  })

  it('should render with default class', function () {
    this.render(hbs`
      {{frost-list-expansion
        hook='myExpansion'
        onCollapseAll='onCollapseAll'
        onExpandAll='onExpandAll'
      }}
    `)

    expect(this.$('.frost-list-expansion')).to.be.length(1)
  })

  it('should fire onCollapseAll closure action', function () {
    const collapseAllSpy = sandbox.spy()

    this.on('collapseAllAction', collapseAllSpy)

    this.render(hbs`
      {{frost-list-expansion
        hook='myExpansion'
        onCollapseAll=(action 'collapseAllAction')
        onExpandAll='onExpandAll'
      }}
    `)

    $hook('myExpansion-collapse-all').trigger('click')

    expect(collapseAllSpy).have.callCount(1)
  })

  it('should fire onExpandAll closure action', function () {
    const expandAllSpy = sandbox.spy()

    this.on('expandAllAction', expandAllSpy)

    this.render(hbs`
      {{frost-list-expansion
        hook='myExpansion'
        onCollapseAll='onCollapseAll'
        onExpandAll=(action 'expandAllAction')
      }}
    `)

    $hook('myExpansion-expand-all').trigger('click')

    expect(expandAllSpy).have.callCount(1)
  })

  describe('concatenates the hook property', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-list-expansion
          hook='myExpansion'
          onCollapseAll='onCollapseAll'
          onExpandAll='onExpandAll'
        }}
      `)
    })

    it('should set -collapse-all hook correctly', function () {
      expect(
        $hook('myExpansion-collapse-all').text().trim()
      ).to.equal('Collapse all')
    })

    it('should set -expand-all hook correctly', function () {
      expect(
        $hook('myExpansion-expand-all').text().trim()
      ).to.equal('Expand all')
    })
  })
})
