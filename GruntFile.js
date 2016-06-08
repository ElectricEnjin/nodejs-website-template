module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-modernizr');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-lodash');

	function getModernizrVersion() {
		var packageJson = require('./node_modules/grunt-modernizr/node_modules/customizr/node_modules/modernizr/package.json');
		
		return packageJson.version;
	}

	function getLodashVersion() {
		var packageJson = require('./node_modules/lodash-cli/node_modules/lodash-compat/package.json');
		
		return packageJson.version;
	}
	
	var config = {
		modernizrVersion: getModernizrVersion(),
		lodashVersion: getLodashVersion()
	};
	
	grunt.initConfig({
		config: config,
		clean: {
			css: {
				options: {
					force: true
				},
				src: [
				      './public/css/**/*.css'
				      ]
			}
		},
	
		sass: {
			common: {
				files: [{
					expand: true,
					cwd: './public/css/',
					src: '**/*.scss',
					dest: './public/css/',
					ext: '.css',
				}]
			}
		},
		
		cssmin: {
			minify: {
				options: {
					keepSpecialComments: 0
				},
				files: [{
					sourceMap: false,
					expand: true,
					extDot: 'last',
					ext: '.min.css',
					cwd: './public/css/',
					src: '**/*.css',
					dest: './public/css/'
				}]
			}
		},
		
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({})
                ]
            },
            dist: {
                src: './public/css/*.css'
            }
        },
		
		uglify: {
			minify: {
				options: {
					sourceMap: true
				},
				files: {
					'public/js/script.min.js': require('./scripts.json')
				}
			}
		},
		
		modernizr: {
			dist: {
				dest : "public/vendor/modernizr-<%= config.modernizrVersion %>/modernizr-custom.js",
				options: [
		          "html5shiv",
		          "setClasses"
	          	],
	          	// Define any tests you want to explicitly include
	          	tests : [],
	          	crawl : false,
	          	uglify : false
			}
		},
		
		lodash: {
			target: {
				dest: 'public/vendor/lodash-<%= config.lodashVersion %>/lodash-custom.js'
			},
			options: {
				modifier: 'modern',
				include: ['throttle'],
				shortFlags: ['d','m']
			}
		},
		
		watch: {
			options: {
				livereload: true,
			},
			sass: {
				options: {
					livereload: false
				},
				files: ['**/*.scss'],
				tasks: ['sass']
			},
			css: {
				files: ['public/css/styles.css', 'public/css/styles.min.css'],
				tasks: []
			}
		},
		
		githooks: {
			all: {
				'post-merge': 'default',
			}
		}
	});
  
  grunt.registerTask('default', ['clean', 'sass', 'cssmin', 'postcss', 'modernizr', 'lodash', 'uglify']);
}