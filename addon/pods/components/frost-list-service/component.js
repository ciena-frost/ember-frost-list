import Ember from "ember";
import layout from "./template";
import FrostListItem from '../frost-list-item/component';

// TODO Move client types to another project
export default FrostListItem.extend({
	layout: layout,
	classNames: ['frost-list-item', 'terse', 'frost-list-service'],

	id: Ember.computed.alias("model.id"),

	// Normalize the data - TODO when the API improves this can be removed
	record: Ember.computed("model", function() {
		let model = this.get("model");

		let bidirectional = model.get("metaData.Directionality") !== "UNIDIRECTIONAL";

		let source = null, destination = null;
		if (bidirectional) {
			source = model.get("metaData.Source endpoint");
			destination = model.get("metaData.Destination endpoint");
		} else {
			let sources = model.get("metaData.Source endpoint").split(",");
			source = {
				rx: sources[0],
				tx: sources[1]
			};

			let destinations = model.get("metaData.Destination endpoint").split(",");
			destination = {
				rx: destinations[0],
				tx: destinations[1]
			};
		}

		return {
			alias: model.get("label"),
			meta: {
				bidirectional: bidirectional,
				destination: destination,
				rate: model.get("metaData.Rate"),
				source: source,
				type: model.get("metaData.Type"), // TODO Is this part of the service data?
				wavelength: model.get("metadata.Wavelength") // TODO Is this part of the service data?
			}
		};
	})
});
