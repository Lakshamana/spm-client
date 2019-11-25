import { getEntityId } from '~/util/utils'

export function makeDecomposedServices(axios) {
  return {
    create(cell, pmId) {
      const ident = cell.getAttribute('label')
      const theProcessModel = {
        id: pmId
      }
      return axios.post('/api/decomposeds', { ident, theProcessModel })
    },

    delete(cell) {
      const id = getEntityId(cell.id)
      return axios.delete(`/api/decomposeds/${id}`)
    }
  }
}
