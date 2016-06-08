module.exports = function (grunt) {
	'use strict';
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: ['*.js', '!gruntfile.js'],
			options: {
				"curly": true,
				"eqnull": true,
				"eqeqeq": true,
				"undef": true,
				"globals": {
					"jQuery": true
				}
			}
		},
		connect: {
			server: {
				options: {
					port: 9000,
					base: 'jasmine',
					hostname: 'localhost',
					keepalive: true,
					livereload: 35729,
					open: {
						target: 'http://localhost:9000'
					}
				}
			}
		},
		karma: {
			unit: {
				configFile: 'karma.conf.js',
				autoWatch: true
			}
		},
		watch: {
			scripts: {
				files: ['**/*.js'],
				tasks: ['jshint'],
				options: {
					spawn: false
				}
			}
		}
	});

	// Default task(s).
	grunt.registerTask('default', ["jshint", "connect"]);

	// Load the plugin that provides the "jshint" task
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks('grunt-karma');
}; 