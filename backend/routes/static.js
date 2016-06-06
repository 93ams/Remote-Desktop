/*
    Ficheiro de routes e handler dos ficheiros estaticos.
*/
var Path = require("path");
const static_dir = Path.join(__dirname, "..", "frontend", "public", "static");
module.exports = {method: "GET", path: "/{param*}", handler: { directory: { path: static_dir } } };
