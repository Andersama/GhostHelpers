// # CSS Query Helper
// Usage: `{{#css query="css selector"}}...expression...{{else}}...if no html matched query...{{/css}}`
//
// Checks if a post has a particular property

var _               = require('lodash'),
    errors          = require('../errors'),
    cheerio			= require('cheerio'),
    css;

css = function (options) {
    options = options || {};
    options.hash = options.hash || {};
    var expression = options.fn(this).toString(),
        j = cheerio.load(expression),
        query = options.hash.query,
        el;

    if (!query) {
        errors.logWarn(i18n.t('warnings.helpers.has.invalidAttribute'));
        return;
    }

    el = j(query.toString());

    if(el.length > 0){
        return options.fn(this);
    }

    return options.inverse(this);
};

module.exports = css;