import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
	text: faker.company.bsNoun,
	select: faker.list.random('show', 'hide'),
	checkbox: faker.list.random('true', null),
	stage: faker.list.random('pending', 'processing', 'failed', 'complete'),
	hidden: faker.company.bsNoun
});
