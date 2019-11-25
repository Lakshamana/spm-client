import { getEntityId, relatedActivities, createIdent } from '@/util/utils'

export function makeFeedbackServices(axios) {
  return {
    create(edge, pmId) {
      const ident = createIdent(edge)
      const theProcessModel = {
        id: pmId
      }
      return axios.post('/api/feedbacks', {
        ident,
        theProcessModel,
        ...relatedActivities(edge)
      })
    },

    update(edge) {
      return axios.post('/api/feedbacks', {
        id: getEntityId(edge.id),
        ...relatedActivities(edge)
      })
    },

    delete(cell) {
      const id = getEntityId(cell.id)
      return axios.delete(`/api/feedbacks/${id}`)
    }
  }
}
