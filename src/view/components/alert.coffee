  class AlertView extends PackageView
    template: 'alert'
    options: {title: 'Title', message: 'Alert message', style: ''}
    template: '<div class="alert<% if(style) { %> alert-<%= style %><% } %>">'+
                '<h4><%= title %></h4>'+
                '<p><%= message %></p>'+
              '</div>'
