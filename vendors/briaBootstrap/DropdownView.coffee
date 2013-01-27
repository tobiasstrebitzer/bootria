# Dropdown view class
class briaBootstrap.DropdownView extends bria.PackageView
  @type: "dropdown"
  options: {
    role: 'menu',
    labelledby: 'dropdownMenu'
  }
  template: 
    '<ul class="dropdown-menu" role="<%= role %>" aria-labelledby="<%= labelledby %>"></ul>'

  # Composer functions
  item: (options)->
    return new briaBootstrap.DropdownItemView(@getOptions(@, options)).end()

  divider: ->
    return new briaBootstrap.DropdownDividerView(@getOptions(@, options)).end()

# Dropdown item view class
class briaBootstrap.DropdownItemView extends bria.PackageView
  @type: "dropdown-item"
  options: {
    title: 'Menu entry',
    href: "#",
    tabindex: -1
  }
  template: 
    '<li><a tabindex="<%= tabindex %>" href="<%= href %>"><%= title %></a></li>'
      
# Dropdown divider view class
class briaBootstrap.DropdownDividerView extends bria.PackageView
  @type: "dropdown-divider"
  options: {}
  template:
    '<li class="divider"></li>'

# Composer functions
bria.PackageView.prototype.dropdown = (options)->
  return new briaBootstrap.DropdownView @getOptions(@, options)
