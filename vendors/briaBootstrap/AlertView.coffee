class briaBootstrap.AlertView extends bria.PackageView
  @type: "alert"
  options: {
    title: 'Title',
    message: 'Alert message',
    cls: '',
    close: false,
    heading: false
  }
  template: '<div class="alert <%= cls %>">'+
              '<% if(close) { %><button type="button" class="close" data-dismiss="alert">&times;</button><% } %>'+
              '<% if(heading) { %>'+
                '<h4><%= title %></h4><p><%= message %></p>'+
              '<% }else{ %>'+
                '<p><strong><%= title %>:</strong>&nbsp;<%= message %></p>'+
              '<% } %>'+
            '</div>'
              
# Composer function
bria.PackageView.prototype.alert = (options)->
  return new briaBootstrap.AlertView(@getOptions(@, options)).end()
