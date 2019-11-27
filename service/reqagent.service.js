import { getEntityId } from '@/util/utils'

export function makeReqAgentServices(axios) {
  return {
    create() {
      return axios.post('/api/req-agents', {})
    },

    update(cell) {
      const id = getEntityId(cell.id)
      const theNormal = {
        id: getEntityId(cell.edges[0].target.id)
      }
      return axios.put('/api/req-agents', { id, theNormal })
    },

    delete(cell) {
      const id = getEntityId(cell.id)
      return axios.delete(`/api/req-agents/${id}`)
    }
  }
}
