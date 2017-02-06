import {expect} from 'chai'
import {buildList, mockQuery, mockSetup, mockTeardown} from 'ember-data-factory-guy'
import {$hook, hook} from 'ember-hook'
import {afterEach, beforeEach, describe, it} from 'mocha'

import destroyApp from '../helpers/destroy-app'
import startApp from '../helpers/start-app'

describe.skip('Acceptance: FrostList', function () {
  let application

  beforeEach(function () {
    application = startApp()
    // Adding FactoryGuy mockSetup call
    mockSetup()
  })

  afterEach(function () {
    destroyApp(application)
    // Adding FactoryGuy mockTeardown call
    mockTeardown()
  })

  it('can expand and collapse rows', function () {
    let queryBinding = buildList('list-item', 20)
    mockQuery('list-item', {pageSize: 20, start: 0}).returns({json: queryBinding})

    visit('/qp-binding')

    andThen(function () {
      expect(
        $hook('-item-0').hasClass('is-expanded')
      ).to.eql(false)
    })

    click(hook('-expand-all'))

    andThen(function () {
      expect(
        $hook('-item-0').hasClass('is-expanded')
      ).to.eql(true)
    })

    click(hook('-collapse-all'))

    andThen(function () {
      expect(
        $hook('-item-0').hasClass('is-expanded')
      ).to.eql(false)
    })
  })
})
