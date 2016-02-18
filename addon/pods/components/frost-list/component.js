import Ember from 'ember'
import _ from 'lodash/lodash'
import layout from './template'

export default Ember.Component.extend({
  layout: layout,
  classNames: ['frost-list'],
  records: Ember.computed.alias('model'), // TODO Log deprecation of model as an attribute

  // Normalize the data - TODO when the API improves this can be removed
  _records: Ember.computed('records.[]', function () {
    const records = this.get('records')
    if (Ember.isEmpty(records)) {
      return []
    }

    return records.map(function (record) {
      if (_.isString(record.get('record-type'))) {
        return record
      }

      record.set('record-type', record.get('dimension'))
      return record
    })
  }),

  mappedRecords: Ember.computed('_records.[]', 'selections.[]', function () {
    let records = this.get('_records')
    return records.map((record) => {
      if (_.includes(this.get('selections'), record)) {
        record.set('isSelected', true)
      } else {
        record.set('isSelected', false)
      }
      return record
    })
  })
})
