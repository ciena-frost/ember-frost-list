import { Scenario } from 'ember-data-factory-guy'

export default class extends Scenario {
  run () {
    // == GET ===================================================================

    // Query
    let queryListItems = this.buildList('list-item', 30)
    this.mockQuery('list-item', {pageSize: 30, start: 0}).returns({ json: queryListItems })

    // let listItems = this.buildList('list-item', 3)
    // this.mockFindAll('list-item').returns({ json: listItems })
    this.mockFindAll('list-item', 3)

    this.mockFindRecord('list-item')

    // == POST ==================================================================

    // == PUT ===================================================================

    this.mockUpdate('list-item')

    // == DELETE ================================================================

    this.mockDelete('list-item')
  }
}
