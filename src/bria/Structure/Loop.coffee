#<< bria/PackageView
class bria.Structure.Loop extends bria.PackageView
  @type: "loop"
  options: {
    count: null,
    skip: 0
    collection: null
  }
  
  initialize: ->
    super()
    @reload()

  reload: ->
    options = @options
    
    
    # Collection exists?
    if options.collection

      # Mask
      options.parentView.options.el.fadeTo(500, 0.1)

      # Fetch data
      options.collection.fetch success: ->
        
        # Clear html
        options.parentView.options.el.html("")

        # Set boundaries
        if (not options.count) or (options.count and options.skip + options.count > options.collection.length)
          options.count = options.collection.length - options.skip
        
        # Compose loop elements
        for i in [options.skip...(options.count + options.skip)]
          options.parentView.options.model = options.collection.models[i]
          options.compose(options.parentView)
          
        options.parentView.options.el.fadeTo(500, 1)

  end: ->
    $.briaData.depth--
    return @options.parentView

# Composer function
bria.PackageView.prototype.loop = (options, compose)->
  options.compose = compose
  new bria.Structure.Loop @getOptions(@, options)
  return @