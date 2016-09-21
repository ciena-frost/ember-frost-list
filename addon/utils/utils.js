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
