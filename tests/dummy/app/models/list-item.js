import DS from 'ember-data';

var Model = DS.Model.extend({
	label: DS.attr('string'),
	dimension: DS.attr('string'),
	metaData: DS.attr()
});

export default Model;
