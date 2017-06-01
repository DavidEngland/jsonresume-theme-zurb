var fs = require("fs");
var Handlebars = require("handlebars");
var URL = require("url");
var nets = ["500px", "8tracks", "airbnb", "alliance", "amazon", "amplement", "android", "angellist", "apple", "appnet", "baidu", "bandcamp", "battlenet", "beam", "bebee", "bebo", "behance", "blizzard", "blogger", "buffer", "chrome", "coderwall", "curse", "dailymotion", "deezer", "delicious", "deviantart", "diablo", "digg", "discord", "disqus", "douban", "draugiem", "dribbble", "drupal", "ebay", "ello", "endomondo", "envato", "etsy", "facebook", "feedburner", "filmweb", "firefox", "flattr", "flickr", "formulr", "forrst", "foursquare", "friendfeed", "github", "goodreads", "google", "googlegroups", "googlephotos", "googleplus", "googlescholar", "grooveshark", "hackerrank", "hearthstone", "hellocoton", "hereos", "hitbox", "horde", "houzz", "icq", "identica", "imdb", "instagram", "issuu", "istock", "itunes", "keybase", "lanyrd", "lastfm", "line", "linkedin", "livejournal", "lyft", "macos", "mail", "medium", "meetup", "mixcloud", "modelmayhem", "mumble", "myspace", "newsvine", "nintendo", "npm", "odnoklassniki", "openid", "opera", "outlook", "overwatch", "pandora", "patreon", "paypal", "periscope", "persona", "pinterest", "play", "player", "playstation", "pocket", "qq", "quora", "raidcall", "ravelry", "reddit", "renren", "researchgate", "residentadvisor", "reverbnation", "rss", "sharethis", "skype", "slideshare", "smugmug", "snapchat", "songkick", "soundcloud", "spotify", "stackexchange", "stackoverflow", "starcraft", "stayfriends", "steam", "storehouse", "strava", "streamjar", "stumbleupon", "swarm", "teamspeak", "teamviewer", "technorati", "telegram", "tripadvisor", "tripit", "triplej", "tumblr", "twitch", "twitter", "uber", "ventrilo", "viadeo", "viber", "viewbug", "vimeo", "vine", "vkontakte", "warcraft", "wechat", "weibo", "whatsapp", "wikipedia", "windows", "wordpress", "wykop", "xbox", "xing", "yahoo", "yammer", "yandex", "yelp", "younow", "youtube", "zapier", "zerply", "zomato", "zynga", "spreadshirt", "trello", "gamejolt", "tunein", "bloglovin", "gamewisp", "messenger"];

module.exports = {
  render: render
};

function render(resume) {
  var css = fs.readFileSync(__dirname + "/style.css", "utf-8");
  var template = fs.readFileSync(__dirname + "/resume.hbs", "utf-8");

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

Handlebars.registerHelper('toLower', function(str) {
  if (str && typeof str === 'string') {
    return str.toLowerCase();
  }
});

Handlebars.registerHelper('santify', function(net) {
  var str = URL.parse(net).hostname.toLowerCase();
  var parts = str.split('.');
  //console.log(parts);
  str = (parts.length == 2) ? parts[0] : parts[1];

  for (var i = 0; i < nets.length; i++) {
    if (nets[i].indexOf(str) > -1) {
      return nets[i];
    }
  }
  return "rss";
});

Handlebars.registerHelper('decodeURI', function(str) {
  if (str && typeof str === 'string') {
    return decodeURIComponent(str);
  }
});

Handlebars.registerHelper('spaceToDash', function(str) {
  if (str && typeof str === 'string') {
    return str.replace(/\s/g, '-').toLowerCase();
  }
});

Handlebars.registerHelper('theYear', function() {
  return new Date().getFullYear();
});

Handlebars.registerHelper('prettifyDate', function(d) {
  var date = Date.parse(d);
  if (isNaN(date)) {
    return d
  } else {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    var month = new Date(date).getMonth();
    var year = new Date(date).getFullYear();
    return months[month] + ' ' + year;
  }
});

Handlebars.registerHelper('map', function(level) {
  if (typeof level === 'undefined' || typeof level === null) {
    return ""
  } else {
    level = level.toLowerCase();
    switch (level) {
      case "advanced":
      case "professionial":
      case "pro":
        return "primary";
        break;

      case "basic":
      case "novice":
      case "student":
      case "rookie":
      case "amateur":
      case "knowledgeable":
        return "secondary";
        break;

      case "learning":
      case "beginner":
      case "dabbler":
        return "info";
        break;

      case "average":
      case "competent":
      case "moderate":
      case "intermediate":
      case "proficient":
      case "skillful":
      case "junior":
      case "jr":
      case "jr.":
        return "warning";
        break;

      case "experienced":
      case "master":
      case "working knowledge":
        return "success";
        break;

      case "comfortable":
      case "expert":
      case "junor":
      case "senior":
      case "sr":
      case "sr.":
      case "architect":
        return "alert";
        break;

      default:
        return "";
    }
  }
});

/*
    Handlebars.registerHelper('Y', function(date) {
        return moment(date.toString(), ['YYYY-MM-DD']).format('YYYY');
    });

    Handlebars.registerHelper('DMY', function(date) {
        return moment(date.toString(), ['YYYY-MM-DD']).format('D MMMM YYYY');
    });
    */
