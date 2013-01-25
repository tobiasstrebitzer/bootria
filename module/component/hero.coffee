  # Navbar view class
  class HeroView extends PackageView
    options: {
      image: false
    }
    template: 
      '<div class="hero-unit"<% if(image){ %> style="background: url(<%= image %>) repeat top left; border-radius: 0px;"<% } %>></div>'

  # Composer functions
  PackageView.prototype.hero = (options)->
    options ?= {}
    options.parentView = @
    options.el = @el
    return new HeroView options
