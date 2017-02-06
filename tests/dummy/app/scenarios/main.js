import {Scenario} from 'ember-data-factory-guy'
import ListItems from './list-items'

Scenario.settings({
  logLevel: 1 // All FactoryGuy response info in console
})

export default class extends Scenario {
  run () {
    this.include([ListItems])
  }
}
