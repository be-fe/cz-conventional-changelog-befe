var wrap = require('word-wrap')
var utils = require('./utils')
var i = require('../i18n')
var i18n = i.i18n

var filter = function (array) {
  return array.filter(function (x) {
    return x;
  });
};

// This can be any kind of SystemJS compatible module.
// We use Commonjs here, but ES6 or AMD would do just
// fine.
module.exports = function (options) {
  var prefix = options.prefix
  var typeChoices = utils.rightPadTypes(options.typeObjects, options.typeKeys, options.language)

  return {
    // When a user runs `git cz`, prompter will
    // be executed. We pass you cz, which currently
    // is just an instance of inquirer.js. Using
    // this you can ask questions and get answers.
    //
    // The commit callback should be executed when
    // you're ready to send back a commit template
    // to git.
    //
    // By default, we'll de-indent your commit
    // template and will keep empty lines.
    prompter: function (cz, commit) {
      console.log(i18n('firest.hint'))

      // Let's ask some questions of the user
      // so that we can populate our commit
      // template.
      //
      // See inquirer.js docs for specifics.
      // You can also opt to use another input
      // collection library if you prefer.
      cz.prompt([
        {
          type: 'list',
          name: 'type',
          message: i18n('feat.hint'),
          choices: typeChoices
        }, {
          type: 'input',
          name: 'scope',
          message: i18n('scope.hint'),
        }, {
          type: 'input',
          name: 'subject',
          message: i18n('subject.hint')
        }, {
          type: 'input',
          name: 'body',
          message: i18n('body.hint')
        }, {
          type: 'input',
          name: 'breaking',
          message: i18n('breaking.change.hint')
        }, {
          type: 'input',
          name: 'issues',
          message: i18n('issues.hint')
        }
      ]).then(function (answers) {

        var maxLineWidth = 100;

        var wrapOptions = {
          trim: true,
          newline: '\n',
          indent: '',
          width: maxLineWidth
        };

        // parentheses are only needed when a scope is present
        var scope = answers.scope.trim();
        scope = scope ? '(' + answers.scope.trim() + ')' : '';

        // Hard limit this line
        var head = (answers.type + scope + ': ' + answers.subject.trim()).slice(0, maxLineWidth);

        // Wrap these lines at 100 characters
        var body = wrap(answers.body, wrapOptions);

        // Apply breaking change prefix, removing it if already present
        var breaking = answers.breaking.trim();
        breaking = breaking ? 'BREAKING CHANGE: ' + breaking.replace(/^BREAKING CHANGE: /, '') : '';
        breaking = wrap(breaking, wrapOptions);

        var issues = wrap('Cards: ' + utils.issuesFormat(prefix, answers.issues), wrapOptions);

        var footer = filter([breaking, issues]).join('\n\n');

        commit(head + '\n\n' + body + '\n\n' + footer);
      });
    }
  };
};
