import { genericTypes } from '~/service/helpers'

export const deleteCells = {
  methods: {
    // Must return array of promises
    onDelete(cells) {
      const requests = []
      const dbg = []
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
            console.log('falled here')
            requests.push(this.$service[type].delete(cell))
            dbg.push(cell)
          }
        } else if (
          !genericTypes.reqpeople.includes(type) ||
          !cells[0].getAttribute('type') === 'normal'
        ) {
          requests.push(this.$service[type].delete(cell))
          dbg.push(cell)
        }
      }
      console.log(dbg)
      return requests
    }
  }
}
