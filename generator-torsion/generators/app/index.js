'use strict';
var generators = require('yeoman-generator');
var yosay = require('yosay');

module.exports = generators.Base.extend({

  constructor: function () {
    generators.Base.apply(this, arguments);
  },

  initializing: function () {
    this.pkg = require('../../package.json');
  },  

  prompting: function () {
    this.log(yosay('Torsion by Cheeky Monkey Media'));

    var prompts = [{
      type: 'checkbox',
      name: 'frameworks',
      message: 'Which framework would you like to include?',
      choices: [{
        name: 'Foundation',
        value: 'includeFoundation',
        checked: false
      //}, {
        //name: 'Bootstrap',
        //value: 'includeBootstrap',
        //checked: true
      }]
    }];

    return this.prompt(prompts).then(function (answers) {
      var frameworks = answers.frameworks;

      function hasFeature(framework) {
        return frameworks && frameworks.indexOf(framework) !== -1;
      };

      // manually deal with the response, get back and store the results.
      // we change a bit this way of doing to automatically do this in the self.prompt() method.
      this.includeFoundation = hasFeature('includeFoundation');
      //this.includeBootstrap = hasFeature('includeBootstrap');
    }.bind(this));
  },

  writing: {
    packageJSON: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('UI/package.json')
      );
    },    
    bowerJSON: function () {
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('UI/bower.json'),
        {
          includeFoundation: this.includeFoundation
          //includeBootstrap: this.includeBootstrap
        }
      );
    }
  }
});
