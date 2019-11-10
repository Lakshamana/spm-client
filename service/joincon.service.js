import { genericTypes } from './helpers'
import { getEntityId, maybe } from '@/util/utils'

export function makeJoinConServices(axios) {
  return {
    create(cell) {
      const ident = cell.getAttribute('label')
      return axios.post('/api/join-cons', { ident })
    },

    update(cell) {
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
            id: getEntityId(e.source)
          })
          // If current cell is the source, then take the target on
        } else {
          const to = genericTypes.activity.includes(
            e.target.getAttribute('type')
          )
            ? toActivity
            : toMultipleCon
          Object.assign(to, {
            id: getEntityId(e.target)
          })
        }
      }
      return axios.post('/api/join-cons', {
        ...maybe('fromActivities', fromActivities.length > 0 && fromActivities),
        ...maybe(
          'fromMultipleCons',
          fromMultipleCons.length > 0 && fromMultipleCons
        ),
        ...maybe('toActivity', Object.keys(toActivity) > 0 && toActivity),
        ...maybe(
          'toMultipleCon',
          Object.keys(toMultipleCon) > 0 && toMultipleCon
        )
      })
    }
  }
}
