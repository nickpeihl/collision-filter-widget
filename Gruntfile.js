module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['Gruntfile.js', 'src/**/*.js', 'test/**.*.js'],
            options: {
                jshintrc: true
            }
        },
        connect: {
            server: {
                options: {
                    port: 9000,
                    base: {
                        path: '.'
                    }
                }
            }
        },
        clean: {
            build: ['dist']
        },
        watch: {
            files: ['./src/**/*.js', 'Gruntfile.js'],
            tasks: ['jshint'],
            options: {
                reload: true
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            },
            firefox: {
                configFile: 'karma.conf.js',
                browsers: ['Firefox']
            }
        }
    });

grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-karma');

grunt.registerTask('default', ['jshint', 'karma:unit']);

};
