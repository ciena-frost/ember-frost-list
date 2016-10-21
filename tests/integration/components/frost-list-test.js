import Ember from 'ember'
const {A} = Ember
import {
  expect,
  assert
}
from 'chai'
import {
  make,
  manualSetup
} from 'ember-data-factory-guy'
import {
  describeComponent,
  it
}
from 'ember-mocha'
import wait from 'ember-test-helpers/wait'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach} from 'mocha'
import {
  $hook,
  initialize
} from 'ember-hook'

describeComponent(
  'frost-list',
  'Integration: FrostListComponent',
  {
    integration: true,
    setup: function () {
      manualSetup(this.container)
    }
  },
  function () {
    beforeEach(function () {
      initialize()
    })

    it('renders frost-list-item', function () {
      let list = A()
      list.addObject(make('list-item'))

      this.set('model', list)
      this.set('items', A())

      this.render(hbs`
        {{frost-list
          item=(component 'frost-list-item')
          hook='my-list'
          class='frost-list'
          items=model
        }}
      `)

      // Array function is not working here for some reason.
      const self = this
      const $localHook = $hook

      return wait().then(() => {
        // ember-hook qualifiers currently doesn't work with component helper
        // {{frost-list}} will work, but {{component 'frost-list'}} doesn't
        expect($localHook('my-list')).to.have.length(1)
        expect($localHook('my-list-item-0')).to.have.length(1)
        expect($hook('my-list-item-0')).to.have.length(1)
        assert.equal(self.$().find('vertical-item').length, 1)
      })
    })
  }
)
