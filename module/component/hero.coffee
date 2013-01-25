  # Navbar view class
  class HeroView extends PackageView
    options: {}
    template: 
      '<div class="hero-unit"></div>'

  # Composer functions
  PackageView.prototype.hero = (options)->
    options ?= {}
    options.parentView = @
    options.el = @el
    return new HeroView options
