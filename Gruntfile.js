module.exports = function(grunt) {
    var jsFiles = [
            '*.js',
            '!cordova.js',
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/jquery-slotmachine/dist/jquery.slotmachine.min.js',
            'bower_components/lodash/dist/lodash.min.js'
        ],
        cssFiles = [
            '*.css',
            'bower_components/bootstrap/dist/bootstrap.min.css'
        ],
        htmlFiles = [
            'index.html'
        ],
        distFiles = jsFiles.concat(cssFiles).concat(htmlFiles);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            src: [
                '*.js'
            ],
            options: {
                globals: {$: true}
            }
        },
        copy: {
            all: {
                src: distFiles,
                dest: 'dist/',
                filter: 'isFile'
            },
            cordova: {
                src: distFiles,
                dest: 'cordova/www/'
            }
        },
        exec: {
            cordova: {
                cwd: 'cordova',
                cmd: 'cordova run android'
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-exec');

    // Default task(s).
    grunt.registerTask('cordova', ['default', 'exec:cordova']);
    grunt.registerTask('default', ['jshint','copy']);

};