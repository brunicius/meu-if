const hasChanges = (properties: object, newProperties: object): boolean => {
  let changes: boolean = false
  for (let i in Object.keys(newProperties)) {
    let key = Object.keys(newProperties)[i]

    if (properties[key] != newProperties[key]) changes = true
  }
  return changes
}

export default hasChanges
