export function makeSequenceServices(axios) {
  return {
    create(cell) {
      const ident = cell.getAttribute('label')
      return axios.post('/api/sequences', { ident })
    }
  }
}
