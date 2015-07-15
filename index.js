var parsedCache = {};
// @link https://github.com/muut/riotjs/blob/master/lib/tmpl.js#L64
var RE_VARS = /(['"\/]).*?[^\\]\1|\.\w*|\w*:|\b(?:(?:new|typeof|in|instanceof) |(?:this|true|false|null|undefined)\b|function *\()|([a-z_$]\w*)/gi;

function _wrap(s) {
  s = s.trim();
  return !s ? 'void 0' : [
    '(function(){',
    'var v;',
    'try{',
    // prefix vars (name => data.name)
    'v=', (s.replace(RE_VARS, function(s, _, v) { return v ? 'd.'+ v : s ;}) || 'void 0'),
    '} catch(e) { ' +
    'v = void 0; ' + // for IE6, IE7, 如果没有catch,则try相当于无形, bad shit!
    '} finally{' +
    'return v',
    '}}).call(d)'].join('\n');
}

export default function parse(expression) {
  if (!parsedCache[expression]) {
    var func;
    /* jshint ignore:start */
    try {
      func = new Function('d', 'return ' + _wrap(expression));
    } catch (e) {
      func = function () {
        M._ERRORS.push(new Error("[ " + expression + " ] is not a legal javascript expression"));
      };
    }
    /* jshint ignore:end */
    parsedCache[expression] = func;
  }
  return parsedCache[expression];
}

// usage:
// parse(expression)(data)
