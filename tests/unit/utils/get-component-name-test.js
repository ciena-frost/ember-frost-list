import {expect} from 'chai'
import getComponentName from 'ember-frost-list/utils/get-component-name'
import {beforeEach, describe, it} from 'mocha'

describe('Unit | Utility | get component name', function () {
  let legacyComponent, modernComponent

  beforeEach(function () {
    legacyComponent = {__COMPONENT_PATH__: 'list-item'}
    modernComponent = {name: 'list-item'}
  })

  it('should return legacy component name', function () {
    expect(getComponentName(legacyComponent)).to.equal('list-item')
  })

  it('should return a modern component name', function () {
    expect(getComponentName(modernComponent)).to.equal('list-item')
  })
})
