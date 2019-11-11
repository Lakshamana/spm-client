export function makeNormalServices(axios) {
  return {
    create(cell, pmId) {
      const ident = cell.getAttribute('label')
      const theProcessModel = {
        id: pmId
      }
      return axios.post('/api/normals', { ident, theProcessModel })
    }
  }
}
