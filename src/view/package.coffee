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
        html = $(_.template @template, @options)
        $(@el).append html
        @el = html
        
    # magic methods
    end: ->
      return @parentView
    
    html: (html)->
      $(@el).append html
      return @
      
    hr: ->
      @html "<hr />"
      return @

    heading: (title, level)->
      level ?= 1
      @html "<h#{level}>#{title}</h#{level}>"
      return @
      
    # Element markup methods
    addClass: (name)->
      $(@el).addClass(name)
      return @
      
    # Containers
    div: (className)->
      options = { parentView: @, el: @el }
      result = new DivView options
      if className
        result.addClass(className)
      return result

    # Render text
    text: (text, options)->
      # Defaults
      options ?= {}
      options.wrap ?= true
      options.class ?= ""
      if options.class
        options.class = " class='#{options.class}'"

      # Generate wrap
      if options.wrap is true
        options.wrap = "p"
      
      # Print text
      console.log options
      if options.wrap
        @html "<#{options.wrap}#{options.class}>#{text}</#{options.wrap}>"
      else
        @html "#{text}"
      return @

    # Shortcuts
    container: ->
      return @div "container"

    row: ->
      return @div "row"
      
    span: (span)->
      return @div "span#{span}"
