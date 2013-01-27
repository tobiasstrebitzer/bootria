# Navbar view class
class briaBootstrap.HeroView extends bria.PackageView
  @type: "hero-unit"
  options: {
    image: false
  }
  template: 
    '<div class="hero-unit"<% if(image){ %> style="background: url(<%= image %>) repeat top left; border-radius: 0px;"<% } %>></div>'

# Composer functions
bria.PackageView.prototype.hero = (options)->
  return new briaBootstrap.HeroView @getOptions(@, options)
