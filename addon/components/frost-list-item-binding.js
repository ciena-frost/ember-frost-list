import layout from '../templates/frost-list-item-binding'
import FrostListItem from './frost-list-item'
export default FrostListItem.extend({
  layout,
  classNames: ['frost-list-item'], // TODO Move frost-list-item to FrostListItem component
  firstColumn: 'frost-list-item-first-column',
  didRender () {
    let satellite = this.get('parentView.satellite')
    let parentElement = this.get('element').parentElement
    if (!this.get('model.isExpanded')) {
      parentElement.style.height = this.get('defaultHeight') + 'px'
      parentElement.style.minHeight = this.get('defaultHeight') + 'px'
      satellite.resize()
    } else {
      satellite.resize()
      parentElement.style.height = satellite.geography.height + 'px'
      parentElement.style.minHeight = satellite.geography.height + 'px'
    }
  }
})
