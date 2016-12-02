import { expect } from 'chai'
import { $hook, initialize as initializeHook } from 'ember-hook'
import { describeComponent, it } from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import { afterEach, beforeEach, describe } from 'mocha'
import sinon from 'sinon'

describeComponent(
  'frost-list-expansion',
  'Integration: FrostListExpansionComponent',
  {
    integration: true
  },
  function () {
    let sandbox

    beforeEach(function () {
      initializeHook()
      sandbox = sinon.sandbox.create()
    })

    afterEach(function () {
      sandbox.restore()
    })

    it('renders with default class', function () {
      this.render(hbs`
        {{frost-list-expansion
          onCollapseAll='onCollapseAll'
          onExpandAll='onExpandAll'
        }}
      `)

      expect(
        this.$('.frost-list-expansion')
      ).to.be.length(1)
    })

    it('fires onCollapseAll closure action', function () {
      const collapseAllSpy = sandbox.spy()

      this.on('collapseAllAction', collapseAllSpy)

      this.render(hbs`
        {{frost-list-expansion
          onCollapseAll=(action 'collapseAllAction')
          onExpandAll='onExpandAll'
        }}
      `)

      this.$($hook('-collapse-all')).trigger('click')

      expect(
        collapseAllSpy.called
      ).to.eql(true)
    })

    it('fires onExpandAll closure action', function () {
      const expandAllSpy = sandbox.spy()

      this.on('expandAllAction', expandAllSpy)

      this.render(hbs`
        {{frost-list-expansion
          onCollapseAll='onCollapseAll'
          onExpandAll=(action 'expandAllAction')
        }}
      `)

      this.$($hook('-expand-all')).trigger('click')

      expect(
        expandAllSpy.called
      ).to.eql(true)
    })

    describe('concatenates the hook property', function () {
      beforeEach(function () {
        this.render(hbs`
          {{frost-list-expansion
            hook='my-list'
            onCollapseAll='onCollapseAll'
            onExpandAll='onExpandAll'
          }}
        `)
      })

      it('sets -collapse-all hook correctly', function () {
        expect(
          $hook('my-list-collapse-all').text().trim()
        ).to.equal('Collapse all')
      })

      it('sets -expand-all hook correctly', function () {
        expect(
          $hook('my-list-expand-all').text().trim()
        ).to.equal('Expand all')
      })
    })
  }
)
