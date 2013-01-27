#<< bria/PackageView
class bria.Html.PView extends bria.PackageView
  @type: "p"
  options: {
    cls: ''
  }
  template:
    '<p<% if(cls) { %> class="<%= cls %>"<% } %>></p>'


# Composer functions
bria.PackageView.prototype.p = (options)->
  return new bria.Html.PView @getOptions(@, options)