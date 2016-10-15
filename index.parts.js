var fs = require("fs");
var path = require('path');
var Handlebars = require("handlebars");
var marked = require("marked");

module.exports = {
    render: render
};

function render(resume) {
    var css = fs.readFileSync(__dirname + "/style.css", "utf-8");
    var template = fs.readFileSync(__dirname + "/resume.hbs", "utf-8");
    var partialsDir = path.join(__dirname, 'partials');
    var filenames = fs.readdirSync(partialsDir);

    filenames.forEach(function(filename) {
        var matches = /^([^.]+).hbs$/.exec(filename);
        if (!matches) {
            return;
        }
        var name = matches[1];
        var filepath = path.join(partialsDir, filename)
        var template = fs.readFileSync(filepath, 'utf8');

        Handlebars.registerPartial(name, template);
    });

    return Handlebars.compile(template)({
        css: css,
        resume: resume
    });
}

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

Handlebars.registerHelper('theYear', function() {
    return new Date().getFullYear();
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
