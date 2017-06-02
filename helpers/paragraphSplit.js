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

Handlebars.registerHelper('toLower', function(str) {
  if (str && typeof str === 'string') {
    return str.toLowerCase();
  }
});
