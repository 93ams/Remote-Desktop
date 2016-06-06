var Path = require("path");
const public_dir = Path.join(__dirname, "..", "frontend", "public");
module.exports = {method: "GET", path: "/{param*}", handler: { directory: { path: public_dir } } };
