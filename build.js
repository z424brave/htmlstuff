/**
 * Created by samuel.ajetunmobi on 15/04/16.
 */

var Metalsmith = require('metalsmith'),
    markdown   = require('metalsmith-markdown'),
    collections   = require('metalsmith-collections'),
    permalinks   = require('metalsmith-permalinks'),
    templates = require('metalsmith-templates');
    var json2md = require("json2md");

Metalsmith(__dirname)
    .use(collections({
        blog: {
            pattern: '*/news/*',
            oderBy: 'date',
            reverse: true
        },
        pages: {
            pattern: '*/pages/*'
        }
    }))
    .use(permalinks({
        pattern: ':collection/:title'
    }))
    .use(markdown())
    .use(templates('handlebars'))
    .destination('./build')
    .build(function(err){
        if (err){
            console.log(err);
        } else {
            console.log('Site build complete!');
        }
    });