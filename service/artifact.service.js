export function makeArtifactServices(axios) {
  return {
    create(cell) {
      const ident = cell.getAttribute('label')
      return axios.post('/api/artifacts', { ident })
    }
  }
}
