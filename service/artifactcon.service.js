import { getEntityId, maybe, createIdent } from '@/util/utils'

function artifactConArguments(edge) {
  let theArtifact
  const useList = { toActivities: [], fromActivities: [] }
  for (const sideNode of ['source', 'target']) {
    if (edge[sideNode].getAttribute('type') === 'artifact') {
      theArtifact = {
        id: getEntityId(edge[sideNode].id)
      }
    } else {
      const side = sideNode === 'source' ? 'from' : 'to'
      useList[side + 'Activities'].push({
        id: getEntityId(edge[sideNode].id)
      })
    }
  }
  return {
    theArtifact,
    ...maybe(
      'fromActivities',
      useList.fromActivities.length > 0 && useList.fromActivities
    ),
    ...maybe(
      'toActivities',
      useList.toActivities.length > 0 && useList.toActivities
    )
  }
}

export function makeArtifactConServices(axios) {
  return {
    create(edge, pmId) {
      const ident = createIdent(edge)
      console.log(ident)
      const theProcessModel = {
        id: pmId
      }
      return axios.post('/api/artifact-cons', {
        ident,
        theProcessModel,
        ...artifactConArguments(edge)
      })
    },

    update(edge) {
      const ident = createIdent(edge)
      return axios.put('/api/artifact-cons', {
        id: getEntityId(edge.id),
        ident,
        ...artifactConArguments(edge)
      })
    }
  }
}
