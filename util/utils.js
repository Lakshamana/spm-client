/**
 * Removes attibute objects mathcing rule.
 * Writes the passed object itself.
 * @param {Object} data
 * @param {Function(attr)} callback(attr) => boolean
 */
export function removeMatching(data, callback) {
  const payload = {}
  for (const d in data) {
    if (!callback(data[d], d)) payload[d] = data[d]
  }
  return payload
}

/**
 * Returns {key: value} object if value,
 * or `undefined` otherwise
 * @param {String} key
 * @param {*} value
 * @returns {Object} {key: value} || undefined
 */
export function maybe(key, value) {
  return value && { [key]: value }
}
