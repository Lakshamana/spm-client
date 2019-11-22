let source

export function makeProcessModelServices(axios) {
  return {
    /**
     * Subscribes to a server's sent event (sse),
     * dispatched on kafka message comsumption
     * @param {Number} processModelId
     * @param {Function} callback
     */
    subscribe(processModelId, callback) {
      const url = `http://${process.env.API_HOST}:${process.env.API_PORT}/api/spm-kafka/subscribe/${processModelId}`
      source = new EventSource(url)
      source.addEventListener('message', (sdr, evt) => {
        console.log(sdr, JSON.parse(evt.data))
        callback(evt.data)
      })
    },

    unsubscribe() {
      axios.get('/api/spm-kafka/unsubscribe').then(response => {
        if (source) {
          source.removeEventListener('message')
          source.close()
          source = undefined
        }
      })
    }
  }
}
