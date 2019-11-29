import { setCellEntity } from '~/util/utils'

export const vertexConnection = {
  methods: {
    async onConnect(params) {
      const { cell, type, method, onfinally } = params
      try {
        const data = await this.$service[type][method](
          cell,
          this.processModelId
        )
        console.log(data)
        setCellEntity(cell, data.id)
      } catch (e) {
        this.handle(e)
        this.editor.graph.removeCells([cell], false)
        throw new Error('unsuccessful connection')
      } finally {
        onfinally()
      }
    }
  }
}
