import { maybe } from '~/util/utils'

let source

export function makeProcessModelServices(axios) {
  return {
    /**
     * Subscribes to a server's sent event (sse),
     * dispatched on kafka message comsumption
     * @param {Number} processModelId
     * @param {Function} callback
     */
    subscribe(processModelId, token, callback) {
      const url =
        `http://${process.env.API_HOST}:${process.env.API_PORT}/api/spm-kafka/subscribe/${processModelId}` +
        '?token=' +
        token
      source = new EventSource(url)
      source.onmessage = evt => {
        callback(JSON.parse(evt.data).xmlCell)
      }
    },

    get source() {
      return source
    },

    unsubscribe() {
      axios.get('/api/spm-kafka/unsubscribe').then(response => {
        if (source) {
          source.removeEventListener('message')
          source.close()
          source = undefined
        }
      })
    },

    publish(username, processModelId, cell, operation) {
      return axios.post('/api/spm-kafka/publish', {
        username,
        processModelId,
        ...maybe('operation', operation),
        xmlCell: {
          nodeType: cell.getAttribute('type'),
          label: cell.getAttribute('label'),
          objectId: cell.id,
          style: cell.style,
          isEdge: !!cell.edge,
          ...maybe('x', !cell.edge && cell.geometry.x),
          ...maybe('y', !cell.edge && cell.geometry.y),
          ...maybe(
            'sourceNode',
            cell.edge && {
              objectId: cell.source.id
            }
          ),
          ...maybe(
            'targetNode',
            cell.edge && {
              objectId: cell.target.id
            }
          )
        }
      })
    }
  }
}
