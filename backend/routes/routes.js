/*
    Ficheiro central das routes,
    onde posso adicionar e remover como plugins.
*/

const index  = require("./index");
const static = require("./static");
const files  = require("./files");

var routes = [index, static];
routes.push.apply(routes, files);

module.exports = routes;
