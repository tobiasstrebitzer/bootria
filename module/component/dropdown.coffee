  # Dropdown view class
  class DropdownView extends PackageView
    options: {
      role: 'menu',
      labelledby: 'dropdownMenu'
    }
    template: 
      '<ul style="display: block; position: static;" class="dropdown-menu" role="<%= role %>" aria-labelledby="<%= labelledby %>"></ul>'

    # Composer functions
    item: (options)->
      options.parentView = @
      options.el = @el
      new DropdownItemView options
      return @

    divider: ->
      options = {parentView: @, el: @el}
      new DropdownDividerView options
      return @

  # Dropdown item view class
  class DropdownItemView extends PackageView
    options: {
      title: 'Menu entry',
      href: "#",
      tabindex: -1
    }
    template: 
      '<li><a tabindex="<%= tabindex %>" href="<%= href %>"><%= title %></a></li>'
      
  # Dropdown divider view class
  class DropdownDividerView extends PackageView
    options: {}
    template:
      '<li class="divider"></li>'

  # Composer functions
  PackageView.prototype.dropdown = (options)->
    options ?= {}
    options.parentView = @
    options.el = @el
    return new DropdownView options
