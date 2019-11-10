export const genericTypes = {
  activity: ['normal', 'decomposed'],
  multipleConnection: ['joincon', 'branchcon'],
  simpleConnection: ['sequence', 'feedback']
}

export const edgeTypes = {
  'normal,normal': 'sequence',
  'decomposed,decomposed': 'sequence',
  'normal,decomposed': 'sequence',
  artifact: 'artifactcon',
  joincon: 'connector',
  branchcon: 'connector',
  reqagent: 'connector',
  reqworkgroup: 'connector'
}
