# GhostHelpers

These custom helpers use already required repositories for Ghost ~ No extra luggage to get some powerful functionality out of your templates!

# embeddedjson *complete | synchronous*
Extracts json objects inside html comment blocks, note these objects can be used like posts, and can be used to overwrite post content

Usage:

inside post

```html 
	<!--{"url": "http://example.com","title":"Foo"}-->` ... etc <!--{"Multiple":"Objects","Per":"Post","If":"Needed"}-->
```

handlebars

```html
	{{#embeddedjson}}{{#foreach json}}<a href="{{url}}">{{title}}</a>{{/foreach}}{{else}}...{{/embeddedjson}}
```

# themejson *complete | asynchronous*
Extracts 'settings.json' from inside the active theme

Usage:

settings.json

```javascript
	{
		"url": "http://github.com/Andersama",
		"title": "A Convienient Repository"
	}
```

handlebars

```html
	{{#themejson}}<a href="{{json.url}}">{{json.title}}</a>{{else}}...{{/themejson}}
```

# css *complete | synchronous*

Performs a CSS Query on an evaluated expression assuming content between is html*

Usage: 

```html
{{#css query="CSS Selector"}} htmlexpression {{/css}} or {{#css query="CSS Selector"}} htmlexpression {{else}}  {{/css}}
```

```html
	{{#css query="[src$=".svg"]"}}
		<a class="blog-logo" href="{{@blog.url}}"><img src="{{@blog.logo}}" alt="{{@blog.title}}" /></a>
		{{else}}
		<a href="{{@blog.url}}"><img src="{{@blog.logo}}" alt="{{@blog.title}}" /></a>
	{{/css}}
```
Example above performs an extension check for .svg files and adds an additional css class for styling purposes~
