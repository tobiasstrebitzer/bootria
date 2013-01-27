#<< bria/PackageView
class bria.Html.TagView extends bria.PackageView
  @type: "tag"
  options: {
    cls: ''
    tag: "span",
    text: ''
  }
  template:
    '<% if(tag){ %>'+
      '<<%= tag %><% if(cls) { %> class="<%= cls %>"<% } %>>'+
    '<% } %>'+
    '<%= text %>'+
    '<% if(tag){ %>'+
      '</<%= tag %>>'+
    '<% } %>'

# Composer functions
bria.PackageView.prototype.tag = (options)->
  result = new bria.Html.TagView(@getOptions(@, options))
  if options.text
    return result.end()
  else
    return result

bria.PackageView.prototype.span = (options)->
  if typeof options == "string"
    return @tag({text: options, tag: "span"})
  else
    return @tag(options)

bria.PackageView.prototype.p = (options)->
  if typeof options == "string"
    return @tag({text: options, tag: "p"})
  else
    return @tag(options)
