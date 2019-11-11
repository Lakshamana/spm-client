export const vertexConnection = {
  methods: {
    onConnect(params) {
      const { edge, type, method, onfinally } = params
      console.log('onConnect:', type, method)
      this.$service[type][method](edge, this.processModelId)
        .then(async ({ data }) => {
          console.log(await data)
          this.setCellEntity(edge, await data.id)
        })
        .catch(err => {
          this.handle(err)
          this.editor.graph.removeCells([edge], false)
        })
        .finally(onfinally)
    }
  }
}
