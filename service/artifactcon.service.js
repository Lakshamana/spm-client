export function makeArtifactConServices(axios) {
  return {
    create(cell) {
      const ident = cell.getAttribute('label')
      return axios.post('/api/artifacts', { ident })
    },

    update(cell) {}
  }
}
// 'ident', 'theArtifact', 'toActivities', 'fromActivities'
