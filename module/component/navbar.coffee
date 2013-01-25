  # Navbar view class
  class NavbarView extends PackageView
    options: {
      style: ''
    }
    template: 
      '<div class="navbar <%= style %>">'+
        '<div class="navbar-inner">'+
          '<ul class="nav"></ul>'+
        '</div>'+
      '</div>'

    # Composer functions
    brand: (options)->
      options ?= {}
      options.parentView = @
      options.el = $(@el).find("ul.nav")
      new NavbarBrandView options
      return @

    item: (options)->
      options ?= {}
      options.parentView = @
      options.el = $(@el).find("ul.nav")
      new NavbarItemView options
      return @

    divider: ->
      options = {parentView: @, el: @el.find("ul.nav")}
      new NavbarDividerView options
      return @

  # Navbar brand view class
  class NavbarBrandView extends PackageView
    options: {
      title: 'Home',
      href: "#"
    }
    template:
      '<a class="brand" href="<%= href %>"><%= title %></a>'

  # Navbar item view class
  class NavbarItemView extends PackageView
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
  class NavbarDividerView extends PackageView
    options: {}
    template:
      '<li class="divider-vertical"></li>'

  # Composer functions
  PackageView.prototype.navbar = (options)->
    options ?= {}
    options.parentView = @
    options.el = @el
    return new NavbarView options
