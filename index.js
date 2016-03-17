var moment = require('moment');

var UNITS = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'];

moment.parseDuration = function(string) {
  var object = {};

  var tokens = string.split(' ').map(function(word) {
    if (!isNaN(parseFloat(word))) {
      return {
        type: 'number',
        value: parseFloat(word)
      }
    } else {
      var isUnit = UNITS.some(function(unit) {
        return new RegExp(unit, 'i').test(word);
      });

      return {
        type: 'unit',
        value: word + (word[word.length - 1] === 's' ? '' : 's')
      }
    }

    return null;
  }).filter(function(a) {
    return a
  });

  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (token.type === 'number') {
      var unit = tokens[i + 1];
      if (unit.type === 'unit') {
        object[unit.value] = (object[unit.value] || 0) + token.value;
        i++;
      }
    }
  }

  return moment.duration(object);
}
