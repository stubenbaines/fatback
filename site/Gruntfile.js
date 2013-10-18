/*
	available tasks:
	grunt lint -- jshint
	grunt -- default task will trigger nodemon and node-inspector
	grunt nodemon -- trigger only nodemon
	grunt node-inspector -- trigger only node-inspector
	grunt open:debug -- open the node-inspector in chrome (only the latest chrome works)
	gurnt open:preview -- open the project in chrome (replace app with 'Safari' or 'Firefox')
*/

var targets = [
	'models/**/*.js',
	'views/**/*.js',
	'controllers/**/*.js',
	'routes/**/*.js',
	'app.js'
	],
	WEB_PORT = 5000,
	DEBUG_PORT = 5001,
	INSPECTOR_PORT = 5010,
	HOST = 'localhost',
	APP = './app.js',
	BROWSER = 'Google Chrome';
	// 'Google Chrome', 'Safari', 'Firefox'

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
					args: [WEB_PORT],
					nodeArgs: ['--debug='+DEBUG_PORT],
					ignoredFiles: ['node_modules/**','bower_components/**'],
					watchedExtensions: ['js'],
					watchedFolders: ['.', 'controllers', 'models', 'routes', 'views'],
					delayTime: 1,
					legacyWatch: true,
					env: {
						PORT: WEB_PORT
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
					'web-port': INSPECTOR_PORT,
					'web-host': HOST,
					'debug-port': DEBUG_PORT,
					'save-live-edit': true
				}
			}
		},
		// open example https://github.com/jsoverson/grunt-open
		open : {
			debug : {
				path: 'http://' + HOST + ':' + INSPECTOR_PORT + '/debug?port=' + DEBUG_PORT,
				app: BROWSER
			},
			preview : {
				path : 'http://' + HOST + ':' + WEB_PORT,
				app: BROWSER
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
		},
		watch: {
		    files: '<config:jshint.files>',
		    tasks: 'jshint'
		}
	});
	// load npm tasks with matchdep
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	
	// task alias
	grunt.registerTask('lint', ['jshint']);
	grunt.registerTask('default', ['concurrent']);

};