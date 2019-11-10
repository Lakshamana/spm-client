export function makeReqAgentServices(axios) {
  return {
    create(theNormal) {
      return axios.post('/api/req-agents', { theNormal })
    }
  }
}
