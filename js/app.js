(function($) {


var Map = Backbone.Model.extend({

    initialize:function(mapUnits) {

        title = mapUnits.name
        thumb = "http://a.tiles.mapbox.com/v3/"+mapUnits.id+"/thumb.png";
        description = mapUnits.description
        download = "'"+mapUnits.download+"'"
        center = mapUnits.center;
        console.log(title)

        var compiled = _.template($("#templ").html());
        uservalue = "#"+$('.user-text').val()
        $(uservalue).append(compiled());

    }
});
 
var mapList = Backbone.Collection.extend({
    initialize: function(){
        this.bind("add", function( model ){
            view.render( model );
        })
    },
    model: Map,
    sync: function(method, model, options) {
        var params = _.extend({
            type: 'GET',
            dataType: 'jsonp',
            url: model.url(),
        }, options);
        return $.ajax(params);
    },
    parse: function(response) {
        return response;
    },
 
    url: function() {
        return "http://api.tiles.mapbox.com/v3/"+$('.user-text').val()+"/tilesets.json";
    }
});

var MapView = Backbone.View.extend({

    tagName: 'li',

    events: {
        'click #submit':  'getUser',
    },

    initialize: function() {
        this.mapList = new mapList;
        _.bindAll(this, 'render');
    }, 

    getUser: function() {
        var userName = $('.user-text').val();
        this.mapList.add( {user: userName} );
    },

    render: function( model ) {

        $(".nav-tabs").append("<li><a href='#user/"+ model.get("user")+"'><a href='#"+ model.get("user")+"'  data-toggle='tab'>"+ model.get("user")+"</a></a></li>");

        $(".tab-content").append("</a><div class='tab-pane' id='"+model.get("user")+"'><h3>Maps by: "+model.get("user")+"</h3></div>");



        s = new mapList().fetch();;
    },

});


var Router = Backbone.Router.extend({
    
    // routes configuration
    routes: {
        'user/:id' : 'defaultUser'
    },
    
    
    
});

var view = new MapView({el: 'html'});
var router = new Router();
Backbone.history.start();

})(jQuery);