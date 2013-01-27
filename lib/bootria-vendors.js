var briaBootstrap = {};

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  briaBootstrap.AlertView = (function(_super) {

    __extends(AlertView, _super);

    function AlertView() {
      return AlertView.__super__.constructor.apply(this, arguments);
    }

    AlertView.type = "alert";

    AlertView.prototype.options = {
      title: 'Title',
      message: 'Alert message',
      cls: '',
      close: false,
      heading: false
    };

    AlertView.prototype.template = '<div class="alert <%= cls %>">' + '<% if(close) { %><button type="button" class="close" data-dismiss="alert">&times;</button><% } %>' + '<% if(heading) { %>' + '<h4><%= title %></h4><p><%= message %></p>' + '<% }else{ %>' + '<p><strong><%= title %>:</strong>&nbsp;<%= message %></p>' + '<% } %>' + '</div>';

    return AlertView;

  })(bria.PackageView);

  bria.PackageView.prototype.alert = function(options) {
    return new briaBootstrap.AlertView(this.getOptions(this, options)).end();
  };

  briaBootstrap.ButtonGroupView = (function(_super) {

    __extends(ButtonGroupView, _super);

    function ButtonGroupView() {
      return ButtonGroupView.__super__.constructor.apply(this, arguments);
    }

    ButtonGroupView.type = "btn-group";

    ButtonGroupView.prototype.options = {
      cls: ''
    };

    ButtonGroupView.prototype.template = '<div class="btn-group <%= cls %>"></div>';

    return ButtonGroupView;

  })(bria.PackageView);

  bria.PackageView.prototype.btngroup = function(options) {
    return new briaBootstrap.ButtonGroupView(this.getOptions(this, options));
  };

  briaBootstrap.ButtonView = (function(_super) {

    __extends(ButtonView, _super);

    function ButtonView() {
      return ButtonView.__super__.constructor.apply(this, arguments);
    }

    ButtonView.type = "btn";

    ButtonView.prototype.options = {
      title: 'Title',
      href: '#',
      cls: '',
      target: '_top',
      click: null
    };

    ButtonView.prototype.template = '<a class="btn <%= cls %>" target="<%= target %>" href="<%= href %>"><%= title %></a>';

    ButtonView.prototype.initialize = function(options) {
      ButtonView.__super__.initialize.call(this);
      if (options.click) {
        return this.options.el.click(this.options.click);
      }
    };

    return ButtonView;

  })(bria.PackageView);

  bria.PackageView.prototype.btn = function(options) {
    return new briaBootstrap.ButtonView(this.getOptions(this, options)).end();
  };

  briaBootstrap.DropdownView = (function(_super) {

    __extends(DropdownView, _super);

    function DropdownView() {
      return DropdownView.__super__.constructor.apply(this, arguments);
    }

    DropdownView.type = "dropdown";

    DropdownView.prototype.options = {
      role: 'menu',
      labelledby: 'dropdownMenu'
    };

    DropdownView.prototype.template = '<ul class="dropdown-menu" role="<%= role %>" aria-labelledby="<%= labelledby %>"></ul>';

    DropdownView.prototype.item = function(options) {
      return new briaBootstrap.DropdownItemView(this.getOptions(this, options)).end();
    };

    DropdownView.prototype.divider = function() {
      return new briaBootstrap.DropdownDividerView(this.getOptions(this, options)).end();
    };

    return DropdownView;

  })(bria.PackageView);

  briaBootstrap.DropdownItemView = (function(_super) {

    __extends(DropdownItemView, _super);

    function DropdownItemView() {
      return DropdownItemView.__super__.constructor.apply(this, arguments);
    }

    DropdownItemView.type = "dropdown-item";

    DropdownItemView.prototype.options = {
      title: 'Menu entry',
      href: "#",
      tabindex: -1
    };

    DropdownItemView.prototype.template = '<li><a tabindex="<%= tabindex %>" href="<%= href %>"><%= title %></a></li>';

    return DropdownItemView;

  })(bria.PackageView);

  briaBootstrap.DropdownDividerView = (function(_super) {

    __extends(DropdownDividerView, _super);

    function DropdownDividerView() {
      return DropdownDividerView.__super__.constructor.apply(this, arguments);
    }

    DropdownDividerView.type = "dropdown-divider";

    DropdownDividerView.prototype.options = {};

    DropdownDividerView.prototype.template = '<li class="divider"></li>';

    return DropdownDividerView;

  })(bria.PackageView);

  bria.PackageView.prototype.dropdown = function(options) {
    return new briaBootstrap.DropdownView(this.getOptions(this, options));
  };

  briaBootstrap.HeroView = (function(_super) {

    __extends(HeroView, _super);

    function HeroView() {
      return HeroView.__super__.constructor.apply(this, arguments);
    }

    HeroView.type = "hero-unit";

    HeroView.prototype.options = {
      image: false
    };

    HeroView.prototype.template = '<div class="hero-unit"<% if(image){ %> style="background: url(<%= image %>) repeat top left; border-radius: 0px;"<% } %>></div>';

    return HeroView;

  })(bria.PackageView);

  bria.PackageView.prototype.hero = function(options) {
    return new briaBootstrap.HeroView(this.getOptions(this, options));
  };

  briaBootstrap.NavbarView = (function(_super) {

    __extends(NavbarView, _super);

    function NavbarView() {
      return NavbarView.__super__.constructor.apply(this, arguments);
    }

    NavbarView.type = "navbar";

    NavbarView.prototype.options = {
      cls: '',
      responsive: false
    };

    NavbarView.prototype.template = '<div class="navbar <%= cls %>">' + '<div class="navbar-inner">' + '<div class="container">' + '<% if(responsive) { %>' + '<a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">' + '<span class="icon-bar"></span>' + '<span class="icon-bar"></span>' + '<span class="icon-bar"></span>' + '</a>' + '<% } %>' + '<ul class="nav"></ul>' + '</div>' + '</div>' + '</div>';

    NavbarView.prototype.brand = function(options) {
      options = this.getOptions(this, options);
      options.el = $(this.options.el).find("ul.nav");
      return new briaBootstrap.NavbarBrandView(options).end();
    };

    NavbarView.prototype.item = function(options) {
      options = this.getOptions(this, options);
      options.el = $(this.options.el).find("ul.nav");
      return new briaBootstrap.NavbarItemView(options).end();
    };

    NavbarView.prototype.divider = function() {
      var options;
      options = this.getOptions(this, options);
      options.el = $(this.options.el).find("ul.nav");
      return new briaBootstrap.NavbarDividerView(options).end();
    };

    NavbarView.prototype.dropdown = function(options) {
      options = this.getOptions(this, options);
      options.el = $(this.options.el).find("ul.nav");
      return new briaBootstrap.NavbarDropdownView(options);
    };

    return NavbarView;

  })(bria.PackageView);

  briaBootstrap.NavbarBrandView = (function(_super) {

    __extends(NavbarBrandView, _super);

    function NavbarBrandView() {
      return NavbarBrandView.__super__.constructor.apply(this, arguments);
    }

    NavbarBrandView.type = "navbar-brand";

    NavbarBrandView.prototype.options = {
      title: 'Home',
      href: "#"
    };

    NavbarBrandView.prototype.template = '<a class="brand" href="<%= href %>"><%= title %></a>';

    return NavbarBrandView;

  })(bria.PackageView);

  briaBootstrap.NavbarItemView = (function(_super) {

    __extends(NavbarItemView, _super);

    function NavbarItemView() {
      return NavbarItemView.__super__.constructor.apply(this, arguments);
    }

    NavbarItemView.type = "navbar-item";

    NavbarItemView.prototype.options = {
      title: 'Menu entry',
      href: "#",
      active: false
    };

    NavbarItemView.prototype.template = '<li<% if(active) { %> class="active"<% } %>>' + '<a href="<%= href %>"><%= title %></a>' + '</li>';

    return NavbarItemView;

  })(bria.PackageView);

  briaBootstrap.NavbarDividerView = (function(_super) {

    __extends(NavbarDividerView, _super);

    function NavbarDividerView() {
      return NavbarDividerView.__super__.constructor.apply(this, arguments);
    }

    NavbarDividerView.type = "navbar divider";

    NavbarDividerView.prototype.options = {};

    NavbarDividerView.prototype.template = '<li class="divider-vertical"></li>';

    return NavbarDividerView;

  })(bria.PackageView);

  briaBootstrap.NavbarDropdownView = (function(_super) {

    __extends(NavbarDropdownView, _super);

    function NavbarDropdownView() {
      return NavbarDropdownView.__super__.constructor.apply(this, arguments);
    }

    NavbarDropdownView.type = "navbar-dropdown";

    NavbarDropdownView.prototype.options = {
      title: 'Menu entry',
      role: 'menu',
      labelledby: 'dropdownMenu'
    };

    NavbarDropdownView.prototype.template = '<li class="dropdown">' + '<a class="dropdown-toggle" href="#" data-toggle="dropdown">' + '<%= title %>&nbsp;<b class="caret"></b>' + '</a>' + '<ul class="dropdown-menu" role="<%= role %>" aria-labelledby="<%= labelledby %>"></ul>' + '</li>';

    NavbarDropdownView.prototype.item = function(options) {
      options = this.getOptions(this, options);
      options.el = this.options.el.find("ul.dropdown-menu");
      return new briaBootstrap.DropdownItemView(options).end();
    };

    NavbarDropdownView.prototype.divider = function() {
      var options;
      options = this.getOptions(this, options);
      options.el = this.options.el.find("ul.dropdown-menu");
      return new briaBootstrap.DropdownDividerView(options).end();
    };

    return NavbarDropdownView;

  })(bria.PackageView);

  bria.PackageView.prototype.navbar = function(options) {
    return new briaBootstrap.NavbarView(this.getOptions(this, options));
  };

  briaBootstrap.TableView = (function(_super) {

    __extends(TableView, _super);

    function TableView() {
      return TableView.__super__.constructor.apply(this, arguments);
    }

    TableView.type = "table";

    TableView.prototype.options = {
      cls: ''
    };

    TableView.prototype.template = '<table class="table <%= cls %>"></table>';

    TableView.prototype.tr = function(options) {
      return new briaBootstrap.TableRowView(this.getOptions(this, options));
    };

    return TableView;

  })(bria.PackageView);

  briaBootstrap.TableRowView = (function(_super) {

    __extends(TableRowView, _super);

    function TableRowView() {
      return TableRowView.__super__.constructor.apply(this, arguments);
    }

    TableRowView.type = "table-row";

    TableRowView.prototype.options = {
      cls: ''
    };

    TableRowView.prototype.template = '<tr<% if(cls){ %> class="<%= cls %>"<% } %>></tr>';

    TableRowView.prototype.td = function(options) {
      return new briaBootstrap.TableCellView(this.getOptions(this, options));
    };

    return TableRowView;

  })(bria.PackageView);

  briaBootstrap.TableCellView = (function(_super) {

    __extends(TableCellView, _super);

    function TableCellView() {
      return TableCellView.__super__.constructor.apply(this, arguments);
    }

    TableCellView.type = "table-cell";

    TableCellView.prototype.options = {};

    TableCellView.prototype.template = '<td></td>';

    return TableCellView;

  })(bria.PackageView);

  bria.PackageView.prototype.table = function(options) {
    return new briaBootstrap.TableView(this.getOptions(this, options));
  };

  briaBootstrap.ThumbnailsView = (function(_super) {

    __extends(ThumbnailsView, _super);

    function ThumbnailsView() {
      return ThumbnailsView.__super__.constructor.apply(this, arguments);
    }

    ThumbnailsView.type = "thumbnails list";

    ThumbnailsView.prototype.options = {};

    ThumbnailsView.prototype.template = '<ul class="thumbnails"></ul>';

    ThumbnailsView.prototype.thumbnail = function(options) {
      return new briaBootstrap.ThumbnailView(this.getOptions(this, options));
    };

    return ThumbnailsView;

  })(bria.PackageView);

  briaBootstrap.ThumbnailView = (function(_super) {

    __extends(ThumbnailView, _super);

    function ThumbnailView() {
      return ThumbnailView.__super__.constructor.apply(this, arguments);
    }

    ThumbnailView.type = "thumbnail";

    ThumbnailView.prototype.options = {
      cls: ''
    };

    ThumbnailView.prototype.template = '<li class="thumbnail <%= cls %>"></li>';

    ThumbnailView.prototype.caption = function(options) {
      return new briaBootstrap.ThumbnailCaptionView(this.getOptions(this, options));
    };

    return ThumbnailView;

  })(bria.PackageView);

  briaBootstrap.ThumbnailCaptionView = (function(_super) {

    __extends(ThumbnailCaptionView, _super);

    function ThumbnailCaptionView() {
      return ThumbnailCaptionView.__super__.constructor.apply(this, arguments);
    }

    ThumbnailCaptionView.type = "thumbnail caption";

    ThumbnailCaptionView.prototype.options = {
      cls: ''
    };

    ThumbnailCaptionView.prototype.template = '<div class="caption <%= cls %>"></div>';

    return ThumbnailCaptionView;

  })(bria.PackageView);

  bria.PackageView.prototype.thumbnails = function(options) {
    return new briaBootstrap.ThumbnailsView(this.getOptions(this, options));
  };

}).call(this);
