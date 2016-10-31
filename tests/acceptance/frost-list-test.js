import Ember from 'ember'
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha'
import { expect } from 'chai'
import {
  mockCreate,
  mockFindAll,
  buildList,
  mockQuery,
  mockSetup,
  mockTeardown
} from 'ember-data-factory-guy'
import startApp from '../helpers/start-app'
import destroyApp from '../helpers/destroy-app'
import { hook, $hook } from 'ember-hook'

describe('Acceptance: FrostList', function () {
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

  it('can visit /', function () {
    let queryListItems = buildList('list-item', 30)
    mockQuery('list-item', {pageSize: 30, start: 0}).returns({ json: queryListItems })

    visit('/')

    andThen(function () {
      expect(currentPath()).to.equal('examples')
    })
  })

  it('can visit /qp-binding', function () {
    let queryBinding = buildList('list-item', 20)
    mockQuery('list-item', {pageSize: 20, start: 0}).returns({ json: queryBinding })

    visit('/qp-binding')

    andThen(function () {
      expect(currentPath()).to.equal('qp-binding')
    })
  })

  it('can expand and collapse', function () {
    let queryBinding = buildList('list-item', 20)
    mockQuery('list-item', {pageSize: 20, start: 0}).returns({ json: queryBinding })

    visit('/qp-binding')

    andThen(function () {
      expect(
        $hook('-item-0').hasClass('is-expanded')
      ).to.be.false
    })

    click(hook('-expand-all'))

    andThen(function () {
      expect(
        $hook('-item-0').hasClass('is-expanded')
      ).to.be.true
    })

    click(hook('-collapse-all'))

    andThen(function () {
      expect(
        $hook('-item-0').hasClass('is-expanded')
      ).to.be.false
    })
  })
})
