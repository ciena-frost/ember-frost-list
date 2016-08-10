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
      list.addObject(Ember.Object.create(server.create('listItem', {
        'dimension': 'custom'
      })))
      list.addObject(Ember.Object.create(server.create('listItem', {
        'dimension': 'custom'
      })))

      this.set('model', list)
      this.set('items', Ember.A())

      this.set('componentPath', 'frost-list-item')

      this.on('selected', function (attrs) {
        if (attrs.isSelected) {
          this.get('items').addObject(attrs.record)
        } else {
          this.get('items').removeObject(attrs.record)
        }
      })

      this.render(hbs `
        {{frost-list
          componentPath
          hook='my-list'
          class='frost-list'
          onSelect=(action 'selected')
          records=model
          selections=items
        }}
      `)

      const self = this
      const $localHook = $hook

      return wait().then(() => {
        // ember-hook qualifiers currently doesn't work with component helper
        // {{frost-list}} will work, but {{component 'frost-list'}} doesn't
        expect($localHook('my-list').hasClass('frost-list')).to.be.true
        expect($localHook('my-list-item-0').hasClass('frost-list-item')).to.be.true
        expect($hook('my-list-item-0')).to.have.length(1)
        expect($hook('my-list-item-1')).to.have.length(1)
        assert.equal(self.$().find('vertical-item').length, 2)
      })
    })

//    it('renders frost-list-item and can be unselected', function () {
//      var list = Ember.A()
//      list.addObject(Ember.Object.create(server.create('listItem', {
//        'dimension': 'custom'
//      })))
//
//      this.set('model', list)
//      this.set('end', false)
//      this.set('items', Ember.A())
//      this.on('yEndReached', function () {
//        this.set('end', true)
//      })
//
//      this.on('selected', function (attrs) {
//        if (attrs.isSelected) {
//          this.get('items').addObject(attrs.record)
//        } else {
//          this.get('items').removeObject(attrs.record)
//        }
//      })
//
//      this.render(hbs `
//        {{#frost-list
//          class='frost-flex-1'
//          onScrollYEnd=(action 'yEndReached')
//          onSelect=(action 'selected')
//          records=model
//          selections=items
//          as |record|
//        }}
//          {{#if (eq record.record-type 'custom')}}
//            <div class="frost-list-item terse frost-list-user">
//              <div class='icon'>
//                {{frost-icon icon='frost/service'}}
//              </div>
//              <div class='block frost-flex-1'>
//                <div class='primary name'>Glanzer, Steven</div>
//                <div class='tertiary'>
//                  <span class='label'>Email:</span>sglanzer@gmail.com</div>
//              </div>
//              <div class='block frost-flex-1'>
//                <div class='secondary'>Application access</div>
//                <div class='tertiary'>None</div>
//              </div>
//              <div class='block frost-flex-1'>
//                <div class='secondary'>API keys</div>
//                <div class='tertiary'>None</div>
//              </div>
//              <div class='block frost-flex-1'>
//                <div class='secondary'>Enabled</div>
//              </div>
//            </div>
//          {{/if}}
//        {{/frost-list}}
//      `)
//
//      assert.lengthOf(this.$('.frost-list-item'), 1)
//      Ember.run(() => $('.frost-list-item').eq(0).click())
//      assert.lengthOf(this.get('items'), 1)
//      Ember.run(() => $('.frost-list-item').eq(0).click())
//      expect(this.get('items')).to.have.length(0)
//    })
  }
)
