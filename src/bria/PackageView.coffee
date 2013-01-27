class bria.PackageView extends Backbone.View
  @type: "package"
  @index: {}
  id: null,
  template: false
  options: {
    el: $ 'body'
    model: null
    parentView: null
  }
  html: null
  collection: null
    
  initialize: (options)->
    _.bindAll @
    
    $.briaData.depth++
    $.briaData.log(@)
    
    if(@options.id)
      bria.PackageView.index[@options.id] = @
    
    @render()
  
  # Render the template using underscore
  render: ->
    if @template
      self = @
      options = @options
      defaultOptions = @.constructor.prototype.options
      if options.model
        _.each defaultOptions, (value, key) ->
          if(_.isFunction(options[key]))
            options[key] = options[key](options.model)
          else if typeof options[key] == "string"
            options[key] = self.parseValue(options[key])
              
      html = $(_.template @template, options)
      $(@options.el).append html
      @options.el = html
  
  # Parse input values
  parseValue: (text)->
    operator = text.substr(0,1)
    value = text.substr(1)
    if operator == "@"
      return @options.model.get(value)
    else if operator == "%"
      return _.template(value, @options.model.attributes)
    return text

  # options inheritance
  getOptions: (scope, options)->
    options ?= {}
    options.parentView = scope
    options.el = scope.options.el
    options.model ?= scope.options.model
    return options
  
  
  # Magic methods
  end: ->
    $.briaData.depth--
    return @options.parentView
    
  tooltip: (text)->
    $(@options.el).tooltip({title: @parseValue(text)})
    return @
    
  html: (html)->
    $(@options.el).append html
    return @
      
  hr: ->
    @html "<hr />"
    return @

  heading: (title, level)->
    level ?= 1
    @html "<h#{level}>#{title}</h#{level}>"
    return @

  # Shortcuts
  container: ->
    return @div {cls: "container"}

  row: ->
    return @div {cls: "row"}
  
  # Static functions
  @getById: (id)->
    return bria.PackageView.index[id]
