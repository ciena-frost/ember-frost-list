import { Scenario } from 'ember-data-factory-guy'

export default class extends Scenario {
  run () {
    // == GET ===================================================================

    // Example Live Demo
    let queryListItems = this.buildList('list-item', 30)
    this.mockQuery('list-item', {pageSize: 30, start: 0}).returns({ json: queryListItems })

    // Inifinite Scroll
    let scroll1 = this.buildList('list-item', 100)
    let scroll2 = this.buildList('list-item', 100)
    let scroll3 = this.buildList('list-item', 100)
    let scroll4 = this.buildList('list-item', 100)
    let scroll5 = this.buildList('list-item', 100)

    this.mockQuery('list-item', {pageSize: 100, start: 0}).returns({ json: scroll1 })
    this.mockQuery('list-item', {pageSize: 100, start: 100}).returns({ json: scroll2 })
    this.mockQuery('list-item', {pageSize: 100, start: 200}).returns({ json: scroll3 })
    this.mockQuery('list-item', {pageSize: 100, start: 300}).returns({ json: scroll4 })
    this.mockQuery('list-item', {pageSize: 100, start: 400}).returns({ json: scroll5 })

    // Query Binding and Pre selection
    let queryBinding = this.buildList('list-item', 20)
    this.mockQuery('list-item', {pageSize: 20, start: 0}).returns({ json: queryBinding })

    this.mockFindAll('list-item', 500)

    this.mockFindRecord('list-item')

    // == POST ==================================================================

    // == PUT ===================================================================

    this.mockUpdate('list-item')

    // == DELETE ================================================================

    this.mockDelete('list-item')
  }
}
