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
    },
    itemType: (num) => {
      let items = [
        'a',
        'b',
        'c',
        'd'
      ]
      return items[num % items.length]
    }
  },

  default: {
    label: FactoryGuy.generate('label'),
    itemType: FactoryGuy.generate('itemType')
  }
})
