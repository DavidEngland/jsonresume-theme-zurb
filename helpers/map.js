Handlebars.registerHelper('map', function(level) {
  if (typeof level === 'undefined' || typeof level === null) {
    return ""
  } else {
    level = level.toLowerCase();
    switch (level) {
      case "advanced", "professionial", "pro":
        return "primary";
        break;
      case "basic", "novice", "student", "rookie", "amateur", "knowledgeable":
        return "secondary";
        break;
      case "learning", "beginner", "dabbler":
        return "info";
        break;
      case "average", "moderate", "intermediate", "proficient", "skillful", "junior", "jr", "jr.":
        return "warning";
        break;
      case "experienced", "master", "working knowledge":
        return "success";
        break;
      case "comfortable", "expert", "junor", "senior", "sr", "sr.", "architect":
        return "alert";
        break;
      default:
        return "";
    }
  }
});
