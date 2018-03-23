import Ember from 'ember'
const {Helper, get} = Ember

/**
 * @typedef componentKeyNamesForTypes
 * @type {Object}
 * @property {Object} default - The itemName and itemExpansionName to use if one is not defined
 * @property {...Object} [componentKeyNamesForTypes] - The optionally defined itemName(s) and itemExpansionName(s)
 */

/**
 * Determines which list-item template should be used
 *
 * If no template is defined it provides for the lookup of a `default` set of templates for a list-item and
 * expanded list-item
 *
 * @param  {componentKeyNamesForTypes} componentKeyNamesForTypes - The object containing the templates to use
 * @param  {String} itemTypeKey - The key used to in the model data which lists the type template
 * @param  {Object} model - The model so the itemTypeKey property's value can be looked up
 * @param  {String} componentKey - The key used to look for the template under. Defaults to itemName and
 * itemExpansionName defined in frost-list.js defaultProps componentKeyNames object.
 * @param  {String} defaultKey - the default templates to use if specific ones are not defined
 * @returns {String} - the template name to use for the list-item
 */
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
