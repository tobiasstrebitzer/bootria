var bria = {'Html':{},'Structure':{}};

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

bria.PackageView = (function(_super) {

  __extends(PackageView, _super);

  function PackageView() {
    return PackageView.__super__.constructor.apply(this, arguments);
  }

  PackageView.type = "package";

  PackageView.index = {};

  PackageView.prototype.id = null;

  PackageView.prototype.template = false;

  PackageView.prototype.options = {
    el: $('body'),
    model: null,
    parentView: null
  };

  PackageView.prototype.html = null;

  PackageView.prototype.collection = null;

  PackageView.prototype.initialize = function(options) {
    _.bindAll(this);
    $.briaData.depth++;
    $.briaData.log(this);
    if (this.options.id) {
      bria.PackageView.index[this.options.id] = this;
    }
    return this.render();
  };

  PackageView.prototype.render = function() {
    var defaultOptions, html, options, self;
    if (this.template) {
      self = this;
      options = this.options;
      defaultOptions = this.constructor.prototype.options;
      if (options.model) {
        _.each(defaultOptions, function(value, key) {
          if (_.isFunction(options[key])) {
            return options[key] = options[key](options.model);
          } else if (typeof options[key] === "string") {
            return options[key] = self.parseValue(options[key]);
          }
        });
      }
      html = $(_.template(this.template, options));
      $(this.options.el).append(html);
      return this.options.el = html;
    }
  };

  PackageView.prototype.parseValue = function(text) {
    var operator, value;
    operator = text.substr(0, 1);
    value = text.substr(1);
    if (operator === "@") {
      return this.options.model.get(value);
    } else if (operator === "%") {
      return _.template(value, this.options.model.attributes);
    }
    return text;
  };

  PackageView.prototype.getOptions = function(scope, options) {
    var _ref;
    if (options == null) {
      options = {};
    }
    options.parentView = scope;
    options.el = scope.options.el;
    if ((_ref = options.model) == null) {
      options.model = scope.options.model;
    }
    return options;
  };

  PackageView.prototype.end = function() {
    $.briaData.depth--;
    return this.options.parentView;
  };

  PackageView.prototype.tooltip = function(text) {
    $(this.options.el).tooltip({
      title: this.parseValue(text)
    });
    return this;
  };

  PackageView.prototype.html = function(html) {
    $(this.options.el).append(html);
    return this;
  };

  PackageView.prototype.hr = function() {
    this.html("<hr />");
    return this;
  };

  PackageView.prototype.heading = function(title, level) {
    if (level == null) {
      level = 1;
    }
    this.html("<h" + level + ">" + title + "</h" + level + ">");
    return this;
  };

  PackageView.prototype.container = function() {
    return this.div({
      cls: "container"
    });
  };

  PackageView.prototype.row = function() {
    return this.div({
      cls: "row"
    });
  };

  PackageView.getById = function(id) {
    return bria.PackageView.index[id];
  };

  return PackageView;

})(Backbone.View);

jQuery(_ > ($.briaData = {
  depth: 0,
  indent: "",
  debugInfo: "",
  log: function(object) {
    var text;
    text = object.constructor.type;
    if (object.options.id) {
      text += "#" + object.options.id;
    } else if (object.options.cls) {
      text += "." + object.options.cls;
    }
    return $.briaData.debugInfo += new Array($.briaData.depth * 2).join(' ') + text + "\n";
  }
}));

$.fn.extend({
  bria: function(options) {
    var settings;
    settings = {
      id: null,
      virtual: false
    };
    settings = $.extend(settings, options);
    settings.el = this[0];
    return new bria.RootView(settings);
  }
});

bria.Html.DivView = (function(_super) {

  __extends(DivView, _super);

  function DivView() {
    return DivView.__super__.constructor.apply(this, arguments);
  }

  DivView.type = "div";

  DivView.prototype.options = {
    cls: ''
  };

  DivView.prototype.template = '<div <% if(cls){ %>class="<%= cls %>"<% } %>></div>';

  return DivView;

})(bria.PackageView);

bria.PackageView.prototype.div = function(options) {
  return new bria.Html.DivView(this.getOptions(this, options));
};

