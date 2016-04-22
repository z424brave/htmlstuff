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
                    'dist/assets/js/scripts.min.js': ['files/scripts/jquery.min.js','file/scripts/owl.carousel/*.js','files/scripts/scripts.js'],
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
                        data: "data/game.json",
                        template: "templates/game.mustache",
                        dest: "dist/game.html"
                    },
                    {
                        data: "data/news.json",
                        template: "templates/news.mustache",
                        dest: "dist/news.html"
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-mustache-render');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', 'watch');
};
