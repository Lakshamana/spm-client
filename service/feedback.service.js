import { getEntityId, relatedActivities, createIdent } from '@/util/utils'

export function makeFeedbackServices(axios) {
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
      return axios.post('/api/sequences', {
        id: getEntityId(edge.id),
        ...relatedActivities(edge)
      })
    }
  }
}
