import { expect } from 'chai'
import { describeComponent } from 'ember-mocha'
import { beforeEach, it } from 'mocha'

describeComponent(
  'frost-list-expansion',
  'Unit: FrostListExpansionComponent',
  {
    unit: true
  },
  function () {
    let component

    beforeEach(function () {
      component = this.subject()
    })

    it.skip('includes className frost-list-expansion', function () {
      expect(component.classNames).to.include('frost-list-expansion')
    })
  }
)
