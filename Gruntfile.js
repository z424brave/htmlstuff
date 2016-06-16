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
                    'dist/assets/css/styles.min.css': ['files/scripts/**/*.css', 'files/scripts/jScrollPane/style/*.css', 'dist/assets/css/*.css']
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
                    'dist/assets/js/scripts.min.js': ['files/scripts/jquery.min.js', 'files/scripts/owl.carousel/*.min.js',
                        'files/scripts/venobox/*.min.js', 'files/scripts/jScrollPane/script/*.js', 'files/scripts/scripts.js']
                }
            }
        },
        copy: {
            images: {
                expand: true,
                cwd: 'files/images',
                src: ['**/*.{png,jpg,svg,gif}'],
                dest: 'dist/assets/images/'
            },
            venobox: {
                expand: true,
                cwd: 'files/scripts/',
                src: ['**/*.{png,jpg,svg,gif}'],
                dest: 'dist/assets/js/images/',
                flatten: true
            }
        },
        watch: {
            templates: {
                files: ['templates/**/*.mustache'],
                tasks: ['mustache_render']
            },
            data: {
                files: ['data/**/*.json'],
                tasks: ['mustache_render']
            },
            styles: {
                options: {
                    spawn: false
                },
                files: ['dist/assets/css/*.css', "files/styles/*.less"],
                tasks: ['less', 'cssmin']
            },
            scripts: {
                files: ["files/scripts/**/*.js", "dist/assets/js/**/*.js"],
                tasks: ['uglify']
            },
            images: {
                files: ["files/images/**/*.{png,jpg,svg}", "dist/assets/images/**/*.{png,jpg,svg}"],
                tasks: ['copy']
            }
        },
        mustache_render: {
            partials: {
                options: {
                    //directory: "templates/partials",
                },
                files: [

                    {
                        data: "data/slide/slide.json",
                        template: "templates/partials/pt-slide.mustache",
                        dest: "templates/partials/slide.mustache"
                    },
                    {
                        data: "data/slide/slide-kingdom.json",
                        template: "templates/partials/pt-slide-kingdom.mustache",
                        dest: "templates/partials/slide-kingdom.mustache"
                    },
                    {
                        data: "data/slide/slide-whammer.json",
                        template: "templates/partials/pt-slide-whammer.mustache",
                        dest: "templates/partials/slide-whammer.mustache"
                    },
                    {
                        data: "data/footer/footer.json",
                        template: "templates/partials/pt-footer.mustache",
                        dest: "templates/partials/footer.mustache"
                    },
                    {
                        data: "data/footer/footer-kingdom.json",
                        template: "templates/partials/pt-footer-kingdom.mustache",
                        dest: "templates/partials/footer-kingdom.mustache"
                    }
                ]
            },
            all: {
                options: {
                    directory: "templates/partials"
                },
                files: [
                    {
                        expand: true,
                        cwd: "data/game/",
                        src: "*.json",
                        template: "templates/footer.mustache",
                        dest: "dist/footer/",
                        ext: '.html'
                    },
                    {
                        expand: true,
                        cwd: "data/game/",
                        src: "*.json",
                        template: "templates/games.mustache",
                        dest: "dist/game/",
                        ext: '.html'
                    },
                    {
                        expand: true,
                        cwd: "data/game/",
                        src: "*.json",
                        template: "templates/manager.mustache",
                        dest: "dist/manager/",
                        ext: '.html'
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
            deploy: {
                files: 'dist/',
                options: {
                    //user: "samuel.ajetunmobi",
                    remoteBase: "/var/www/twlauncher",
                    clean: "--delete"
                }
            }
        },
        aws: grunt.file.readJSON('deploy-keys.json'), // Load deploy variables
        aws_s3: {
            options: {
                accessKeyId: '<%= aws.AWSAccessKeyId %>',
                secretAccessKey: '<%= aws.AWSSecretKey %>',
                region: '<%= aws.AWSRegion %>',
                uploadConcurrency: 5, // 5 simultaneous uploads
                downloadConcurrency: 5 // 5 simultaneous downloads
            },
            production: {
                options: {
                    bucket: 'l2.totalwar.com'
                },
                files: [
                    {expand: true, cwd: 'dist', src: ['**'], dest: '/'}
                ]
            }
        },
        clean: {
            build: ['dist']
        },
        connect: {
            server: {
                options: {
                    port: 9898,
                    base: 'dist',
                    keepalive: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-mustache-render');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-rsync-2');
    grunt.loadNpmTasks('grunt-aws-s3');


    grunt.registerTask('default', 'watch');
    grunt.registerTask('dist', ['clean', 'mustache_render:partials', 'mustache_render:all', 'less', 'cssmin', 'uglify', 'copy']);
    grunt.registerTask('deploy-dev', ['clean', 'mustache_render:partials', 'mustache_render:all', 'less', 'cssmin', 'uglify', 'copy', 'rsync', 'clean']);
    grunt.registerTask('deploy-prod', ['clean', 'mustache_render:partials', 'mustache_render:all', 'less', 'cssmin', 'uglify', 'copy', 'aws_s3', 'clean']);
    grunt.registerTask('partials', ['mustache_render:partials']);
};
