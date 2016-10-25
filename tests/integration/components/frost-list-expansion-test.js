import { expect } from 'chai'
import {
  $hook,
  initialize
} from 'ember-hook'
import Ember from 'ember'
import {
  describeComponent,
  it
} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import { beforeEach } from 'mocha'
import sinon from 'sinon'

describeComponent(
  'frost-list-expansion',
  'Integration: FrostListExpansionComponent',
  {
    integration: true
  },
  function () {
    beforeEach(function () {
      initialize()
    }) 

    it('renders', function () {
      const targetObject = {
        onCollapseAll: sinon.spy(),
        onExpandAll: sinon.spy()
      }

      this.render(hbs`
        {{frost-list-expansion
          targetObject=targetObject
          onCollapseAll='onCollapseAll'
          onExpandAll='onExpandAll'
        }}
      `)

      expect(
        this.$(),
        'class frost-list-expansion is set'
      ).to.be.length(1)
    })

    it('fires onCollapseAll closure action', function () {
      const collapseAllSpy = sinon.spy()

      this.on('collapseAllAction', collapseAllSpy)

      this.render(hbs`
        {{frost-list-expansion
          onCollapseAll=(action 'collapseAllAction')
          onExpandAll='onExpandAll'
        }}
      `)

      this.$($hook('collapse')).trigger('click')

      expect(
        collapseAllSpy.called,
        'onCollapseAll is fired'
      ).to.be.true
    })

    it('fires onExpandAll closure action', function () {
      const expandAllSpy = sinon.spy()

      this.on('expandAllAction', expandAllSpy)

      this.render(hbs`
        {{frost-list-expansion
          onCollapseAll='onCollapseAll'
          onExpandAll=(action 'expandAllAction')
        }}
      `)

      this.$($hook('expand')).trigger('click')

      expect(
        expandAllSpy.called,
        'onExpandAll is fired'
      ).to.be.true
    })
  }
)
