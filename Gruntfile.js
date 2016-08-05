module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    });
    require('time-grunt')(grunt);
    require('load-grunt-config')(grunt);

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['compass:dev', 'browserify:dev']);
};
