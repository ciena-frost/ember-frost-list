const expect = chai.expect

import {describeComponent} from 'ember-mocha'
import {beforeEach, it} from 'mocha'

describeComponent(
  'frost-list',
  'FrostListComponent',
  {},
  function () {
    let component

    beforeEach(function () {
      component = this.subject()
    })

    it('has class frost-list', function () {
      expect(component.classNames).to.include('frost-list')
    })
  }
)
