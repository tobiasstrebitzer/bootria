  # Bootria jquery plugin
  $.fn.extend
    bootria: (options) ->
      
      # Handle settings
      settings =
        id: null,
        virtual: false
      settings = $.extend settings, options

      # Handle element
      settings.el = this[0]

      return new RootView settings
