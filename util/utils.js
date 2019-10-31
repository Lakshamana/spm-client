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
