import { getEntityId, relatedActivities, createIdent } from '@/util/utils'

export function makeSequenceServices(axios) {
  return {
    create(edge, pmId) {
      const ident = createIdent(edge)
      const theProcessModel = {
        id: pmId
      }
      return axios.post('/api/sequences', {
        ident,
        theProcessModel,
        ...relatedActivities(edge)
      })
    },

    update(edge) {
      return axios.put('/api/sequences', {
        id: getEntityId(edge.id),
        ...relatedActivities(edge)
      })
    },

    delete(cell) {
      const id = getEntityId(cell)
      return axios.delete(`/api/sequences/${id}`)
    }
  }
}
