import {expect} from 'chai'
import {$hook, initialize as initializeHook} from 'ember-hook'
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

  describe.skip('default render state', function () {
    beforeEach(function () {
      this.set('actions', {
        onChange: function () {}
      })

      this.render(hbs`
        {{frost-pagination
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
        this.$('.frost-pagination')
      ).to.have.length(1)
    })

    it('shows correct pagination text', function () {
      expect(
        this.$('.frost-pagination-text').text().trim()
      ).to.eql('1 to 10 of 100')
    })

    describe('hooks', function () {
      it('sets "-first-page" hook', function () {
        expect(
          this.$($hook('myHook-first-page'))
        ).to.have.length(1)
      })

      it('sets "-previous-page" hook', function () {
        expect(
          this.$($hook('myHook-previous-page'))
        ).to.have.length(1)
      })

      it('sets "-next-page" hook', function () {
        expect(
          this.$($hook('myHook-next-page'))
        ).to.have.length(1)
      })

      it('sets "-last-page" hook', function () {
        expect(
          this.$($hook('myHook-last-page'))
        ).to.have.length(1)
      })
    })

    describe('disables buttons on the left', function () {
      it('disables "first page" button', function () {
        expect(
          this.$($hook('myHook-first-page')).prop('disabled')
        ).to.eql(true)
      })

      it('disables "previous page" button', function () {
        expect(
          this.$($hook('myHook-previous-page')).prop('disabled')
        ).to.eql(true)
      })
    })

    describe('enables buttons on the right', function () {
      it('enables "last page" button', function () {
        expect(
          this.$($hook('myHook-last-page')).prop('disabled')
        ).to.eql(false)
      })

      it('enables "next page" button', function () {
        expect(
          this.$($hook('myHook-next-page')).prop('disabled')
        ).to.eql(false)
      })
    })
  })

  describe.skip('on page "11 to 20"', function () {
    beforeEach(function () {
      this.set('actions', {
        onChange: function () {}
      })

      this.render(hbs`
        {{frost-pagination
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
        this.$('.frost-pagination-text').text().trim()
      ).to.eql('11 to 20 of 100')
    })

    describe('enable all buttons', function () {
      it('enables "first page" button', function () {
        expect(
          this.$($hook('myHook-first-page')).prop('disabled')
        ).to.eql(false)
      })

      it('enables "previous page" button', function () {
        expect(
          this.$($hook('myHook-previous-page')).prop('disabled')
        ).to.eql(false)
      })

      it('enables "next page" button', function () {
        expect(
          this.$($hook('myHook-next-page')).prop('disabled')
        ).to.eql(false)
      })

      it('enables "last page" button', function () {
        expect(
          this.$($hook('myHook-last-page')).prop('disabled')
        ).to.eql(false)
      })
    })
  })

  describe.skip('on last page', function () {
    beforeEach(function () {
      this.set('actions', {
        onChange: function () {}
      })

      this.render(hbs`
        {{frost-pagination
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
        this.$('.frost-pagination-text').text().trim()
      ).to.eql('91 to 100 of 100')
    })

    describe('enables buttons on the left', function () {
      it('enables "first page" button', function () {
        expect(
          this.$($hook('myHook-first-page')).prop('disabled')
        ).to.eql(false)
      })

      it('enables "previous page" button', function () {
        expect(
          this.$($hook('myHook-previous-page')).prop('disabled')
        ).to.eql(false)
      })
    })

    describe('disables buttons on the right', function () {
      it('disables "next page" button', function () {
        expect(
          this.$($hook('myHook-next-page')).prop('disabled')
        ).to.eql(true)
      })

      it('disables "last page" button', function () {
        expect(
          this.$($hook('myHook-last-page')).prop('disabled')
        ).to.eql(true)
      })
    })
  })

  describe.skip('fires onChange closure action', function () {
    let onChangeSpy

    beforeEach(function () {
      onChangeSpy = sandbox.spy()
      this.on('onChangeAction', onChangeSpy)

      this.render(hbs`
        {{frost-pagination
          itemsPerPage=10
          page=0
          total=100
          hook='myHook'
          onChange=(action 'onChangeAction')
        }}
      `)

      this.$($hook('myHook-next-page')).trigger('click')
    })

    it('fires onChangeSpy', function () {
      expect(
        onChangeSpy.called
      ).to.eql(true)
    })
  })
})
