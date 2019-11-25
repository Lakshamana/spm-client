import { genericTypes } from '~/service/helpers'

export const deleteCells = {
  methods: {
    // Must return array of promises
    onDelete(cells) {
      const requests = []
      for (const cell of cells) {
        const type = cell.getAttribute('type')
        if (cell.edge) {
          break
        } else if (
          !genericTypes.reqpeople.includes(type) ||
          !cells[0].getAttribute('type') === 'normal'
        )
          requests.push(this.$service[type].delete(cell))
      }
      return requests
    }
  }
}
