/// <binding />
module.exports = function (grunt) {
    console.log('process.env.NODE_ENV = ' + process.env.NODE_ENV);
    if (process.env.NODE_ENV && process.env.NODE_ENV !== 'Release') {
        return;
    }

    'use strict';
    // Project configuration
    grunt.initConfig({
        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
        // Task configuration
        concat: {
            options: {
                stripBanners: true
            },
            dist: {
                src: ['Scripts/jquery-*.js', '!Scripts/jquery-*.min.*', '!Scripts/jquery-*.intellisense.*', 'Scripts/bootstrap.js', 'Scripts/respond.js', 'js/**/*.js'],
                dest: 'dist/app.js'
            },
            distCss: {
                src: ['Content/bootstrap.css', 'Content/site.css'],
                dest: 'dist/app.css'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>',
                compress: {
                    drop_console: true
                }
            },
            dist: {
                src: ['<%= concat.dist.dest %>'],
                dest: 'dist/app.min.js'
            }
        },
        cssmin: {
            dist: {
                src: ['<%= concat.distCss.dest %>'],
                dest: 'dist/app.min.css'
            }
        }
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Default task
    grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);
};