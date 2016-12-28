/* jshint expr:true */
import { expect } from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describeComponent(
  'frost-list-item-primary-identifier',
  'Integration: FrostListItemPrimaryIdentifierComponent',
  {
    integration: true
  },
  function () {
    it('renders', function () {
      // Set any properties with this.set('myProperty', 'value')
      // Handle any actions with this.on('myAction', function(val) { ... })
      // Template block usage:
      // this.render(hbs`
      //   {{#frost-list-item-primary-identifier}}
      //     template content
      //   {{/frost-list-item-primary-identifier}}
      // `)

      this.render(hbs`{{frost-list-item-primary-identifier}}`)
      expect(this.$()).to.have.length(1)
    })
  }
)
