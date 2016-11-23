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

      this.set('actions', {
        onChange: function () {
          console.log('foo')
        }
      })

      this.render(hbs`{{frost-pagination
        itemsPerPage=10
        page=0
        total=100
        onChange=(action 'onChange')
      }}`)
      expect(this.$()).to.have.length(1)
    })
  }
)
