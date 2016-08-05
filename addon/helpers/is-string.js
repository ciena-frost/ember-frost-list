import Ember from 'ember';

export function isString(params/*, hash*/) {
  return params;
}

export default Ember.Helper.helper(isString);
