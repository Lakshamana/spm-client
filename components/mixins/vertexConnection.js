import { setCellEntity } from '~/util/utils'

export const vertexConnection = {
  methods: {
    onConnect(params) {
      const { cell, type, method, onfinally } = params
      console.log('onConnect:', type, method, cell, this.processModelId)
      this.$service[type][method](cell, this.processModelId)
        .then(async ({ data }) => {
          console.log(await data)
          setCellEntity(cell, await data.id)
        })
        .catch(err => {
          this.handle(err)
          this.editor.graph.removeCells([cell], false)
        })
        .finally(onfinally)
    }
  }
}
