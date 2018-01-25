import {expect} from 'chai'
import Ember from 'ember'
const {Component} = Ember
import {$hook, initialize as initializeHook} from 'ember-hook'
import wait from 'ember-test-helpers/wait'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

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

    it('should set frost-pagination class', function () {
      expect(
        this.$('.frost-list-pagination')
      ).to.have.length(1)
    })

    it('should show correct pagination text', function () {
      expect(
        $hook('myHook-text').text().trim()
      ).to.eql('1 to 10 of 100')
    })

    describe('hooks', function () {
      it('should set "-first-page" hook', function () {
        expect($hook('myHook-first-page')).to.have.length(1)
      })

      it('should set "-previous-page" hook', function () {
        expect($hook('myHook-previous-page')).to.have.length(1)
      })

      it('should set "-text" hook', function () {
        expect($hook('myHook-text')).to.have.length(1)
      })

      it('should set "-next-page" hook', function () {
        expect($hook('myHook-next-page')).to.have.length(1)
      })

      it('should set "-last-page" hook', function () {
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
      it('should disable "first page" button', function () {
        expect(
          $hook('myHook-first-page').prop('disabled')
        ).to.eql(true)
      })

      it('should disable "previous page" button', function () {
        expect(
          $hook('myHook-previous-page').prop('disabled')
        ).to.eql(true)
      })
    })

    describe('enables buttons on the right', function () {
      it('should enable "last page" button', function () {
        expect(
          $hook('myHook-last-page').prop('disabled')
        ).to.eql(false)
      })

      it('should enable "next page" button', function () {
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

    it('should show correct pagination text', function () {
      expect(
        $hook('myHook-text').text().trim()
      ).to.eql('11 to 20 of 100')
    })

    describe('enable all buttons', function () {
      it('should enable "first page" button', function () {
        expect(
          $hook('myHook-first-page').prop('disabled')
        ).to.eql(false)
      })

      it('should enable "previous page" button', function () {
        expect(
          $hook('myHook-previous-page').prop('disabled')
        ).to.eql(false)
      })

      it('should enable "next page" button', function () {
        expect(
          $hook('myHook-next-page').prop('disabled')
        ).to.eql(false)
      })

      it('should enable "last page" button', function () {
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

    it('should show correct pagination text', function () {
      expect(
        $hook('myHook-text').text().trim()
      ).to.eql('91 to 100 of 100')
    })

    describe('enables buttons on the left', function () {
      it('should enable "first page" button', function () {
        expect(
          $hook('myHook-first-page').prop('disabled')
        ).to.eql(false)
      })

      it('should enable "previous page" button', function () {
        expect(
          $hook('myHook-previous-page').prop('disabled')
        ).to.eql(false)
      })
    })

    describe('disables buttons on the right', function () {
      it('should disable "next page" button', function () {
        expect(
          $hook('myHook-next-page').prop('disabled')
        ).to.eql(true)
      })

      it('should disable "last page" button', function () {
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

    it('should show correct pagination text', function () {
      expect(
        $hook('myHook-text').text().trim()
      ).to.eql('0 results found')
    })

    describe('disables buttons on the right', function () {
      it('should disable "next page" button', function () {
        expect(
          $hook('myHook-next-page').prop('disabled')
        ).to.eql(true)
      })

      it('should disable "last page" button', function () {
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

    it('should fire onChange closure action', function () {
      this.$('.frost-button').trigger('click')

      return wait().then(() => {
        expect(onChangeSpy).to.have.callCount(4)
      })
    })
  })
})
