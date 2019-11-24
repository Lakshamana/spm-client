import { getEntityId } from '@/util/utils'

export function makeReqWorkGroupServices(axios) {
  return {
    create() {
      return axios.post('/api/req-work-groups', {})
    },

    update(cell) {
      const id = getEntityId(cell.id)
      const theNormal = {
        id: getEntityId(cell.edges[0].target.id)
      }
      return axios.put('/api/req-work-groups', { id, theNormal })
    },

    delete(cell) {
      const id = getEntityId(cell)
      return axios.delete(`/api/req-work-groups/${id}`)
    }
  }
}
