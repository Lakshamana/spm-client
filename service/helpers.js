export const genericTypes = {
  activity: ['normal', 'decomposed'],
  multipleConnection: ['joincon', 'branchcon'],
  simpleConnection: ['sequence', 'feedback'],
  reqpeople: ['reqagent', 'reqworkgroup']
}

export const edgeTypes = {
  'normal,normal': 'sequence',
  'decomposed,decomposed': 'sequence',
  'normal,decomposed': 'sequence',
  artifactcon: 'connector',
  joincon: 'connector',
  branchcon: 'connector',
  reqagent: 'connector',
  reqworkgroup: 'connector'
}
