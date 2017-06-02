Handlebars.registerHelper('santify', function(url, network) {
  // first parse the url to see if can match to socion icons.
  var str = URL.parse(url).hostname.toLowerCase();
  var parts = str.split('.');
  console.log(parts);
  //console.log(parts);
  str = (parts.length == 2) ? parts[0] : parts[1];
  // Check for googleplus, may have to add others ...
  if (parts[0]=='plus' && parts[1] =='google') {
    return parts[1]+parts[0];
  }
  for (var i = 0; i < nets.length; i++) {
    if (nets[i].indexOf(str) > -1) {
      return nets[i];
    }
  }
  // url didn't parse to known icon, go with network without spaces or dash
  if (network && typeof network === 'string') {
    return network.split(' ').join('').split('-').join('').toLowerCase();
  } else {
    return "rss";
  }
});
