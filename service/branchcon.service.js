import { genericTypes } from './helpers'
import { getEntityId, maybe } from '@/util/utils'

export function makeBranchConServices(axios) {
  return {
    create(cell, pmId) {
      const ident = cell.getAttribute('label')
      const theProcessModel = {
        id: pmId
      }
      return axios.post('/api/branch-cons', { ident, theProcessModel })
    },

    update(cell) {
      const toActivities = []
      const toMultipleCons = []
      const fromActivity = {}
      const fromMultipleConnection = {}
      for (const e of cell.edges) {
        // Fetch targets
        if (e.target.id !== cell.id) {
          const trgType = e.source.getAttribute('type')
          const useList = genericTypes.activity.includes(trgType)
            ? toActivities
            : toMultipleCons
          useList.push({
            id: getEntityId(e.target.id)
          })
          // If current cell is the target, then take the source on
        } else {
          const from = genericTypes.activity.includes(
            e.target.getAttribute('type')
          )
            ? fromActivity
            : fromMultipleConnection
          Object.assign(from, {
            id: getEntityId(e.source.id)
          })
        }
      }
      const ident = cell.getAttribute('label')
      return axios.put('/api/branch-cons', {
        id: getEntityId(cell.id),
        ident,
        ...maybe('toActivities', toActivities.length > 0 && toActivities),
        ...maybe('toMultipleCons', toMultipleCons.length > 0 && toMultipleCons),
        ...maybe(
          'fromActivity',
          Object.keys(fromActivity).length > 0 && fromActivity
        ),
        ...maybe(
          'fromMultipleConnection',
          Object.keys(fromMultipleConnection).length > 0 &&
            fromMultipleConnection
        )
      })
    }
  }
}
