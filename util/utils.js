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
      edge.setAttribute('type', edgeTypes[end])
    }
  }
}

export function createIdent(edge) {
  return edge.source.id + 'to' + edge.target.id
}

export function relatedActivities(edge) {
  return {
    fromActivity: {
      id: getEntityId(edge.source.id)
    },
    toActivity: {
      id: getEntityId(edge.target.id)
    }
  }
}

/**
 *
 * @param {*} cellData
 * @param {String} graphXml
 */
export function createCell(cellData, graphXml) {
  const xmlList = graphXml.split('\n')
  const {
    nodeType,
    label,
    objectId,
    style,
    isEdge,
    x,
    y,
    sourceNode,
    targetNode
  } = cellData
  const typelow = nodeType.toLowerCase()
  const add = `  <${
    !isEdge ? capit(nodeType) : 'Connector'
  } type="${typelow}" label="${label || ''}" id="${objectId}">
     <mxCell${style ? ` style="${style}"` : ''} parent="1" ${
    isEdge ? 'edge="1"' : 'vertex="1"'
  }${
    isEdge
      ? ` source="${sourceNode.objectId}" target="${targetNode.objectId}"`
      : ''
  }>
      <mxGeometry x="${x}" y="${y}" width="60" height="60" as="geometry"/>
     </mxCell>
    </${!isEdge ? capit(nodeType) : 'Connector'}>`
  xmlList.splice(xmlList.length - 3, 0, ...add.split('\n'))
  return xmlList.join('\n')
}

export function capit(word) {
  const first = word[0]
  const rest = word.substring(1, word.length)
  return first.toUpperCase() + rest
}

export function getCell(graph, id) {
  const cells = Object.values(graph.model.cells)
  const cell = cells.find(c => c.id === id)
  return cell
}

export function updateCell(cell, data, graph) {
  cell.setAttribute('id', data.id)
  cell.setAttribute('type', data.nodeType)
  cell.setAttribute('label', data.label)
  cell.setAttribute('style', data.style)
  if (!cell.edge) {
    console.log('is vertex')
    const dx = data.x - cell.geometry.x
    const dy = data.y - cell.geometry.y
    graph.translateCell(cell, dx, dy)
  }
}
