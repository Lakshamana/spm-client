export function makeReqWorkGroupServices(axios) {
  return {
    create(theNormal) {
      return axios.post('/api/req-work-groups', { theNormal })
    }
  }
}
