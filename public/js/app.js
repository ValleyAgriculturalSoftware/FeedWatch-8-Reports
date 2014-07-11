App = Ember.Application.create({});

App.Router.map(function() {
  this.resource('reports', function() {
    this.resource('report', { path: ':report_filename' });
  });
});

App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    return App.Reports.all();
  }
});

App.ReportsRoute = Ember.Route.extend({
  model: function() {
    return App.Reports.all();
  },

  renderTemplate: function() {
    this.render({ outlet: 'sidebar' });
  }
});

App.ReportRoute = Ember.Route.extend({
  model: function(params) {
    return this.modelFor('reports').findBy('filename', params.report_filename);
  }
});

App.SiderbarView = Ember.View.extend({
model: function() {
    return App.Reports.all();
  },
});

App.Reports = Ember.Object.extend();

App.Reports.reopenClass({
  all: function() {
      return $.getJSON("/FeedWatch-8-Reports/public/reports.json").then(function(response) {
        var items = [];
 
        response.forEach( function (item) {
          items.push( App.Reports.create(item) );
        });
 
          return items;
      });
  }
});
