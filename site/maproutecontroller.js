// Used for everything under the prefix.
exports.mapRoute = function(app, prefix) {
    prefix = '/' + prefix;
    var prefixObj = require('./controllers/' + prefix);

    // index
    app.get(prefix, prefixObj.index);

    // add
    app.get(prefix + '/new', prefixObj.new);
    
    // pre-delete 
    app.get(prefix + '/delete', prefixObj.delete);

    // destroy
    app.del(prefix + '/:id', prefixObj.destroy);

    // create
    app.post(prefix + '/create', prefixObj.create);

    // edit
    app.get(prefix + '/:id/edit', prefixObj.edit);

    // list 
    app.get(prefix + '/list', prefixObj.list);
    
    // update
    app.put(prefix + '/:id', prefixObj.update);

    // detail page 
    app.get(prefix + '/:id', prefixObj.show);
};

