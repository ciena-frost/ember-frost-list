import {expect} from 'chai'
import {describeComponent} from 'ember-mocha'
import PropTypeMixin from 'ember-prop-types'
import {
  beforeEach,
  it
} from 'mocha'

describeComponent(
  'frost-list',
  'Unit: FrostListComponent',
  {
    unit: true
  },
  function () {
    let component

    beforeEach(function () {
      component = this.subject()
    })

    it('sets default properties value correctly', function () {
      expect(
        component.get('alwaysUseDefaultHeight'),
        'alwaysUseDefaultHeight: false'
      ).to.eql(false)
    })

    it('has the expected Mixins', function () {
      expect(
        PropTypeMixin.detect(component),
        'PropTypeMixin Mixin is present'
      ).to.eql(true)
    })
  }
)
