// # Embedded Json Helper
// Usage (in post): <!--{"url": "http://example.com","title":"Foo"}--> ... etc
// In Template: {{#embeddedjson}}{{#foreach json}}<a href="{{url}}">{{title}}</a>{{/foreach}}{{else}}...{{/embeddedjson}}
// 
// Block helper designed for looping through embedded json objects inside posts, lets user extend Ghost's schema

var cheerio         = require('cheerio'),
    embeddedjson;

function htmlcomments(htmlstring) {
    var j = cheerio.load(htmlstring.toString());
    return j("*").contents().filter(function(){
		return this.type == 'comment';
	});
}
	
embeddedjson = function (options) {
    options = options || {};
    options.hash = options.hash || {};
    var	comments = htmlcomments('<div>'+this.html+'</div>'),
        hasComments = comments.length > 0;
    if(hasComments) {
        this.json=[];
		
        for(var i = 0; i < comments.length; i++){
            try{
                this.json.push(JSON.parse(comments[i].data));
            }catch(e){
				/*JSON.parse() throws SyntaxErrors when the string is not in strict json format*/
			}
        }
		
        return options.fn(this);
    }
    else {
        return options.inverse(this);
    }
};

module.exports = embeddedjson;