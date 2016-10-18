import FactoryGuy from 'ember-data-factory-guy'

let type = null

FactoryGuy.define('list-item', {
  sequences: {
    dimension: (num) => {
      let items = ['NC', 'SERVICE', 'custom']
      type = items[num % items.length]
      return type
    },
    label: (num) => {
      let items = [
        'G4336-7NCP31',
        'OTN/10GE/G4218-2NCP06/G4218-2NCP07/20005',
        '4-Node OPS'
      ]
      return items[num % items.length]
    },
    metaData: () => {
      if (type === 'NC') {
        return {
          Type: '6500',
          'IP address': '47.134.163.136',
          'MAC address': '40:AA:42:18:06:00',
          Release: '10.1.0',
          State: 'Normal'
        }
      } else if (type === 'SERVICE') {
        if (faker.random.number({ // eslint-disable-line
          min: 0,
          max: 1
        })) {
          return {
            Directionality: 'UNIDIRECTIONAL',
            'Destination endpoint': 'OPS2-ETH10G-2-23-1, DWA2-ETH10G-2-23-1',
            'Source endpoint': 'OPS1-ETH10G-1-23-1, DWA1-ETH10G-1-23-1'
          }
        } else {
          return {
            Rate: 'Ethernet',
            Directionality: 'BIDIRECTIONAL',
            'Destination endpoint': 'DWA1-2-ETH10G-2-23-5',
            'Source endpoint': 'DWA1-1-ETH10G-1-23-5'
          }
        }
      } else {
        return {}
      }
    }
  },

  default: {
    dimension: FactoryGuy.generate('dimension'),
    label: FactoryGuy.generate('label'),
    metaData: FactoryGuy.generate('metaData')
  }
})
