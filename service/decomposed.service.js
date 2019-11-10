export function makeDecomposedServices(axios) {
  return {
    create(cell) {
      const ident = cell.getAttribute('label')
      return axios.post('/api/decomposeds', { ident })
    }
  }
}
