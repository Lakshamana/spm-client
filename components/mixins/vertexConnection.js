import { setCellEntity } from '~/util/utils'

export const vertexConnection = {
  methods: {
    onConnect(params) {
      const { cell, type, method, onfinally } = params
      console.log('onConnect:', type, method, cell, this.processModelId)
      this.$service[type][method](cell, this.processModelId)
        .then(async ({ data }) => {
          const { id } = await data
          console.log('id: ' + id)
          setCellEntity(cell, id)
        })
        .catch(err => {
          this.handle(err)
          this.editor.graph.removeCells([cell], false)
        })
        .finally(onfinally)
    }
  }
}
