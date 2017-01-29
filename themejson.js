// # Embedded Json Helper (Async Theme Helper)
// Usage (in post): <!--{"url": "http://example.com","title":"Foo"}--> ... etc
// In Template: {{#themejson}}{{#foreach json}}<a href="{{url}}">{{title}}</a>{{/foreach}}{{else}}...{{/themejson}}
// 
// Block helper designed for grabbing 'settings.json' from a theme lets user extend Ghost's schema

var config          = require('../config'),
    fs              = require('fs'),
    path            = require('path'),
    api             = require('../api'),
    themejson;
	
themejson = function (options) {
    options = options || {};
    options.hash = options.hash || {};
    var themeJson,
        self = this,
        activeTheme;
	
    return api.settings.read({context: {internal: true}, key: 'activeTheme'}).then(function then(response) {
        activeTheme = response.settings[0].value;
		themeJson = path.join(config.paths.themePath, activeTheme, 'settings.json');
		var fileStat = fs.statSync(themeJson);
		if(fileStat.isFile()){
			try{
				self.json = JSON.parse(fs.readFileSync(themeJson, 'utf8'));
				console.log(self.json);
				return options.fn(self);
			}catch(e){
				return options.inverse(self);
			}
		}
		return options.inverse(self);
	});
};

module.exports = themejson;