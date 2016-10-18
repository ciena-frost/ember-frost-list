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
      ).to.be.false

      expect(
        component.get('defaultHeight'),
        'defaultHeight: 45'
      ).to.eql(45)
    })

    it('has the expected Mixins', function () {
      expect(
        PropTypeMixin.detect(component),
        'PropTypeMixin Mixin is present'
      ).to.be.true
    })
  }
)