bria.Html.ImageView = (function(_super) {

  __extends(ImageView, _super);

  function ImageView() {
    return ImageView.__super__.constructor.apply(this, arguments);
  }

  ImageView.type = "img";

  ImageView.prototype.options = {
    src: '',
    alt: '',
    width: null,
    height: null
  };

  ImageView.prototype.template = '<img src="<%= src %>" alt="<%= alt %>" <% if(width||height){ %>style="<% if(width){ %>width:<%= width %>px;<% } %><% if(height){ %>height:<%= height %>px;<% } %>"<% } %> />';

  return ImageView;

})(bria.PackageView);

bria.PackageView.prototype.img = function(options) {
  return new bria.Html.ImageView(this.getOptions(this, options)).end();
};

bria.Html.PView = (function(_super) {

  __extends(PView, _super);

  function PView() {
    return PView.__super__.constructor.apply(this, arguments);
  }

  PView.type = "p";

  PView.prototype.options = {
    cls: ''
  };

  PView.prototype.template = '<p<% if(cls) { %> class="<%= cls %>"<% } %>></p>';

  return PView;

})(bria.PackageView);

bria.PackageView.prototype.p = function(options) {
  return new bria.Html.PView(this.getOptions(this, options));
};

bria.Html.TagView = (function(_super) {

  __extends(TagView, _super);

  function TagView() {
    return TagView.__super__.constructor.apply(this, arguments);
  }

  TagView.type = "tag";

  TagView.prototype.options = {
    cls: '',
    tag: "span",
    text: ''
  };

  TagView.prototype.template = '<% if(tag){ %>' + '<<%= tag %><% if(cls) { %> class="<%= cls %>"<% } %>>' + '<% } %>' + '<%= text %>' + '<% if(tag){ %>' + '</<%= tag %>>' + '<% } %>';

  return TagView;

})(bria.PackageView);

bria.PackageView.prototype.tag = function(options) {
  var result;
  result = new bria.Html.TagView(this.getOptions(this, options));
  if (options.text) {
    return result.end();
  } else {
    return result;
  }
};

bria.PackageView.prototype.span = function(options) {
  if (typeof options === "string") {
    return this.tag({
      text: options,
      tag: "span"
    });
  } else {
    return this.tag(options);
  }
};

bria.PackageView.prototype.p = function(options) {
  if (typeof options === "string") {
    return this.tag({
      text: options,
      tag: "p"
    });
  } else {
    return this.tag(options);
  }
};

bria.RootView = (function(_super) {

  __extends(RootView, _super);

  function RootView() {
    return RootView.__super__.constructor.apply(this, arguments);
  }

  RootView.type = "root";

  RootView.prototype.initialize = function() {
    return _.bindAll(this);
  };

  return RootView;

})(bria.PackageView);

bria.Structure.Loop = (function(_super) {

  __extends(Loop, _super);

  function Loop() {
    return Loop.__super__.constructor.apply(this, arguments);
  }

  Loop.type = "loop";

  Loop.prototype.options = {
    count: null,
    skip: 0,
    collection: null
  };

  Loop.prototype.initialize = function() {
    Loop.__super__.initialize.call(this);
    return this.reload();
  };

  Loop.prototype.reload = function() {
    var options;
    options = this.options;
    if (options.collection) {
      options.parentView.options.el.fadeTo(500, 0.1);
      return options.collection.fetch({
        success: function() {
          var i, _i, _ref, _ref1;
          options.parentView.options.el.html("");
          if ((!options.count) || (options.count && options.skip + options.count > options.collection.length)) {
            options.count = options.collection.length - options.skip;
          }
          for (i = _i = _ref = options.skip, _ref1 = options.count + options.skip; _ref <= _ref1 ? _i < _ref1 : _i > _ref1; i = _ref <= _ref1 ? ++_i : --_i) {
            options.parentView.options.model = options.collection.models[i];
            options.compose.apply(options.parentView);
          }
          return options.parentView.options.el.fadeTo(500, 1);
        }
      });
    }
  };

  Loop.prototype.end = function() {
    $.briaData.depth--;
    return this.options.parentView;
  };

  return Loop;

})(bria.PackageView);

bria.PackageView.prototype.loop = function(options, compose) {
  options.compose = compose;
  new bria.Structure.Loop(this.getOptions(this, options));
  return this;
};
