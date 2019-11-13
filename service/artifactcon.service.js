import { getEntityId, maybe } from '@/util/utils'

function artifactConArguments(cell) {
  const toActivities = []
  const fromActivities = []
  for (const e of cell.edges) {
    // If i'm not the source, fetch sources -> (I'm the target)
    if (e.source.id !== cell.id) {
      fromActivities.push({
        id: getEntityId(e.source.id)
      })
      // Otherwise
    } else {
      toActivities.push({
        id: getEntityId(e.target.id)
      })
    }
  }
  return {
    ...maybe('fromActivities', fromActivities.length > 0 && fromActivities),
    ...maybe('toActivities', toActivities.length > 0 && toActivities)
  }
}

export function makeArtifactConServices(axios) {
  return {
    create(cell, pmId) {
      const ident = cell.getAttribute('label')
      console.log(ident)
      const theProcessModel = {
        id: pmId
      }
      return axios.post('/api/artifact-cons', {
        ident,
        theProcessModel
      })
    },

    update(cell) {
      const ident = cell.getAttribute('label')
      return axios.put('/api/artifact-cons', {
        id: getEntityId(cell.id),
        ident,
        ...artifactConArguments(cell)
      })
    }
  }
}
