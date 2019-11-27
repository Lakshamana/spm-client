import { getEntityId, maybe } from '~/util/utils'

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
        '?slt=' +
        token
      source = new EventSource(url)
      source.addEventListener('message', (sdr, evt) => {
        console.log(sdr, JSON.parse(evt.data))
        callback(evt.data)
      })
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

    publish(username, processModelId, cell) {
      return axios.post('/api/spm-kafka/publish', {
        username,
        processModelId,
        xmlCell: {
          nodeType: cell.getAttribute('type'),
          label: cell.getAttribute('label'),
          objectId: getEntityId(cell.id),
          style: cell.style,
          isEdge: !!cell.edge,
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
