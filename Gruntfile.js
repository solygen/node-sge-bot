module.exports = function (grunt) {
  'use strict'

  const pkg = require('./package.json')

  // initialize
  grunt.initConfig({
    pkg: pkg,
    jshint: require('./tasks/jshint.js'),
    jscs: require('./tasks/jscs.js')
  })

  // load plugins
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-jscs')

  // tasks
  grunt.registerTask('default', ['jshint', 'jscs'])
}
