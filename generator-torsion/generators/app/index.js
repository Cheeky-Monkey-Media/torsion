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
      type: 'input',
      name: 'projectname',
      message: 'Your project name:',
      deafault: 'torsion'
    },{
      type: 'list',
      name: 'cms',
      message: 'Which CMS are you building for?',
      choices: [{
        name: 'Drupal 8',
        value: 'includeD8',
        checked: false
      }, {
        name: 'Drupal 7',
        value: 'includeD7',
        checked: false
      }, {
        name: 'Wordpress',
        value: 'includeWP',
        checked: false
      }]
    },{
      type: 'checkbox',
      name: 'features',
      message: 'Additional features (check all that apply): ',
      choices: [{
        name: 'Modernizr',
        value: 'includeModernizr',
        checked: false
      },{
        name: 'jQuery',
        value: 'includejQuery',
        checked: false
      },{
        name: 'IntentionJS',
        value: 'includeIntentionJS',
        checked: false
      }]
    }];

    return this.prompt(prompts).then(function (answers) {
      var cms = answers.cms;

      function hasFeature(cms) {
        return cms && cms.indexOf(cms) !== -1;
      };

      this.projectname = answers.projectname;
      this.projectnameSafe = answers.projectname.toLowerCase().replace(/ /g, "_");
      this.includeD8 = hasFeature('includeD8');
      this.includeD7 = hasFeature('includeD7');
      this.includeWP = hasFeature('includeWP');
      this.includeModernizr = hasFeature('includeModernizr');
      this.includejQuery = hasFeature('includejQuery');
      this.includeIntentionJS = hasFeature('includeIntentionJS');

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
        this.destinationPath('patternlab/package.json'),
        {
          includeModernizr: this.includeModernizr,
        }        
      );
    },    
    bowerJSON: function () {
      var bowerJson = {
        name: _s.slugify(this.appname),
        private: true,
        dependencies: {}
      };

      if (this.includeIntentionJS) {
        bowerJson.dependencies['intentionjs'] = '0.9.9';
        bowerJson.dependencies['underscore'] = '1.7.0';
        bowerJson.dependencies['viewportsize'] = 'latest';
      }

      if (this.includejQuery) {
        bowerJson.dependencies['jquery'] = '~2.1.1';
      }

      this.fs.writeJSON('patternlab/bower.json', bowerJson);
    },
    themeFiles: function() {
      if (this.includeD8) {
        this.fs.copy(
          this.templatePath('_d8/_favicon.ico'),
          this.destinationPath('web/themes/custom/' + this.projectnameSafe + '/favicon.ico')
        ),
        this.fs.copy(
          this.templatePath('_d8/_logo.png'),
          this.destinationPath('web/themes/custom/' + this.projectnameSafe + '/logo.png')
        ),
        this.fs.copyTpl(
          this.templatePath('_d8/_cmm_torsion.libraries.yml'),
          this.destinationPath('web/themes/custom/' + this.projectnameSafe + '/' + this.projectnameSafe + '.libraries.yml')
        ),
        this.fs.copyTpl(
          this.templatePath('_d8/_cmm_torsion.info.yml'),
          this.destinationPath('web/themes/custom/' + this.projectnameSafe + '/' + this.projectnameSafe + '.info.yml'),
          {
            name: this.projectname,
            libraries: this.projectnameSafe
          }
        ),
        this.fs.copyTpl(
          this.templatePath('_d8/_cmm_torsion.breakpoints.yml'),
          this.destinationPath('web/themes/custom/' + this.projectnameSafe + '/' + this.projectnameSafe + '.breakpoints.yml'),
          {
            theme_name: this.projectnameSafe
          }
        ),
        this.fs.copyTpl(
          this.templatePath('_d8/_templates/_html/_html.html.twig'),
          this.destinationPath('web/themes/custom/' + this.projectnameSafe + '/templates/html/html.html.twig')
        )
      }
    }
  }
});
