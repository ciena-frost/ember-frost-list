import { Scenario } from 'ember-data-factory-guy'

export default class extends Scenario {
  run () {
    // == GET ===================================================================

    // Infinite Scroll
    const infinite1 = this.buildList('list-item', 100)
    const infinite2 = this.buildList('list-item', 100)
    this.mockQuery('list-item', {pageSize: 100, start: 0}).returns({ json: infinite1 })
    this.mockQuery('list-item', {pageSize: 100, start: 100}).returns({ json: infinite2 })

    // Pagination
    Array.from(Array(10).keys()).forEach((page) => {
      this.mockQuery('list-item', {pageSize: 10, start: page * 10}).returns({
        json: this.buildList('list-item', 10)
      })
    })

    // Simple
    this.mockFindAll('list-item', 100)

    // == POST ==================================================================

    // == PUT ===================================================================

    // == DELETE ================================================================
  }
}
