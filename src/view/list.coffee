  class ListView extends Backbone.View
    el: $ 'body'
    
    initialize: ->
      _.bindAll @
      
      @collection = new List
      @collection.bind 'add', @appendItem
      
      @counter = 0
      @render()
    
    render: ->

      $container = $ "<div class='container'></div>"
      $container.append "<div class='well'><button class='btn'>AddMessage</button></div>"
      $(@el).append $container

    addItem: ->
      @counter++
      
      item = new Item
      item.set part2: "#{item.get 'part2'} #{@counter}"
      
      @collection.add item
    
    appendItem: (item) ->
      $('div.container').append "<div class='alert alert-success'><h4>#{item.get 'title'}</h4><p>#{item.get 'message'}</p></div>"
    
    events: 'click button': 'addItem'
