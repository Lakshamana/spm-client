import { getEntityId } from '@/util/utils'

export function makeCoordinatesServices(axios) {
  return {
    send(cell, processId) {
      const { x, y } = cell.geometry
      return axios.post('/api/easy-modeling', {
        processId,
        referedObjectId: getEntityId(cell.id),
        nodeType: cell.value.nodeName,
        x,
        y
      })
    }
  }
}
