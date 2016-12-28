/* jshint expr:true */
import { expect } from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describeComponent(
  'frost-list-item-secondary-identifier',
  'Integration: FrostListItemSecondaryIdentifierComponent',
  {
    integration: true
  },
  function () {
    it('renders', function () {
      // Set any properties with this.set('myProperty', 'value')
      // Handle any actions with this.on('myAction', function(val) { ... })
      // Template block usage:
      // this.render(hbs`
      //   {{#frost-list-item-secondary-identifier}}
      //     template content
      //   {{/frost-list-item-secondary-identifier}}
      // `)

      this.render(hbs`{{frost-list-item-secondary-identifier}}`)
      expect(this.$()).to.have.length(1)
    })
  }
)
