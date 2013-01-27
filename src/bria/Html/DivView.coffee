#<< bria/PackageView
class bria.Html.DivView extends bria.PackageView
  @type: "div"
  options: {
    cls: ''
  }
  template:
    '<div <% if(cls){ %>class="<%= cls %>"<% } %>></div>'

# Composer functions
bria.PackageView.prototype.div = (options)->
  return new bria.Html.DivView @getOptions(@, options)