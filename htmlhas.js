// # htmlhas Helper
// Usage: `{{#htmlhas query="css selector"}}...expression...{{/htmlhas}}`
//
// Checks if a post has a particular property

var _               = require('lodash'),
	errors          = require('../errors'),
	cheerio			= require('cheerio'),
	hbs           	= require('express-hbs'),
    htmlhas;

htmlhas = function (options) {
    options = options || {};
    options.hash = options.hash || {};
	var expression = hbs.compile(options.hash.html) || options.fn(this).toString();
	var theHtml = cheerio.load(expression);
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