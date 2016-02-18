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
import hbs from 'htmlbars-inline-precompile'
import setupMirage from '../../helpers/mirage-integration'

describeComponent(
  'ember-frost-list',
  'Integration: FrostListComponent', {
    integration: true,
    setup: function () {
      setupMirage(this.container)
    }
  },
  function () {
    it('renders ember-frost-list-item', function () {
      var list = Ember.A()
      list.addObject(Ember.Object.create(server.create('listItem', {
        'dimension': 'custom'
      })))

      this.set('model', list)
      this.set('end', false)
      this.set('items', Ember.A())
      this.on('yEndReached', function () {
        this.set('end', true)
      })

      this.on('selected', function (attrs) {
        if (attrs.isSelected) {
          this.get('items').addObject(attrs.record)
        } else {
          this.get('items').removeObject(attrs.record)
        }
      })

      this.render(hbs `
				{{#ember-frost-list
					class='frost-flex-1'
					on-scroll-y-end=(action 'yEndReached')
					on-select=(action 'selected')
					records=model
					selections=items
					as |record|
				}}
					{{#if (eq record.record-type 'custom')}}
						<div class="ember-frost-list-item terse ember-frost-list-user">
							<div class='icon'>
								{{frost-svg path='frost/service'}}
							</div>
							<div class='block frost-flex-1'>
								<div class='primary name'>Glanzer, Steven</div>
								<div class='tertiary'>
									<span class='label'>Email:</span>sglanzer@gmail.com</div>
							</div>
							<div class='block frost-flex-1'>
								<div class='secondary'>Application access</div>
								<div class='tertiary'>None</div>
							</div>
							<div class='block frost-flex-1'>
								<div class='secondary'>API keys</div>
								<div class='tertiary'>None</div>
							</div>
							<div class='block frost-flex-1'>
								<div class='secondary'>Enabled</div>
							</div>
						</div>
					{{/if}}
				{{/ember-frost-list}}
			`)

      assert.lengthOf(this.$('.ember-frost-list-item'), 1)
      expect(this.$()).to.have.length(1)
    })

    it('renders ember-frost-list-node', function () {
      var list = Ember.A()
      list.addObject(Ember.Object.create(server.create('listItem', {
        'dimension': 'NC'
      })))

      this.set('model', list)
      this.set('end', false)
      this.set('items', Ember.A())
      this.on('yEndReached', function () {
        this.set('end', true)
      })
      this.on('selected', function (attrs) {
        if (attrs.isSelected) {
          this.get('items').addObject(attrs.record)
        } else {
          this.get('items').removeObject(attrs.record)
        }
      })

      this.render(hbs `
				{{#ember-frost-list
					class='frost-flex-1'
					on-scroll-y-end=(action 'yEndReached')
					on-select=(action 'selected')
					records=model
					selections=items
					as |record|
				}}
				{{/ember-frost-list}}
			`)

      assert.lengthOf(this.$('.ember-frost-list-item'), 1)
      Ember.run(() => $('.ember-frost-list-item').eq(0).click())
      assert.lengthOf(this.get('items'), 1)
      expect(this.get('items')).to.have.length(1)
    })

    it('renders a ember-frost-list-service', function () {
      var list = Ember.A()
      list.addObject(Ember.Object.create(server.create('listItem', {
        'dimension': 'SERVICE'
      })))

      this.set('model', list)
      this.set('end', false)
      this.set('items', Ember.A())
      this.on('yEndReached', function () {
        this.set('end', true)
      })
      this.on('selected', function (attrs) {
        if (attrs.isSelected) {
          this.get('items').addObject(attrs.record)
        } else {
          this.get('items').removeObject(attrs.record)
        }
      })

      this.render(hbs `
				{{#ember-frost-list
					class='frost-flex-1'
					on-scroll-y-end=(action 'yEndReached')
					on-select=(action 'selected')
					records=model
					selections=items
					as |record|
				}}
				{{/ember-frost-list}}
			`)

      assert.lengthOf(this.$('.ember-frost-list-item'), 1)
      Ember.run(() => $('.ember-frost-list-item').eq(0).click())
      assert.lengthOf(this.get('items'), 1)
      expect(this.get('items')).to.have.length(1)
    })

    it('renders a ember-frost-list-service and can be unselected', function () {
      var list = Ember.A()
      list.addObject(Ember.Object.create(server.create('listItem', {
        'dimension': 'SERVICE'
      })))

      this.set('model', list)
      this.set('end', false)
      this.set('items', Ember.A())
      this.on('yEndReached', function () {
        this.set('end', true)
      })
      this.on('selected', function (attrs) {
        if (attrs.isSelected) {
          this.get('items').addObject(attrs.record)
        } else {
          this.get('items').removeObject(attrs.record)
        }
      })

      this.render(hbs `
				{{#ember-frost-list
					class='frost-flex-1'
					on-scroll-y-end=(action 'yEndReached')
					on-select=(action 'selected')
					records=model
					selections=items
					as |record|
				}}
				{{/ember-frost-list}}
			`)

      assert.lengthOf(this.$('.ember-frost-list-item'), 1)
      Ember.run(() => $('.ember-frost-list-item').eq(0).click())
      assert.lengthOf(this.get('items'), 1)
      Ember.run(() => $('.ember-frost-list-item').eq(0).click())
      expect(this.get('items')).to.have.length(0)
    })
  }
)
