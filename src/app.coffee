# Bootria jquery plugin
jQuery _>
  $.briaData = {
    depth: 0,
    indent: "",
    debugInfo: "",
    
    log: (object)->
      text = object.constructor.type
      if(object.options.id)
        text += "##{object.options.id}"
      else if(object.options.cls)
        text += ".#{object.options.cls}"
      $.briaData.debugInfo += new Array($.briaData.depth*2).join(' ') + text + "\n";
  }
  $.fn.extend
    bria: (options) ->
      
      # Handle settings
      settings =
        id: null,
        virtual: false
      settings = $.extend settings, options

      # Handle element
      settings.el = this[0]

      return new bria.RootView settings

