import Ember from 'ember'
import {
  expect, assert
}
from 'chai'
import {
  describeComponent,
  it
}
from 'ember-mocha'
import wait from 'ember-test-helpers/wait'
import hbs from 'htmlbars-inline-precompile'
import setupMirage from '../../helpers/mirage-integration'
import {beforeEach} from 'mocha'
import {$hook, initialize} from 'ember-hook'

describeComponent(
  'frost-list',
  'Integration: FrostListComponent', {
    integration: true,
    setup: function () {
      setupMirage(this.container)
    }
  },
  function () {
    beforeEach(function () {
      initialize()
    })

    it('renders frost-list-item', function () {
      var list = Ember.A()
      list.addObject(Ember.Object.create(server.create('listItem')))
      list.addObject(Ember.Object.create(server.create('listItem')))

      this.set('model', list)
      this.set('items', Ember.A())

      this.render(hbs `
        {{frost-list
          'frost-list-item'
          hook='my-list'
          class='frost-list'
          items=model
        }}
      `)

      const self = this
      const $localHook = $hook

      return wait().then(() => {
        debugger;
        // ember-hook qualifiers currently doesn't work with component helper
        // {{frost-list}} will work, but {{component 'frost-list'}} doesn't
        expect($localHook('my-list')).to.have.length(1)
        expect($localHook('my-list-item-0')).to.have.length(1)
        expect($hook('my-list-item-0')).to.have.length(1)
        expect($hook('my-list-item-1')).to.have.length(1)
        assert.equal(self.$().find('vertical-item').length, 2)
      })
    })
  }
)
