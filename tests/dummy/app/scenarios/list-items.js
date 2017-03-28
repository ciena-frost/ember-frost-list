import {Scenario} from 'ember-data-factory-guy'

export default class extends Scenario {
  run () {
    // == GET ===================================================================
    Array.from(Array(100)).forEach((_, page) => {
      // Pagination
      this.mockQuery('list-item', {pageSize: 10, start: page * 10})
        .returns({json: this.buildList('list-item', 10)})
      // Infinite
      this.mockQuery('list-item', {pageSize: 100, start: page * 100})
        .returns({json: this.buildList('list-item', 100)})
    })

    // Simple
    this.mockFindAll('list-item', 100)

    // == POST ==================================================================

    // == PUT ===================================================================

    // == DELETE ================================================================
  }
}
