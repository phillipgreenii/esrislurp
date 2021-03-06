/*
 * grunt-esri-slurp
 * https://github.com/steveoh/grunt-esri-slurp
 *
 * Copyright (c) 2014 steveoh
 * Licensed under the MIT license.
 */

'use strict';

var version = '3.11';
var bumpFiles = [
  'package.json'
];

module.exports = function(grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        '*.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    },
    clean: {
      tests: ['tmp']
    },
    nodeunit: {
      tests: ['test/*_test.js']
    },
    bump: {
      options: {
        files: bumpFiles,
        commitFiles: bumpFiles,
        push: false
      }
    },
    esri_slurp_modules: {
      options: {
        version: version
      }
    }
  });

  for (var key in grunt.file.readJSON('package.json').devDependencies) {
    console.log(key);
    if (key !== 'grunt' && key.indexOf('grunt') === 0) {
      grunt.loadNpmTasks(key);
    }
  }

  grunt.loadTasks('tasks');

  grunt.registerTask('test', ['clean', 'jshint', 'nodeunit']);

  grunt.registerTask('default', ['jshint']);

  grunt.registerTask('generate_list', ['esri_slurp_modules']);

  grunt.registerTask('travis', ['jshint', 'nodeunit']);
};
