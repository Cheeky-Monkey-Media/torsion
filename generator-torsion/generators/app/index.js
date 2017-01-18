'use strict';

var generators = require('yeoman-generator');
var yosay = require('yosay');
var _s = require('underscore.string');

module.exports = generators.Base.extend({

  constructor: function (args, opts) {
    generators.Base.apply(this, arguments);
    
    this.option('cms', {
      desc: 'Define which Content Management System (CMS) to use.',
      type: String,
      defaults: 'drupal8'
    });

    this.option('projectname', {
      desc: 'Define the name of the project (which will be used as the theme name).',
      type: String,
      defaults: 'torsion'
    });

    this.option('themepath', {
      desc: 'Theme path from root. (default: [root]/themes/custom)',
      type: String,
      defaults: '../themes/custom'
    });

    this.projectname = this.options['projectname'];
    this.projectnameSafe = this.options['projectname'].toLowerCase().replace(/ /g, "_");
    this.themePath = this.options['themepath'] + '/';
    this.cms = this.options['cms'];
  },

  initializing: function () {
    this.pkg = require('../../package.json');
    this.log(yosay('Setting up scaffolding for your "' + this.options['projectname'] + '" project, using ' + this.options['cms'] + ', and installing theme files to "' + this.options['themepath'] + '". Remember, monkeys are sexy.'));
  },  
  
  writing: {
    configFiles: function () {
      this.fs.copyTpl(
        this.templatePath('_bowerrc'),
        this.destinationPath('pattern-lab/.bowerrc')
      ),
      this.fs.copyTpl(
        this.templatePath('_editorconfig'),
        this.destinationPath('pattern-lab/.editorconfig')
      ),
      this.fs.copyTpl(
        this.templatePath('_jshintrc'),
        this.destinationPath('pattern-lab/.jshintrc')
      );
    },
    torsionFile: function() {
      this.fs.copyTpl(
        this.templatePath('_torsion.json'),
        this.destinationPath('torsion.json'),
        {
          themePath: this.themePath,
          cms: this.cms,
          projectName: this.projectname
        }
      );
    },
    themeFiles: function() {
      if (this.options['cms'] === "drupal8") {
        this.fs.copy(
          this.templatePath('_d8/_favicon.ico'),
          this.destinationPath(this.themePath + this.projectnameSafe + '/favicon.ico')
        ),
        this.fs.copy(
          this.templatePath('_d8/_logo.png'),
          this.destinationPath(this.themePath + this.projectnameSafe + '/logo.png')
        ),
        this.fs.copyTpl(
          this.templatePath('_d8/_cmm_torsion.libraries.yml'),
          this.destinationPath(this.themePath + this.projectnameSafe + '/' + this.projectnameSafe + '.libraries.yml')
        ),
        this.fs.copyTpl(
          this.templatePath('_d8/_cmm_torsion.info.yml'),
          this.destinationPath(this.themePath + this.projectnameSafe + '/' + this.projectnameSafe + '.info.yml'),
          {
            name: this.projectname,
            libraries: this.projectnameSafe
          }
        ),
        this.fs.copyTpl(
          this.templatePath('_d8/_cmm_torsion.breakpoints.yml'),
          this.destinationPath(this.themePath + this.projectnameSafe + '/' + this.projectnameSafe + '.breakpoints.yml'),
          {
            theme_name: this.projectnameSafe
          }
        ),
        this.fs.copy(
          this.templatePath('_d8/_templates/**/*.*'),
          this.destinationPath(this.themePath + this.projectnameSafe + '/templates')
        )
      }
      if (this.options['cms'] === "drupal7") {
        this.fs.copy(
          this.templatePath('_d7/_favicon.ico'),
          this.destinationPath(this.themePath + this.projectnameSafe + '/favicon.ico')
        ),
        this.fs.copy(
          this.templatePath('_d7/_logo.png'),
          this.destinationPath(this.themePath + this.projectnameSafe + '/logo.png')
        ),
        this.fs.copyTpl(
          this.templatePath('_d7/_cmm_torsion.info'),
          this.destinationPath(this.themePath + this.projectnameSafe + '/' + this.projectnameSafe + '.info'),
          {
            d7name: this.projectname
          }
        )
      }
      if (this.options['cms'] === "wordpress") {
      }
    }
  }
});

