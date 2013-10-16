var targets = [
	'models/**/*.js',
	'views/**/*.js',
	'controllers/**/*.js',
	'routes/**/*.js',
	'app.js'
	],
	port = 5000,
	debugPort = 5001;

module.exports = function(grunt) {
	'use strict';
	grunt.initConfig({
		jshint: {
			files: targets,
			// configure JSHint (documented at http://www.jshint.com/docs/)
			options: {
				globals: {
					console: true,
					jQuery: true
				},
				sub: true,
				white: false,
				bitwise: true,
				curly: true,
				eqeqeq: true,
				latedef: true,
				forin: true,
				immed: true,
				newcap: true,
				noarg: true,
				noempty: true,
				nonew: true,
				regexp: true,
				trailing: true,
				undef: true,
				unused: true
			}
		},
		nodemon: {
			dev: {
				options: {
					file: './app.js',
					args: [debugPort],
					nodeArgs: ['--debug='+debugPort],
					ignoredFiles: ['node_modules/**','bower_components/**'],
					watchedExtensions: ['js'],
					watchedFolders: ['.', 'controllers', 'models', 'routes', 'views'],
					delayTime: 1,
					legacyWatch: true,
					env: {
						PORT: port
					},
					cwd: __dirname
				}
			}
		},
		'node-inspector': {
			custom: {
				options: {
					'web-port': port,
					'web-host': 'localhost',
					'debug-port': debugPort,
					'save-live-edit': true
				}
			}
		},
		concurrent: {
			dev: {
				tasks: ['nodemon', 'node-inspector'],
				options: {
					logConcurrentOutput: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-node-inspector');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');

	grunt.registerTask('lint', ['jshint']);
	grunt.registerTask('debug', ['node-inspector']);
	grunt.registerTask('default', ['concurrent']);

};