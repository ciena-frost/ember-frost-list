import Ember from 'ember';
import layout from './template';
import FrostListItem from '../frost-list-item/component';

// TODO Move client types to another project
export default FrostListItem.extend({
	layout: layout,
	classNames: ['frost-list-item', 'terse', 'frost-list-node'],

	id: Ember.computed.readOnly('model.id'),

	// Normalize the data - TODO when the API improves this can be removed
	record: Ember.computed('model', function() {
		let model = this.get('model');
		return {
			alias: model.get('label'),
			meta: {
				type: model.get('metaData.Type'),
				release: model.get('metaData.Release'),
				status: model.get('metaData.State'),
				ip: model.get('metaData.IP address'),
				mac: model.get('metaData.MAC address')
			}
		};
	})
});
