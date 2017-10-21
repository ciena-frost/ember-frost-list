import Ember from 'ember'
const {get} = Ember

function findComponentNameKey (keys) {
  return keys.find((key) => {
    return key.includes('__COMPONENT_PATH__') || key.includes('COMPONENT_PATH')
  })
}

/**
   *  Necessary to support Ember 2.8 when component name is not accessible via component.name
   *  Ember: 2.8.3 and Ember: lts-2-8 assigns component name to different internal key.
   *  @param {Object} component - Ember component instance
   *  @returns {string} | component's name
 */
export default function getComponentName (component) {
  return get(component, 'name') || component[findComponentNameKey(Object.keys(component))]
}
