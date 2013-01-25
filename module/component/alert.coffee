  # Module logic
  class AlertView extends PackageView
    options: {
      title: 'Title',
      message: 'Alert message',
      style: '',
      close: true,
      heading: false
    }
    template: '<div class="alert<% if(style) { %> alert-<%= style %><% } %>">'+
                '<% if(close) { %><button type="button" class="close" data-dismiss="alert">&times;</button><% } %>'+
                '<% if(heading) { %>'+
                  '<h4><%= title %></h4><p><%= message %></p>'+
                '<% }else{ %>'+
                  '<p><strong><%= title %>:</strong>&nbsp;<%= message %></p>'+
                '<% } %>'+
              '</div>'
              
  # Composer function
  PackageView.prototype.alert = (options)->
    options.parentView = @
    options.el = @el
    result = new AlertView options
    return @
