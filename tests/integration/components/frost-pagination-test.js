/* jshint expr:true */
import { expect } from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describeComponent(
  'frost-pagination',
  'Integration: FrostPaginationComponent',
  {
    integration: true
  },
  function () {
    it('renders', function () {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#frost-pagination}}
      //     template content
      //   {{/frost-pagination}}
      // `);

      this.render(hbs`{{frost-pagination}}`)
      expect(this.$()).to.have.length(1)
    })
  }
)
