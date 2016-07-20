module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // config a mochaTest task
    mochaTest: {
        test: {
            options: {

                reporter: 'spec',
                captureFile: 'results.txt',
                quiet: false,
                clearRequireCache: false

            },
            src: ['test/*books.js']
        }
     }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-mocha-test');

  // Default task.
  grunt.registerTask('default', 'mochaTest');

};
