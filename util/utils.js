import { edgeTypes } from '@/service/helpers'

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

export function setCellEntity(cell, entityId) {
  cell.setId(cell.value.nodeName + '#' + entityId)
}

export function getEntityId(cellId) {
  return +cellId.split('#')[1]
}

export function setEdgeType(edge) {
  const ends =
    edge.source.getAttribute('type') + ',' + edge.target.getAttribute('type')
  const endsInv =
    edge.target.getAttribute('type') + ',' + edge.source.getAttribute('type')
  for (const end in edgeTypes) {
    if (ends === end || endsInv === end || ends.includes(end)) {
      console.log('set type:', edgeTypes[end])
      edge.setAttribute('type', edgeTypes[end])
    }
  }
}
