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
        checked: true
      }, {
        name: 'Bootstrap',
        value: 'includeBootstrap',
        checked: true
      }
      }]
    }];

    return this.prompt(prompts).then(function (answers) {
      var features = answers.features;

      function hasFeature(feat) {
        return features && features.indexOf(feat) !== -1;
      };

      // manually deal with the response, get back and store the results.
      // we change a bit this way of doing to automatically do this in the self.prompt() method.
      this.includeFoundation = hasFeature('includeFoundation');
      this.includeBootstrap = hasFeature('includeBootstrap');
    }.bind(this));


  }
});
