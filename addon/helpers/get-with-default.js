import Ember from 'ember'
const {Helper, getWithDefault: emberGetWithDefault} = Ember

/**
 * Sets a default value for an object's property in a template
 *
 * This is being used to remove the setting of `itemExpansion` in frost-list.hbs when
 * the usage is not for a "typed" list-item. In the case when this is a "typed"
 * list-item and there is more than one template definition defined in
 * `itemExpansionDefinitions` then the template in the `name`d property will be returned.
 *
 * @param  {Object} object - An object containing the component objects
 * @param  {String} name - The component object name in which to set the default value
 * @param  {undefined} defaultValue - The default value to set
 * @returns {Object|undefined} - The passed in object with name property value set to
 * undefined or if name is not defined `undefined` is returned
 */
export function getWithDefault ([object, name, defaultValue]) {
  if (name) {
    return emberGetWithDefault(object, name, defaultValue)
  }
  return defaultValue
}

export default Helper.helper(getWithDefault)
