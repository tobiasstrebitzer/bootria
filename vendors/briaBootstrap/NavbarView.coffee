# Navbar view class
class briaBootstrap.NavbarView extends bria.PackageView
  @type: "navbar"
  options: {
    cls: '',
    responsive: false
  }
  template: 
    '<div class="navbar <%= cls %>">'+
      '<div class="navbar-inner">'+
        '<div class="container">'+
          '<% if(responsive) { %>'+
            '<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">'+
              '<span class="icon-bar"></span>'+
              '<span class="icon-bar"></span>'+
              '<span class="icon-bar"></span>'+
            '</a>'+
          '<% } %>'+
          '<ul class="nav"></ul>'+
        '</div>'+
      '</div>'+
    '</div>'

  # Composer functions
  brand: (options)->
    options = @getOptions(@, options)
    options.el = $(@options.el).find("ul.nav")
    return new briaBootstrap.NavbarBrandView(options).end()

  item: (options)->
    options = @getOptions(@, options)
    options.el = $(@options.el).find("ul.nav")
    return new briaBootstrap.NavbarItemView(options).end()

  divider: ->
    options = @getOptions(@, options)
    options.el = $(@options.el).find("ul.nav")
    return new briaBootstrap.NavbarDividerView(options).end()

  dropdown: (options)->
    options = @getOptions(@, options)
    options.el = $(@options.el).find("ul.nav")
    return new briaBootstrap.NavbarDropdownView(options)

# Navbar brand view class
class briaBootstrap.NavbarBrandView extends bria.PackageView
  @type: "navbar-brand"
  options: {
    title: 'Home',
    href: "#"
  }
  template:
    '<a class="brand" href="<%= href %>"><%= title %></a>'

# Navbar item view class
class briaBootstrap.NavbarItemView extends bria.PackageView
  @type: "navbar-item"
  options: {
    title: 'Menu entry',
    href: "#",
    active: false
  }
  template: 
    '<li<% if(active) { %> class="active"<% } %>>'+
      '<a href="<%= href %>"><%= title %></a>'+
    '</li>'  
      
# Navbar divider view class
class briaBootstrap.NavbarDividerView extends bria.PackageView
  @type: "navbar divider"
  options: {}
  template:
    '<li class="divider-vertical"></li>'

# Navbar dropdown view class
class briaBootstrap.NavbarDropdownView extends bria.PackageView
  @type: "navbar-dropdown"
  options: {
    title: 'Menu entry'
    role: 'menu',
    labelledby: 'dropdownMenu'
  }
  template: 
    '<li class="dropdown">'+
      '<a class="dropdown-toggle" href="#" data-toggle="dropdown">'+
        '<%= title %>&nbsp;<b class="caret"></b>'+
      '</a>'+
      '<ul class="dropdown-menu" role="<%= role %>" aria-labelledby="<%= labelledby %>"></ul>'+
    '</li>'

  # Composer functions
  item: (options)->
    options = @getOptions(@, options)
    options.el = @options.el.find("ul.dropdown-menu")
    return new briaBootstrap.DropdownItemView(options).end()

  divider: ->
    options = @getOptions(@, options)
    options.el = @options.el.find("ul.dropdown-menu")
    return new briaBootstrap.DropdownDividerView(options).end()

# Composer functions
bria.PackageView.prototype.navbar = (options)->
  return new briaBootstrap.NavbarView @getOptions(@, options)
