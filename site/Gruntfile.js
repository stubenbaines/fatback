var targets = [
	'models/**/*.js',
	'views/**/*.js',
	'controllers/**/*.js',
	'routes/**/*.js',
	'app.js'
	],
	PORT = 5000,
	DEBUG_PORT = 5001,
	HOST = 'localhost',
	APP = './app.js';

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
		// https://npmjs.org/package/grunt-nodemon
		nodemon: {
			dev: {
				options: {
					file: APP,
					args: [DEBUG_PORT],
					nodeArgs: ['--debug'],
					ignoredFiles: ['node_modules/**','bower_components/**'],
					watchedExtensions: ['js'],
					watchedFolders: ['.', 'controllers', 'models', 'routes', 'views'],
					delayTime: 1,
					legacyWatch: true,
					env: {
						PORT: PORT
					},
					cwd: __dirname
				}
			},
			exec: {
				options: {
					exec: 'less'
				}
			}
		},
		// https://npmjs.org/package/grunt-node-inspector
		'node-inspector': {
			custom: {
				options: {
					//'web-port': PORT,
					'web-host': HOST,
					'debug-port': DEBUG_PORT,
					'save-live-edit': true
				}
			}
		},
		// open example https://github.com/jsoverson/grunt-open
		open : {
			dev : {
				path: 'http://' + HOST + ':' + PORT + '/debug?port=' + DEBUG_PORT,
				app: 'Google Chrome'
			},
			build : {
				path : 'http://' + HOST + ':' + PORT,
				app: 'Google Chrome'
			},
			file : {
				path : ''
			}
		},
		// https://github.com/sindresorhus/grunt-concurrent
		concurrent: {
			dev: {
				tasks: ['nodemon', 'node-inspector'],
				options: {
					logConcurrentOutput: true
				}
			}
		}
	});
	// load npm tasks
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-node-inspector');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-open');
	
	// task alias
	grunt.registerTask('dev', ['open:dev']);
	grunt.registerTask('build', ['open:build']);
	grunt.registerTask('lint', ['jshint']);
	grunt.registerTask('default', ['concurrent']);

};