import { setCellEntity } from '~/util/utils'

export const vertexConnection = {
  methods: {
    onConnect(params) {
      const { cell, type, method, onfinally } = params
      console.log('onConnect:', type, method, cell.id, this.processModelId)
      this.$service[type][method](cell, this.processModelId)
        .then(({ data }) => {
          console.log('id: ' + data.id)
          console.log('passed')
          setCellEntity(cell, data.id)
        })
        .catch(err => {
          this.handle(err)
          this.editor.graph.removeCells([cell], false)
        })
        .finally(onfinally)
    }
  }
}
