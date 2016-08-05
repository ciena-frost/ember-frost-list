import Ember from 'ember'
const {Component} = Ember
import computed from 'ember-computed-decorators'
import _ from 'lodash/lodash'
import layout from './template'
import {PropTypes} from 'ember-prop-types'
import SlotsMixin from 'ember-block-slots'

const FrostList = Component.extend(SlotsMixin, {

  // == Dependencies ==========================================================

  // == Properties ============================================================
  classNames: ['frost-list'],
  layout: layout,
  records: Ember.computed.alias('model'), // TODO Log deprecation of model as an attribute

  propTypes: {
    alwaysUseDefaultHeight: PropTypes.bool,
    defaultHeight: PropTypes.number,
    scrollPosition: PropTypes.number,
    size: PropTypes.string
  },

  showDetail: false,

  // == Computed Properties =====================================================

  // Normalize the data - TODO when the API improves this can be removed
  @computed('records.[]')
  _records(records) {
    if (Ember.isEmpty(records)) {
      return []
    }
    return records.map(function (record) {
      if (_.isString(record.get('record-type'))) {
        return record
      }
      record.set('record-type', record.get('dimension'))
      return record
    })
  },

  @computed('_records.[]', 'selections.[]')
  mappedRecords (_records, selections) {
    return _records.map((record) => {
      if (_.includes(selections, record)) {
        record.set('isSelected', true)
      } else {
        record.set('isSelected', false)
      }
      return record
    })
  },

  // == Functions ==============================================================
  getDefaultProps () {
    return {
      //  Optional attrs for smoke-and-mirror vertical-collection
      //  https://github.com/runspired/smoke-and-mirrors/blob/develop/addon/components/vertical-collection.js
      alwaysUseDefaultHeight: false,
      defaultHeight: 45,
      idForFirstItem: null,
      key: '@identity',
      scrollPosition: 0
    }
  },

  /**
   Iterates over elements of collection and returning all elements
   which are presented between two boundary objects in array.

   This function will loop through the array, when either boundary object
   is hit, it will start pushing item to resultArray until second boundary
   object is hit.

   @function _findElementsInBetween
   @param {Array} array collection to iterate
   @param {Object} firstElement boundary item
   @param {Object} lastElement boundary item
   @returns {Array} resultArray
   */
  _findElementsInBetween (array, firstElement, lastElement) {
    let loopKey = 0  //
    let resultArray = []
    if (firstElement && lastElement) {
      _.each(array, (record) => {
        if (record.id === firstElement.id || record.id === lastElement.id) {
          resultArray.pushObject(record)
          loopKey = loopKey + 1
        } else {
          if (loopKey === 1) resultArray.pushObject(record)
          else if (loopKey === 2) return
        }
      })
      return resultArray
    } else {
      return [lastElement]
    }
  },

  onShiftSelect (attrs) {
    let mappedRecords = this.get('mappedRecords')
    let firstElement = this.get('persistedClickState.clickedRecord')
    let secondElement = attrs.secondClickedRecord
    this.get('onSelect')({
      record: this._findElementsInBetween(mappedRecords, firstElement, secondElement),
      isSelected: true,
      isShiftSelect: true,
      isTargetSelectionIndicator: attrs.isTargetSelectionIndicator
    })
  },

  // == Events ================================================================

  // == Actions ===============================================================

  actions: {

    clickHandler() {
      console.log('click handler')
    }
  }

})

FrostList.reopenClass({
  positionalParams: [
    'recordComponent'
  ]
})

export default FrostList
