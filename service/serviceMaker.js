import { makeNormalServices } from '@/service/normal.service'
import { makeDecomposedServices } from '@/service/decomposed.service'
import { makeArtifactServices } from '@/service/artifact.service'
import { makeReqAgentServices } from '@/service/reqagent.service'
import { makeReqWorkGroupServices } from '@/service/reqworkgroup.service'
import { makeArtifactConServices } from '@/service/artifactcon.service'
import { makeJoinConServices } from '@/service/joincon.service'
import { makeBranchConServices } from '@/service/branchcon.service'
import { makeSequenceServices } from '@/service/sequence.service'
import { makeFeedbackServices } from '@/service/feedback.service'
import { makeCoordinatesServices } from '@/service/coordinates.service'

export function makeServices(axios) {
  return {
    normal: makeNormalServices(axios),
    decomposed: makeDecomposedServices(axios),
    artifact: makeArtifactServices(axios),
    reqagent: makeReqAgentServices(axios),
    reqworkgroup: makeReqWorkGroupServices(axios),
    artifactcon: makeArtifactConServices(axios),
    joincon: makeJoinConServices(axios),
    branchcon: makeBranchConServices(axios),
    sequence: makeSequenceServices(axios),
    feedback: makeFeedbackServices(axios),
    coordinates: makeCoordinatesServices(axios)
  }
}
