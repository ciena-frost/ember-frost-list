import Ember from 'ember'
const {Helper, get} = Ember

export function getTypedComponentName ([componentKeyNamesForTypes, itemTypeKey, model, componentKey, defaultKey]) {
  const type = get(model, itemTypeKey)

  // Get the set of key names for this type (ex. item, itemExpansion, etc.)
  let componentKeyNames = type ? get(componentKeyNamesForTypes, type) : undefined

  // If there are no key names for this type, fall back to default set of key names
  if (!componentKeyNames) {
    componentKeyNames = get(componentKeyNamesForTypes, defaultKey)
  }

  return get(componentKeyNames, componentKey)
}

export default Helper.helper(getTypedComponentName)
