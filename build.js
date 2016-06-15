/**
 * Created by samuel.ajetunmobi on 15/04/16.
 */

const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const collections = require('metalsmith-collections');
const permalinks = require('metalsmith-permalinks');
const templates = require('metalsmith-templates');
const json2md = require("json2md");

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
    .build(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Site build complete!');
        }
    });