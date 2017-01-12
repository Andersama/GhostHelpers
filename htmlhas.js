// # htmlhas Helper
// Usage: `{{#htmlhas query="css selector"}}...expression...{{/htmlhas}}`
//
// Checks if a post has a particular property

var _               = require('lodash'),
	errors          = require('../errors'),
	cheerio			= require('cheerio'),
    htmlhas;

htmlhas = function (options) {
    options = options || {};
    options.hash = options.hash || {};
	var theHtml = cheerio.load(options.fn(this).toString());
	var query = options.hash.query;
	if (!query) {
        errors.logWarn(i18n.t('warnings.helpers.has.invalidAttribute'));
        return;
    }
	var el = theHtml(query.toString());
	if(el.length > 0){
        return options.fn(this);
    }
    return options.inverse(this);
};

module.exports = htmlhas;