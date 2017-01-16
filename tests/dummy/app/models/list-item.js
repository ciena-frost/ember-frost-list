import DS from 'ember-data'

var Model = DS.Model.extend({
  label: DS.attr('string')
})

export default Model
