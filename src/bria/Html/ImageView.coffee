class bria.Html.ImageView extends bria.PackageView
  @type: "img"
  options: {
    src: '',
    alt: '',
    width: null,
    height: null
  }
  template:
    '<img src="<%= src %>" alt="<%= alt %>" <% if(width||height){ %>style="<% if(width){ %>width:<%= width %>px;<% } %><% if(height){ %>height:<%= height %>px;<% } %>"<% } %> />'
              
# Composer function
bria.PackageView.prototype.img = (options)->
  return new bria.Html.ImageView(@getOptions(@, options)).end()