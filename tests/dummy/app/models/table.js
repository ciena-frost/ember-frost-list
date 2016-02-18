import DS from 'ember-data'

let Model = DS.Model.extend({
  text: DS.attr('string'),
  select: DS.attr('string'),
  checkbox: DS.attr('string'),
  stage: DS.attr('string'),
  hidden: DS.attr('string')
})

export default Model
