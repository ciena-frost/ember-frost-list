import FactoryGuy from 'ember-data-factory-guy'

FactoryGuy.define('list-item', {
  sequences: {
    label: (num) => {
      let items = [
        'foo',
        'bar',
        'biz',
        'baz'
      ]
      return items[num % items.length]
    }
  },

  default: {
    label: FactoryGuy.generate('label')
  }
})
