import { setCellEntity } from '~/util/utils'

export const vertexConnection = {
  methods: {
    onConnect(params) {
      const { cell, type, method, onfinally } = params
      this.$service[type][method](cell, this.processModelId)
        .then(({ data }) => {
          setCellEntity(cell, data.id)
        })
        .catch(err => {
          this.handle(err)
          this.editor.graph.removeCells([cell], false)
          throw new Error('unsuccessful connection')
        })
        .finally(onfinally)
    }
  }
}
