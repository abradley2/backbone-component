# Simple Backbone Component

This is a very small extension to Backbone Views that provide a _Component_ pattern.
It adds two new methods to the prototype of Backbone.View: `mountComponents`
and `unmountComponents`

A "component" in this case is just a Backbone View

All components used by a View should be registered in the

```
var MyView = Backbone.View.extend({

  template: require('./MyViewTemplate.hbs'),

  components: {
    'my-component': require('../components/my-component.js'),
    'like-button': require('../components/like-button.js')
  },

  render: function(){
    this.$el.html(this.template());
    this.mountComponents();
  },

  remove: function(){
    this.unmountComponents();
    this.$el.empty();
  }

});
```

Components are nothing special. They are just factories for Backbone Views.

```
var MyView = Backbone.View.extend({
  components: {
    'my-component': Backbone.View.extend({

    })
  }
  ...
});
```

# Lifecycle of Components

`.initialize(attributes, view)` is called when an opponent is first mounted as a result of `View.mountComponents()`. The attributes is a simple json object returning key/values pairs
of the attributes on the components element. This is the most semantic way of passing
parameters from your parent view to components.

For example, in your views template:
```
{{#each posts}}
  <post-component postId='{{id}}'></post-component>
{{/each}}
```

In the components initialize function, it will receive `{postId: <id>}` as it's first argument.

The parent view is passed in as the second argument. As always, be careful when having your
component bind events on your parent view. Be sure these are unbound or you call `stopListening`
in your components `remove` step.

Immediately after a component is mounted and `initialize` is called, the `.render` function will be
called. In between, your components element is set via `.setElement` for you, so there is no need
to do this. The components dome node will be available in `this.el` and `this.$el`

Finally, when a component is unmounted as a result of `View.unmountComponents` the `.remove`
function of each component will be called. Use this to clean up.

# References to Components.

The View instances of each component is stored as an attribute of the node they are mounted to
via jQuery's `#.data` feature. This makes it easy for the parent view to reference instances
of mounted components. For example, heres a simple function to put on your view allowing you
to get an array of all instance of a mounted component by name:

```
getComponents: function(elementName){
  this.$(elementName).each(function(){
    return $(this).data(elementName);
  });
}
```
