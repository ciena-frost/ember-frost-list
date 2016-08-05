/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import {
  isString
} from 'ember-frost-list/helpers/is-string';

describe('IsStringHelper', function() {
  // Replace this with your real tests.
  it('works', function() {
    let result = isString(42);
    expect(result).to.be.ok;
  });
});
