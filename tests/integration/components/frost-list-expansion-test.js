import {expect} from 'chai'
import {
  $hook,
  initialize as initializeHook
} from 'ember-hook'
import {
  describeComponent,
  it
} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import {
  afterEach,
  beforeEach
} from 'mocha'
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
        this.$('.frost-list-expansion'),
        'class frost-list-expansion is set'
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
        collapseAllSpy.called,
        'onCollapseAll is fired'
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
        expandAllSpy.called,
        'onExpandAll is fired'
      ).to.eql(true)
    })

    it('concatenates the hook property', function () {
      this.render(hbs`
        {{frost-list-expansion
          hook='my-list'
          onCollapseAll='onCollapseAll'
          onExpandAll='onExpandAll'
        }}
      `)

      expect(
        $hook('my-list-collapse-all').text().trim(),
        '-collapse-all hook is set correctly'
      ).to.equal('Collapse all')

      expect(
        $hook('my-list-expand-all').text().trim(),
        '-expand-all hook is set correctly'
      ).to.equal('Expand all')
    })
  }
)
