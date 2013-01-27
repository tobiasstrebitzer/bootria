class briaBootstrap.ThumbnailsView extends bria.PackageView
  @type: "thumbnails list"
  options: {}
  template:
    '<ul class="thumbnails"></ul>'
      
  # Composer functions
  thumbnail: (options)->
    return new briaBootstrap.ThumbnailView(@getOptions(@, options))

class briaBootstrap.ThumbnailView extends bria.PackageView
  @type: "thumbnail"
  options: {
    cls: ''
  }
  template:
    '<li class="thumbnail <%= cls %>"></li>'

  # Composer functions
  caption: (options)->
    return new briaBootstrap.ThumbnailCaptionView(@getOptions(@, options))

class briaBootstrap.ThumbnailCaptionView extends bria.PackageView
  @type: "thumbnail caption"
  options: {
    cls: ''
  }
  template:
    '<div class="caption <%= cls %>"></div>'

# Composer function
bria.PackageView.prototype.thumbnails = (options)->
  return new briaBootstrap.ThumbnailsView(@getOptions(@, options))
