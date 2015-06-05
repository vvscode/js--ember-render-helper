var each = Ember.$.each;
var merge = Ember.merge;
var get = Ember.get;
/**
 * Render component by name
 * @param componentPath
 * @param options
 *
 * Examples:
 *
    {{render-component 'image-component' src="" class="image"}}
    {{render-component 'pluralize-component' count=ungrouped.content.meta.total single="Object"}}
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
  BUT! You can't do ( you can't pass more than one argument into component )
     {{#render-component 'componentName' paramName someOption=someOptionValue}}
  so for such cases you can use '_param' ( at line param or at hash property )
     {{#render-component 'componentName' _param=paramName someOption=someOptionValue}}
  or
     {{#render-component 'componentName' __params=paramsHash}}
  where paramsHash is
     paramsHash = { _param:paramName, someOption=someOptionValue }
 */
export default function(componentPath, options) {
  var view = options.data.view,
    resolvePath = function(path) {
      return view.getStream(path).value();
    },
    component = resolvePath(componentPath) || componentPath,
    helper = Ember.Handlebars.resolveHelper(options.data.view.container, component),
    hash = options.hash;

  // Allow to pass params as hash-object
  if('___params' in hash) {
    var params = resolvePath(hash.___params);
    delete hash.___params;
    hash = merge(params, hash);
    options.hash = hash;
  }

  // Allow to specify which params should be resolved
  each(hash, function(key, value) {
    var newKey = key.replace('__', '');
    if((key.indexOf('__') === 0)){
      options.hash[newKey] = value;//resolvePath(value);
      options.hashContexts[newKey] = get(view, 'controller');
      options.hashTypes[newKey] = "ID";
    }
  });

  // For cases when we need pass into component not only attributes but param too
  // When we need this?
  // for example you want to render
  //    {{componentName paramName someOption=someOptionValue}}
  // You can do
  //    {{#render-component 'componentName' someOption=someOptionValue}}
  // BUT! You can't do ( you can't pass more than one argument into component )
  //    {{#render-component 'componentName' paramName someOption=someOptionValue}}
  // so for such cases you can use
  //    {{#render-component 'componentName' _param=paramName someOption=someOptionValue}}
  // or
  //    {{#render-component 'componentName' __params=paramsHash}}
  // where paramsHash is
  //    paramsHash = { _param:paramName, someOption=someOptionValue }
  if('_param' in hash) {
    var param = resolvePath(hash._param);
    delete hash._param;
    helper.call(this, param, options);
  } else {
    helper.call(this, options);
  }
}
