(function() {
    var fs = require("fs");
    var Handlebars = require("handlebars");
    // var moment = require("moment");
    var marked = require("marked");

    function render(resume) {
        var css = fs.readFileSync(__dirname + "/style.css", "utf-8");
        var tpl = fs.readFileSync(__dirname + "/resume.hbs", "utf-8");

        return Handlebars.compile(tpl)({
            css: css,
            resume: resume
        });
    }

    module.exports = {
        render: render
    };


    /* HANDLEBARS HELPERS */
    Handlebars.registerHelper('paragraphSplit', function(plaintext) {
        var output = '';
        var lines = plaintext instanceof Array ? plaintext.join('').split(/\r\n|\r|\n/g) : plaintext.split(/\r\n|\r|\n/g);
        var i = 0;

        while (i < lines.length) {
            if (lines[i]) {
                output += '<p>' + lines[i] + '</p>';
            }
            i += 1;
        }

        return new Handlebars.SafeString(output);
    });

    Handlebars.registerHelper('markdown', function(str) {
        return marked(str.fn(this));
    });

    Handlebars.registerHelper('toLower', function(str) {
        return str.toLowerCase();
    });

    Handlebars.registerHelper('decodeURI', function(str) {
        return decodeURIComponent(str);
    });

    Handlebars.registerHelper('spaceToDash', function(str) {
        return str.replace(/\s/g, '-').toLowerCase();
    });

    Handlebars.registerHelper('prettifyDate', function(date) {

        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        var month = new Date(date).getMonth();
        var year = new Date(date).getFullYear();
        return months[month] + ' ' + year;
    });
    /*
        Handlebars.registerHelper('Y', function(date) {
            return moment(date.toString(), ['YYYY-MM-DD']).format('YYYY');
        });

        Handlebars.registerHelper('DMY', function(date) {
            return moment(date.toString(), ['YYYY-MM-DD']).format('D MMMM YYYY');
        });
        */
}());
