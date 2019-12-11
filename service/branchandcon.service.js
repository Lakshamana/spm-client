import { genericTypes } from './helpers'
import { getEntityId, maybe } from '@/util/utils'

export function makeBranchANDConServices(axios) {
  return {
    create(cell, pmId) {
      const ident = cell.getAttribute('label')
      const theProcessModel = {
        id: pmId
      }
      return axios.post('/api/branch-and-cons', { ident, theProcessModel })
    },

    update(cell, forceUpdate) {
      const toActivities = []
      const toMultipleCons = []
      const fromActivity = {}
      const fromMultipleConnection = {}
      for (const e of cell.edges) {
        // Fetch targets
        if (e.target.id !== cell.id) {
          const trgType = e.target.getAttribute('type')
          const useList = genericTypes.activity.includes(trgType)
            ? toActivities
            : toMultipleCons
          useList.push({
            id: getEntityId(e.target.id)
          })
          // If current cell is the target, then take the source on
        } else {
          const from = genericTypes.activity.includes(
            e.source.getAttribute('type')
          )
            ? fromActivity
            : fromMultipleConnection
          Object.assign(from, {
            id: getEntityId(e.source.id)
          })
        }
      }
      const ident = cell.getAttribute('label')
      return axios.put('/api/branch-and-cons', {
        id: getEntityId(cell.id),
        ident,
        ...maybe(
          'toActivities',
          (toActivities.length || forceUpdate) > 0 && toActivities
        ),
        ...maybe(
          'toMultipleCons',
          (toMultipleCons.length > 0 || forceUpdate) && toMultipleCons
        ),
        ...maybe(
          'fromActivity',
          (Object.keys(fromActivity).length > 0 || forceUpdate) && fromActivity
        ),
        ...maybe(
          'fromMultipleConnection',
          (Object.keys(fromMultipleConnection).length > 0 || forceUpdate) &&
            fromMultipleConnection
        )
      })
    },

    delete(cell) {
      const id = getEntityId(cell.id)
      return axios.delete(`/api/branch-and-cons/${id}`)
    }
  }
}
