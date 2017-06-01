module.exports = function(timestamp) {
  var month = new Date(timestamp).getMonth() + 1;
  var year = new Date(timestamp).getFullYear();

  return month + '/' + year;
}
