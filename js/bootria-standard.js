(function() {
  var photos, Photo, PhotoCollection, tweets, Tweet, TweetCollection, code

  code = {
    tweets: [
      '.thumbnails()',
      '  .loop({collection: photos}, function() {',
      '    this.thumbnail().tooltip("@title")',
      '      .img({src: "%http://farm<%= farm %>.staticflickr.com/<%= server %>/<%= id %>_<%= secret %>_s.jpg"})',
      '    .end();',
      '  })',
      '.end()'
    ].join("\n"),
    photos: [
      '.thumbnails()',
      '  .loop({collection: photos}, function() {',
      '    this.thumbnail().tooltip("@title")',
      '      .img({src: "%http://farm<%= farm %>.staticflickr.com/<%= server %>/<%= id %>_<%= secret %>_s.jpg"})',
      '    .end();',
      '  })',
      '.end()'
    ].join("\n")
  }
  
  // Set up tweets
  Tweet = Backbone.Model.extend({});
  TweetCollection = Backbone.Collection.extend({
    model: Tweet,
    url: 'http://search.twitter.com/search.json?q=javascript&rpp=5&callback=?',
    parse: function(response) {
      return response.results;
    }
  });
  tweets = new TweetCollection;
  
  // Set up flickr
  Photo = Backbone.Model.extend({});
  PhotoCollection = Backbone.Collection.extend({
    model: Photo,
    url: 'http://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=03bd859d1e721e9bc0920d33f759fc38&per_page=30&format=json&jsoncallback=?',
    parse: function(response) {
      return response.photos.photo;
    }
  });
  photos = new PhotoCollection;

  jQuery(function() {
    $("#bootria-content").bria()
      .navbar({cls: "navbar-fixed-top"})
        .brand({title: "BootRIA"})
        .item({title: "About",active: true})
        .dropdown({title: "Settings"})
          .item({title: "Profile"})
          .item({title: "Security"})
          .item({title: "System"})
          .divider()
          .item({title: "Logout"})
        .end()
      .end()
      .container()
        .hero()
          .heading("BootRIA", 2)
          .span("Build rich internet applications with Twitter Bootstrap")
        .end()
        .row()
          .div({cls: "span3"})
            .heading("JavaScript", 3)
            .p("BootRIA is written natively in JavaScript and runs on every browser.")
          .end()
          .div({cls: "span3"})
            .heading("Simple API", 3)
            .p("While being easy to use, BootRIA remains flexible and extensible.")
          .end()
          .div({cls: "span3"})
            .heading("Readability", 3)
            .p("While writing your Web Applications with BootRIA your code remains readable by design.")
          .end()
          .div({cls: "span3"})
            .heading("API-ready", 3)
            .p("Easily integrate your own or third party webservices like Twitter, Facebook and Flickr.")
          .end()
        .end()
        .heading("Alerts", 3)
        .row()
          .div({cls: "span3"})
            .alert({title: "Info",message: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est.",cls: "alert-info"})
          .end()
          .div({cls: "span3"})
            .alert({title: "Error",message: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est.",cls: "alert-error"})
          .end()
          .div({cls: "span3"})
            .alert({title: "Success",message: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est.",cls: "alert-success"})
          .end()
          .div({cls: "span3"})
            .alert({title: "Warning",message: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est."})
          .end()
        .end()
        .heading("Recent tweets about JavaScript", 3)
        .table({cls: "table-condensed"})
        .loop({collection: tweets,id: "tweets"}, function() {
          this.tr()
            .td()
              .span("@from_user").html(":")
            .end()
            .td()
              .span("@text")
            .end()
          .end();
        })
      .end()
      .btn({title: "Refresh", click: function() {
        bria.PackageView.getById("tweets").reload();
        return false;
      }})
      .heading("Behind the code", 4)
      .tag({tag: "pre",cls: "prettyprint linenums lang-js", text: code.tweets})
    .end()
    .container()
      .heading("Recent photos from flickr", 3)
        .thumbnails()
          .loop({collection: photos, id: "photos"}, function() {
            this.thumbnail().tooltip("@title")
              .img({src: "%http://farm<%= farm %>.staticflickr.com/<%= server %>/<%= id %>_<%= secret %>_s.jpg", width: 75, height: 75})
            .end();
          })
        .end()
        .btn({title: "Refresh", click: function() {
          bria.PackageView.getById("photos").reload();
          return false;
        }})
        .heading("Behind the code", 4)
        .tag({tag: "pre", cls: "prettyprint linenums lang-js", text: code.photos})
        .hero()
          .heading("BootRIA", 3)
          .span("Build rich internet applications with Twitter Bootstrap")
        .end()
      .end();
    
    // Set up prettyprint
    prettyPrint();
    
  });

}).call(this);
