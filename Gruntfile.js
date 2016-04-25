'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        less: {
            options: {
                compress: false,
                yuicompress: true,
                optimization: 2,
                paths: ['files/styles']
            },
            files: {
                expand: true,
                cwd: "files/styles",
                src: ["**/*.less"],
                dest: "dist/assets/css",
                ext: ".css"
            }
        },
        // configure cssmin to minify css files ------------------------------------
        cssmin: {
            options: {
                banner: '/*! TotalWar Game Launcher CSS file */'
            },
            build: {
                files: {
                    'dist/assets/css/styles.min.css': ['files/scripts/**/*.css','dist/assets/css/*.css']
                }
            }
        },
        uglify: {
            dist: {
                options: {
                    sourceMap: true,
                    banner: '/*! TotalWar Launcher JS file */'
                },
                files: {
                    'dist/assets/js/scripts.min.js': ['files/scripts/jquery.min.js','files/scripts/owl.carousel/owl.carousel.min.js','files/scripts/scripts.js'],
                }
            }
        },
        copy: {
            images: {
                expand:     true,
                cwd:        'files/images',
                src:        ['**/*.{png,jpg,svg}'],
                dest:       'dist/assets/images/'
            }
        },
        watch: {
            templates: {
                files: ['templates/*.mustache'],
                tasks: ['mustache_render'],
            },
            data: {
                files: ['data/*.json'],
                tasks: ['mustache_render'],
            },
            styles: {
                options: {
                    spawn: false
                },
                files: ['dist/assets/css/*.css', "files/styles/*.less"],
                tasks: ['less', 'cssmin'],
            },
            scripts: {
                files: ["files/scripts/**/*.js", "dist/assets/js/**/*.js"],
                tasks: ['uglify'],
            },
            images: {
                files: ["files/images/**/*.{png,jpg,svg}", "dist/assets/images/**/*.{png,jpg,svg}"],
                tasks: ['copy'],
            },
        },
        mustache_render: {
            all: {
                options: {
                    directory: "partials"
                },
                files: [
                    {
                        data: "data/footer.json",
                        template: "templates/footer.mustache",
                        dest: "dist/footer.html"
                    },
                    {
                        data: "data/games.json",
                        template: "templates/games.mustache",
                        dest: "dist/games.html"
                    },
                    {
                        data: "data/news.json",
                        template: "templates/news.mustache",
                        dest: "dist/news.html"
                    }
                ]
            }
        },
        rsync: {
            options: {
                // these are my preferred arguments when using rsync
                args: ['-avz', '--verbose', '--delete'],
                // an array of files you'd like to exclude; usual suspects...
                exclude: ['.git*', 'cache', 'logs'],
                recursive: true
            },
            prod: {
                options: {
                    // the dir you want to sync, in this case the current dir
                    src: 'dist',
                    // where should it be synced to on the remote host?
                    dest: '/var/www/twlauncher',
                    // what's the creds and host
                    host: 'samuel.ajetunmobi@ca'
                }
            },
            dev: {
                options: {
                    // the dir you want to sync, in this case the current dir
                    src: 'dist',
                    // where should it be synced to on the remote host?
                    dest: '/var/www/twlauncher',
                }
            }
        },
        clean: {
            build: ['dist'],
        },
    });

    grunt.loadNpmTasks('grunt-mustache-render');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-rsync');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', 'watch');
    grunt.registerTask('dist', ['clean', 'mustache_render','less','cssmin','uglify', 'copy']);
    grunt.registerTask('deploy', ['clean', 'mustache_render','less','cssmin','uglify', 'copy', 'rsync:dev']);
};
