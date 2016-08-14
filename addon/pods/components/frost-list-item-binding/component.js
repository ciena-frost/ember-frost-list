import layout from './template'
import FrostListItem from '../../../components/frost-list-item'
import Ember from 'ember'
export default FrostListItem.extend({
  layout,
  classNames: ['frost-list-item'], // TODO Move frost-list-item to FrostListItem component
  firstColumn: 'frost-list-item-first-column',
  modelObserver: Ember.observer('model.isExpanded', function () {
    console.log('expanded changed', this.get('parentView.satellite'))
    let satellite = this.get('parentView.satellite')
    let parentElement = this.get('element').parentElement
    if (!this.get('model.isExpanded')) {
      parentElement.style.height = 50 + 'px'
      parentElement.style.minHeight = 50 + 'px'
      satellite.resize()
    } else {
      satellite.resize()
      parentElement.style.height = satellite.geography.height + 'px'
      parentElement.style.minHeight = satellite.geography.height + 'px'
    }
    console.log('satellite', satellite.geography.height + 'px')
  }),
  didRender () {
    let satellite = this.get('parentView.satellite')
    let parentElement = this.get('element').parentElement
    if (!this.get('model.isExpanded')) {
      parentElement.style.height = 50 + 'px'
      parentElement.style.minHeight = 50 + 'px'
      satellite.resize()
    } else {
      satellite.resize()
      parentElement.style.height = satellite.geography.height + 'px'
      parentElement.style.minHeight = satellite.geography.height + 'px'
    }
    console.log('satellite', satellite.geography.height + 'px')

    // let element = this.get('parentView.element')
    // let isExpanded = this.get('model.isExpanded')
    // let defaultHeight = this.get('defaultHeight')
    // console.log('didRender')
    // if (!isExpanded) {
    //     //   element.style.minHeight = element.clientHeight + 'px'
    //     //   console.log(element.clientHeight + 'px')
    //     // } else {
    //   element.style.minHeight = defaultHeight + 'px'
    // }
  }
  // willDestroy () {
  //   let satellite = this.get('parentView.satellite')
  //   satellite.resize()
  //   this.set('parentView.element.style.height', `${satellite.geography.height}px`)
  //   this.set('parentView.element.style.minHeight ',`${satellite.geography.height}px`)
  // }
})
