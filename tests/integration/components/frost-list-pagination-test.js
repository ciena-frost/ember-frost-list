import {expect} from 'chai'
import Ember from 'ember'
const {Component} = Ember
import {$hook, initialize as initializeHook} from 'ember-hook'
import wait from 'ember-test-helpers/wait'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

import {integration} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'

const test = integration('frost-list-pagination')
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

  describe('default render state', function () {
    beforeEach(function () {
      this.set('actions', {
        onChange: function () {}
      })

      this.render(hbs`
        {{frost-list-pagination
          itemsPerPage=10
          page=0
          total=100
          hook='myHook'
          onChange=(action 'onChange')
        }}
      `)
    })

    it('sets frost-pagination class', function () {
      expect(
        this.$('.frost-list-pagination')
      ).to.have.length(1)
    })

    it('shows correct pagination text', function () {
      expect(
        $hook('myHook-text').text().trim()
      ).to.eql('1 to 10 of 100')
    })

    describe('hooks', function () {
      it('sets "-first-page" hook', function () {
        expect($hook('myHook-first-page')).to.have.length(1)
      })

      it('sets "-previous-page" hook', function () {
        expect($hook('myHook-previous-page')).to.have.length(1)
      })

      it('sets "-text" hook', function () {
        expect($hook('myHook-text')).to.have.length(1)
      })

      it('sets "-next-page" hook', function () {
        expect($hook('myHook-next-page')).to.have.length(1)
      })

      it('sets "-last-page" hook', function () {
        expect($hook('myHook-last-page')).to.have.length(1)
      })
    })

    describe('"first page" button', function () {
      it('should be set to "small"', function () {
        expect($hook('myHook-first-page')).to.have.class('small')
      })

      it('should be set to correct glyph', function () {
        expect($hook('myHook-first-page-icon')).to.have.class('frost-icon-frost-chevron-double')
      })
    })

    describe('"previous page" button', function () {
      it('should be set to "small"', function () {
        expect($hook('myHook-previous-page')).to.have.class('small')
      })

      it('should be set to correct glyph', function () {
        expect($hook('myHook-previous-page-icon')).to.have.class('frost-icon-frost-chevron')
      })
    })

    describe('"next page" button', function () {
      it('should be set to "small"', function () {
        expect($hook('myHook-next-page')).to.have.class('small')
      })

      it('should be set to correct glyph', function () {
        expect($hook('myHook-next-page-icon')).to.have.class('frost-icon-frost-chevron')
      })
    })

    describe('"last page" button', function () {
      it('should be set to "small"', function () {
        expect($hook('myHook-last-page')).to.have.class('small')
      })

      it('should be set to correct glyph', function () {
        expect($hook('myHook-last-page-icon')).to.have.class('frost-icon-frost-chevron-double')
      })
    })

    describe('disables buttons on the left', function () {
      it('disables "first page" button', function () {
        expect(
          $hook('myHook-first-page').prop('disabled')
        ).to.eql(true)
      })

      it('disables "previous page" button', function () {
        expect(
          $hook('myHook-previous-page').prop('disabled')
        ).to.eql(true)
      })
    })

    describe('enables buttons on the right', function () {
      it('enables "last page" button', function () {
        expect(
          $hook('myHook-last-page').prop('disabled')
        ).to.eql(false)
      })

      it('enables "next page" button', function () {
        expect(
          $hook('myHook-next-page').prop('disabled')
        ).to.eql(false)
      })
    })
  })

  describe('on page "11 to 20"', function () {
    beforeEach(function () {
      this.set('actions', {
        onChange: function () {}
      })

      this.render(hbs`
        {{frost-list-pagination
          itemsPerPage=10
          page=1
          total=100
          hook='myHook'
          onChange=(action 'onChange')
        }}
      `)
    })

    it('shows correct pagination text', function () {
      expect(
        $hook('myHook-text').text().trim()
      ).to.eql('11 to 20 of 100')
    })

    describe('enable all buttons', function () {
      it('enables "first page" button', function () {
        expect(
          $hook('myHook-first-page').prop('disabled')
        ).to.eql(false)
      })

      it('enables "previous page" button', function () {
        expect(
          $hook('myHook-previous-page').prop('disabled')
        ).to.eql(false)
      })

      it('enables "next page" button', function () {
        expect(
          $hook('myHook-next-page').prop('disabled')
        ).to.eql(false)
      })

      it('enables "last page" button', function () {
        expect(
          $hook('myHook-last-page').prop('disabled')
        ).to.eql(false)
      })
    })
  })

  describe('on last page', function () {
    beforeEach(function () {
      this.set('actions', {
        onChange: function () {}
      })

      this.render(hbs`
        {{frost-list-pagination
          itemsPerPage=10
          page=9
          total=100
          hook='myHook'
          onChange=(action 'onChange')
        }}
      `)
    })

    it('shows correct pagination text', function () {
      expect(
        $hook('myHook-text').text().trim()
      ).to.eql('91 to 100 of 100')
    })

    describe('enables buttons on the left', function () {
      it('enables "first page" button', function () {
        expect(
          $hook('myHook-first-page').prop('disabled')
        ).to.eql(false)
      })

      it('enables "previous page" button', function () {
        expect(
          $hook('myHook-previous-page').prop('disabled')
        ).to.eql(false)
      })
    })

    describe('disables buttons on the right', function () {
      it('disables "next page" button', function () {
        expect(
          $hook('myHook-next-page').prop('disabled')
        ).to.eql(true)
      })

      it('disables "last page" button', function () {
        expect(
          $hook('myHook-last-page').prop('disabled')
        ).to.eql(true)
      })
    })
  })

  describe('when "total" is 0', function () {
    beforeEach(function () {
      this.set('actions', {
        onChange: function () {}
      })

      this.render(hbs`
        {{frost-list-pagination
          itemsPerPage=10
          page=0
          total=0
          hook='myHook'
          onChange=(action 'onChange')
        }}
      `)
    })

    it('shows correct pagination text', function () {
      expect(
        $hook('myHook-text').text().trim()
      ).to.eql('0 results found')
    })

    describe('disables buttons on the right', function () {
      it('disables "next page" button', function () {
        expect(
          $hook('myHook-next-page').prop('disabled')
        ).to.eql(true)
      })

      it('disables "last page" button', function () {
        expect(
          $hook('myHook-last-page').prop('disabled')
        ).to.eql(true)
      })
    })
  })

  describe('when the four pagination buttons are clicked', function () {
    let onChangeSpy

    beforeEach(function () {
      onChangeSpy = sandbox.spy()
      this.register('component:frost-button', Component.extend())
      this.register(
        'template:components/frost-button',
        hbs`<div class='frost-button' {{action onClick}}>Button</div>`
      )
      this.on('onChangeAction', onChangeSpy)

      this.render(hbs`
        {{frost-list-pagination
          itemsPerPage=10
          page=0
          total=100
          hook='myHook'
          onChange=(action 'onChangeAction')
        }}
      `)

      return wait()
    })

    it('fires onChange closure action', function () {
      this.$('.frost-button').trigger('click')

      return wait().then(() => {
        expect(onChangeSpy).to.have.callCount(4)
      })
    })
  })
})
