export function makeNormalServices(axios) {
  return {
    create(cell) {
      const ident = cell.getAttribute('label')
      return axios.post('/api/normals', { ident })
    }
  }
}
