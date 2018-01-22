# Warning!

It's better to check repo https://github.com/ciena-blueplanet/ember-spread - goals which we were leaded by whyle creating this helper totally covered with that addon, and it's definitely better that our approach. So code saved just for really hard cases (but think more than twice before starting use it )

# ember-render-helper
Render helper for Ember.js ( Allow render components dynamically )

##Motivation
Sometimes we need to render component by name, which stores at some property. For such cases there are several workarounds. 

You can read next links:

http://discuss.emberjs.com/t/programmatically-rendering-ember-components/6986

http://stackoverflow.com/questions/25946805/how-to-dynamically-load-ember-components-by-name-in-a-template

https://stackoverflow.com/questions/18972202/how-can-i-invoke-an-ember-component-dynamically-via-a-variable

etc.

##Solutions
Of course at newer [Ember component helper](http://emberjs.com/blog/2015/03/27/ember-1-11-0-released.html#toc_component-helper)
But current version and it's documentation doesn't describe how to pass arguments/paraments. Also it is not available for older versions of Ember. So here is another one '*bicycle*'

##Examples 
All this examples describe at file comments. Here i just duplicate them 

    {{render-component 'image-component' src="" class="image"}}

    {{#render-component 'btn-component' action="addSection"}}
    
    {{#render-component componentName _param='btn-component' action="addSection"}}

 or

    {{#render-component 'btn-component' action="addSection"}}
     Add section
    {{/render-component}}

 or even

    {{#render-component 'render-component' _param='btn-component' action="addSection"}}
      Add section
    {{/render-component}}

  You also can use ___params to define all properties via hash like
  instead of

    {{render-component 'pluralize-component' count=ungrouped.content.meta.total single="Object"}}

  you can use

    {{render-component 'pluralize-component' ___params=hash}}

  and hash is

    hash = { count:ungrouped.content.meta.total, single:"Object"}

  For cases when we need pass into component not only attributes but param too
  When we need this?
  for example you want to render
 

    {{componentName paramName someOption=someOptionValue}}

  You can do
 

    {{#render-component 'componentName' someOption=someOptionValue}}

  **BUT! You can't do ( you can't pass more than one argument into component )**
 

    {{#render-component 'componentName' paramName someOption=someOptionValue}}

  so for such cases you can use '_param' ( at line param or at hash property )
 

    {{#render-component 'componentName' _param=paramName someOption=someOptionValue}}

  or
 

    {{#render-component 'componentName' __params=paramsHash}}

  where paramsHash is
 

    paramsHash = { _param:paramName, someOption=someOptionValue }


##Tests 
Sadly for me, but right now there are no tests for helper ( yep, I know it's not good ). But I hope to fix this in future. 

#[Welcome with feedback and your proposals](https://github.com/vvs-code/ember-render-helper/issues)
