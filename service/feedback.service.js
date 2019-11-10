export function makeFeedbackServices(axios) {
  return {
    create(cell) {
      const ident = cell.getAttribute('label')
      return axios.post('/api/join-cons', { ident })
    }
  }
}
