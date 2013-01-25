  # Navbar view class
  class NavbarView extends PackageView
    options: {
      style: '',
      responsive: false
    }
    template: 
      '<div class="navbar <%= style %>">'+
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

    dropdown: (options)->
      options ?= {}
      options.parentView = @
      options.el = $(@el).find("ul.nav")
      return new NavbarDropdownView options

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

  # Navbar dropdown view class
  class NavbarDropdownView extends PackageView
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
      options.parentView = @
      options.el = @el.find("ul.dropdown-menu")
      new DropdownItemView options
      return @

    divider: ->
      options = {parentView: @, el: @el.find("ul.dropdown-menu")}
      new DropdownDividerView options
      return @

  # Composer functions
  PackageView.prototype.navbar = (options)->
    options ?= {}
    options.parentView = @
    options.el = @el
    return new NavbarView options
