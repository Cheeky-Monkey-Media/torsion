'use strict';

var generators = require('yeoman-generator');
var yosay = require('yosay');
var _s = require('underscore.string');

module.exports = generators.Base.extend({

  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  initializing: function () {
    this.pkg = require('../../package.json');
  },  

  prompting: function () {
    this.log(yosay('Torsion - Monkeys are sexy.'));

    var prompts = [{
      type: 'list',
      name: 'cms',
      message: 'Which CMS are you building for?',
      choices: [{
        name: 'None (Static Website)',
        value: 'none',
        checked: false
      }, {
        name: 'Drupal 8',
        value: 'includeD8',
        checked: false
      }, {
        name: 'Drupal 7',
        value: 'includeD7',
        checked: true
      }, {
        name: 'Wordpress',
        value: 'includeWP',
        checked: false
      }]
    },{
      type: 'checkbox',
      name: 'features',
      message: 'Additional Features (check all that apply): ',
      choices: [{
        name: 'Modernizr',
        value: 'includeModernizr',
        checked: 'false'
      },{
        name: 'jQuery',
        value: 'includejQuery',
        checked: 'false'
      }]
    }];

    return this.prompt(prompts).then(function (answers) {
      var cms = answers.cms;

      function hasFeature(cms) {
        return cms && cms.indexOf(cms) !== -1;
      };

      this.includeD8 = hasFeature('includeD8');
      this.includeD7 = hasFeature('includeD7');
      this.includeWP = hasFeature('includeWP');
      this.includeModernizr = hasFeature('includeModernizr');
      this.includejQuery = hasFeature('includejQuery');

    }.bind(this));
  },

  writing: {
    configFiles: function () {
      this.fs.copyTpl(
        this.templatePath('_bowerrc'),
        this.destinationPath('patternlab/.bowerrc')
      ),
      this.fs.copyTpl(
        this.templatePath('_editorconfig'),
        this.destinationPath('patternlab/.editorconfig')
      ),
      this.fs.copyTpl(
        this.templatePath('_jshintrc'),
        this.destinationPath('patternlab/.jshintrc')
      );
    },
    packageJSON: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('patternlab/package.json')
      );
    },    
    bowerJSON: function () {
      var bowerJson = {
        name: _s.slugify(this.appname),
        private: true,
        dependencies: {}
      };

      if (this.includejQuery) {
        bowerJson.dependencies['jquery'] = '~2.1.1';
      }

      if (this.includeModernizr) {
        bowerJson.dependencies['modernizr'] = '~2.8.1';
      }
      this.fs.writeJSON('patternlab/bower.json', bowerJson);
    }
  }
});
