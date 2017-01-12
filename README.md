# GhostHelpers

These custom helpers use already required repositories for Ghost ~ No extra luggage to get some powerful functionality out of your templates!

# htmlhas
Performs a CSS Query on an evaluated expression assuming content between is html*
Usage: {{#htmlhas query="CSS Selector"}} htmlexpression {{/htmlhas}} or {{#htmlhas query="CSS Selector"}} htmlexpression {{else}}  {{/htmlhas}}
```html
	{{#htmlhas query="[src$=".svg"]"}}
		<a class="blog-logo" href="{{@blog.url}}"><img src="{{@blog.logo}}" alt="{{@blog.title}}" /></a>
		{{else}}
		<a href="{{@blog.url}}"><img src="{{@blog.logo}}" alt="{{@blog.title}}" /></a>
	{{/htmlhas}}
```
Example above performs an extension check for .svg files and adds an additional css class for styling purposes~
