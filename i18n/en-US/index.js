module.exports = {
  'first.hint':
    '\nLine 1 will be cropped at 100 characters. All other ' +
    'lines will be wrapped after 100 characters.\n',
  'feat.hint': "Select the type of change that you're committing:",
  'has-breaking.hint': 'Are there any breaking changes?',
  'has-issues.hint': 'Does this change affect any open issues?',
  'scope.hint':
    'Denote the scope of this change (location, browser, compile, etc.):\n',
  'subject.hint':
    'Write a short, imperative tense description of the change:\n',
  'body.hint': 'Provide a longer description of the change:\n',
  'breaking.change.hint': 'List any breaking changes:\n',
  'issues.hint':
    'List any issues closed by this change\n' +
    "1. use icafe prefix config, you can start with '#' (e.g. close #123)\n" +
    "2. without icafe prefix config, just don't start with '#' (e.g. fix asset-123 123 12312)\n" +
    "3. multiple issues seperate by space or ',' (e.g. re asset-123,#2345,#123123,hard-3)\n",
  'subject.error': "Please write some short description here, it's required"
}
