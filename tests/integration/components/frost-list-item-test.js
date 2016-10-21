import { expect } from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import sinon from 'sinon'

describeComponent(
  'frost-list-item',
  'Integration: FrostListItemComponent',
  {
    integration: true
  },
  function () {
    it('default state has no class "is-selected" and "is-expanded"', function () {
      this.render(hbs`
        {{frost-list-item}}
      `)
      expect(
        this.$('.frost-list-item').hasClass('is-selected'),
        'is-selected not set'
      ).to.be.false

      expect(
        this.$('.frost-list-item').hasClass('is-expanded'),
        'is-expanded not set'
      ).to.be.false
    })

    it('sets "is-selected" class when model.isSelected=true', function () {
      this.set('model', { isSelected: true })

      this.render(hbs`
        {{frost-list-item
          model=model
        }}
      `)

      expect(
        this.$('.frost-list-item').hasClass('is-selected'),
        'is-selected class set'
      ).to.be.true
    })
  }
)
