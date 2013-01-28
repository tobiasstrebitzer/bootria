class briaBootstrap.ButtonGroupView extends bria.PackageView
  @type: "btn-group"
  options: {
    cls: ''
  }
  template:
    '<div class="btn-group <%= cls %>"></div>'

# Composer function
bria.PackageView.prototype.btngroup = (options)->
  return new briaBootstrap.ButtonGroupView(@getOptions(@, options))

class briaBootstrap.ButtonView extends bria.PackageView
  @type: "btn"
  options: {
    title: 'Title',
    href: '#',
    cls: '',
    target: '_top',
    click: null
  }
  template:
    '<a class="btn <%= cls %>" target="<%= target %>" href="<%= href %>"><%= title %></a>'
      
  initialize: (options)->
    super()
    # Bind events
    if options.click
      @options.el.click @options.click

# Composer function
bria.PackageView.prototype.btn = (options)->
  return new briaBootstrap.ButtonView(@getOptions(@, options)).end()
