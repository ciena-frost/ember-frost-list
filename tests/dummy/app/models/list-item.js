import DS from 'ember-data'
const {Model, attr} = DS

export default Model.extend({
  label: attr('string'),
  itemType: attr('string') // Cannot use 'type' because it is a reserved word
})
