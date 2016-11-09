import Ember from 'ember'

export function updateSelectedItemsHash (selections, attrs) {
  let _selections = selections
  if (attrs.selectDesc.isSelected) {
    if (attrs.selectDesc.isShiftSelect) {
      attrs.records.forEach((record) => {
        _selections.set(record.id, true)
      })
    } else {
      if ((!attrs.selectDesc.isTargetSelectionIndicator && !attrs.selectDesc.isCtrlSelect)) {
        Object.keys(_selections).forEach((key) => {
          delete _selections[key]
        })
      }
      attrs.records.forEach((record) => {
        _selections.set(record.id, true)
      })
    }
  } else {
    attrs.records.forEach((record) => {
      delete _selections[record.id]
    })
  }
  return _selections
}

export function normalizeSort (sort) {
  if (!Ember.isPresent(sort)) {
    return []
  }
  return sort.map(function (item) {
    let key = item.value
    let direction = item.direction === ':desc' ? '-' : ''
    return `${direction}${key}`
  })
}

export function listDefaultSort (items, sortProperties) {
  if (!Ember.isPresent(sortProperties)) {
    return
  }

  let normalizedSortProperties = sortProperties.map(sortProperty => {
    let resultArray = []
    if (sortProperty.startsWith('-')) {
      resultArray.pushObject(sortProperty.slice(1))
      resultArray.pushObject('desc')
    } else {
      resultArray.pushObject(sortProperty)
      resultArray.pushObject('asc')
    }
    return resultArray
  })

  return Ember.A(items.slice().sort((itemA, itemB) => {
    for (let i = 0; i < normalizedSortProperties.length; i++) {
      let [prop, direction] = normalizedSortProperties[i]
      let result = Ember.compare(Ember.get(itemA, prop), Ember.get(itemB, prop))
      if (result !== 0) {
        return (direction === 'desc') ? (-1 * result) : result
      }
    }
    return 0
  }))
}
