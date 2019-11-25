import { getEntityId } from '~/util/utils'

export function makeNormalServices(axios) {
  return {
    create(cell, pmId) {
      const ident = cell.getAttribute('label')
      const theProcessModel = {
        id: pmId
      }
      return axios.post('/api/normals', { ident, theProcessModel })
    },

    delete(cell) {
      const id = getEntityId(cell.id)
      return axios.delete(`/api/normals/${id}`)
    }
  }
}
