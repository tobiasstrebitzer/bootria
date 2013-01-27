# Dropdown view class
class briaBootstrap.TableView extends bria.PackageView
  @type: "table"
  options: {
    cls: ''
  }
  template: 
    '<table class="table <%= cls %>"></table>'

  # Composer functions
  tr: (options)->
    return new briaBootstrap.TableRowView(@getOptions(@, options))

# Dropdown item view class
class briaBootstrap.TableRowView extends bria.PackageView
  @type: "table-row"
  options: {
    cls: ''
  }
  template: 
    '<tr<% if(cls){ %> class="<%= cls %>"<% } %>></tr>'
      
  # Composer functions
  td: (options)->
    return new briaBootstrap.TableCellView(@getOptions(@, options))
      
# Dropdown divider view class
class briaBootstrap.TableCellView extends bria.PackageView
  @type: "table-cell"
  options: {}
  template:
    '<td></td>'

# Composer functions
bria.PackageView.prototype.table = (options)->
  return new briaBootstrap.TableView @getOptions(@, options)
