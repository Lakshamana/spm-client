import { genericTypes } from '~/service/helpers'

export const deleteCells = {
  methods: {
    async onDelete(cells) {
      const requests = []
      // const dbg = []
      for (const cell of cells) {
        const type = cell.getAttribute('type')
        if (cell.edge && type !== 'connector') {
          if (
            !cells.some(
              c =>
                genericTypes.activity.includes(c.getAttribute('type')) &&
                [cell.source.id, cell.target.id].includes(c.id)
            )
          ) {
            requests.push(this.$service[type].delete(cell))
            // dbg.push(cell)
          }
        } else {
          requests.push(this.$service[type].delete(cell))
          // dbg.push(cell)
        }
      }
      try {
        await Promise.all(requests)
        for (const cell of cells) {
          await this.$service.processModel.publish(
            this.user,
            this.processModelId,
            cell
          )
        }
      } catch (e) {}
    }
  }
}
