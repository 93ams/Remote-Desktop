/*
    Ficheiro central das routes,
    onde posso adicionar e remover como plugins,
    configurando no ficheiro ../config/routes_config.js.
*/
const Path = require("path");
const routes_config = require(Path.join(__dirname, "..", "config", "routes_config.js"));
var routes = [];
for(var i = 0; i < routes_config.routes.length; i++){
    var route = routes_config.routes[i];
    /* console.log("Adding route: " + route.name); */
    if(route.many == "true") { routes.push.apply(routes, require(route.path)); }
    else { routes.push(require(route.path)); }
}

module.exports = routes;
