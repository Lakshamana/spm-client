export const genericTypes = {
  activity: ['normal', 'decomposed'],
  multipleConnection: ['joincon', 'branchandcon'],
  simpleConnection: ['sequence', 'feedback'],
  reqpeople: ['reqagent', 'reqworkgroup']
}

export const edgeTypes = {
  'normal,normal': 'sequence',
  'decomposed,decomposed': 'sequence',
  'normal,decomposed': 'sequence',
  artifactcon: 'connector',
  joincon: 'connector',
  branchandcon: 'connector',
  reqagent: 'connector',
  reqworkgroup: 'connector'
}
