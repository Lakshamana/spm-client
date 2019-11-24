export const deleteCells = {
  methods: {
    // Must return array of promises
    onDelete(cells) {
      const requests = []
      for (const cell of cells) {
        if (!cell.edge) {
          const type = cell.getAttribute('type')
          requests.push(this.$service[type].delete(cell))
        }
      }
    }
  }
}
