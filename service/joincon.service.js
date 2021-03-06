import { genericTypes } from './helpers'
import { getEntityId, maybe } from '@/util/utils'

export function makeJoinConServices(axios) {
  return {
    create(cell, pmId) {
      const ident = cell.getAttribute('label')
      const theProcessModel = {
        id: pmId
      }
      return axios.post('/api/join-cons', { ident, theProcessModel })
    },

    update(cell, forceUpdate) {
      const fromActivities = []
      const fromMultipleCons = []
      const toActivity = {}
      const toMultipleCon = {}
      for (const e of cell.edges) {
        // Fetch sources
        if (e.source.id !== cell.id) {
          const srcType = e.source.getAttribute('type')
          const useList = genericTypes.activity.includes(srcType)
            ? fromActivities
            : fromMultipleCons
          useList.push({
            id: getEntityId(e.source.id)
          })
          // If current cell is the source, then take the target on
        } else {
          const to = genericTypes.activity.includes(
            e.target.getAttribute('type')
          )
            ? toActivity
            : toMultipleCon
          Object.assign(to, {
            id: getEntityId(e.target.id)
          })
        }
      }
      const ident = cell.getAttribute('label')
      return axios.put('/api/join-cons', {
        id: getEntityId(cell.id),
        ident,
        ...maybe(
          'fromActivities',
          (fromActivities.length > 0 || forceUpdate) && fromActivities
        ),
        ...maybe(
          'fromMultipleCons',
          (fromMultipleCons.length > 0 || forceUpdate) && fromMultipleCons
        ),
        ...maybe(
          'toActivity',
          (Object.keys(toActivity).length || forceUpdate) > 0 && toActivity
        ),
        ...maybe(
          'toMultipleCon',
          (Object.keys(toMultipleCon).length || forceUpdate) > 0 &&
            toMultipleCon
        )
      })
    },

    delete(cell) {
      const id = getEntityId(cell.id)
      return axios.delete(`/api/join-cons/${id}`)
    }
  }
}
