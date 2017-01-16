import {expect} from 'chai'
import {describeComponent} from 'ember-mocha'
import { beforeEach, it } from 'mocha'

describeComponent(
  'frost-list-selection-indicator',
  'Unit: FrostListSelectionIndicatorComponent',
  {
    unit: true
  },
  function () {
    let component

    beforeEach(function () {
      component = this.subject()
    })

    it.skip('includes className frost-list-selection-indicator', function () {
      expect(component.classNames).to.include('frost-list-selection-indicator')
    })
  }
)
