  class PackageView extends Backbone.View
    
    id: null,
    el: $ 'body'
    template: false
    options: {}
    parentView: null
    html: null
    
    initialize: (options)->
      _.bindAll @
      @parentView = options.parentView
      @el = options.el
      @render()
      
    
    # Render the template using underscore
    render: ->
      if @template
        @html = $(_.template @template, @options)
        $(@el).append @html
        @el = @html
        
    # magic methods
    end: ->
      return @parentView
      
    # Element markup methods
    addClass: (name)->
      $(@el).addClass(name)
      return @

    # Non-containers
    alert: (title, message, style)->
      options = { parentView: @, el: @el, title: title, message: message, style: style }
      new AlertView options
      return @
      
    # Containers
    div: (className)->
      options = { parentView: @, el: @el }
      result = new DivView options
      if className
        result.addClass(className)
      return result

    # Shortcuts
    container: ->
      return @div "container"

    row: ->
      return @div "row"
      
    span: (span)->
      return @div "span#{span}"
