import DS from 'ember-data'

var Model = DS.Model.extend({
  label: DS.attr('string'),
  itemType: DS.attr('string') // Cannot use 'type' because it is a reserved word
})

export default Model
