import Ember from 'ember'
const {get} = Ember

export default function getComponentName (component) {
  let componentName = get(component, 'name')

  // Necessary to support Ember 2.8-LTS
  if (!componentName) {
    componentName = Object.keys(component).reduce((accumulator, key) => {
      if (key.indexOf('__COMPONENT_PATH__') > -1) {
        accumulator = component[key]
      }
      return accumulator
    }, '')
  }

  return componentName
}
