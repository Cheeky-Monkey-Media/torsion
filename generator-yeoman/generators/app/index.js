'use strict';
var generators = require('yeoman-generator');
var yosay = require('yosay');

module.exports = generators.Base.extend({
  // The name `constructor` is important here
  constructor: function () {
    // Calling the super constructor is important so our generator is correctly set up
    generators.Base.apply(this, arguments);
  },

  initializing: function () {
    this.pkg = require('../../package.json');
  },  

  prompting: function () {
    this.log(yosay('Torsion by Cheeky Monkey Media'));
  }
});
