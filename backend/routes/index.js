const Path = require("path");
const index = Path.join(__dirname, "..", "frontend", "index.html");
module.exports = {method: "GET", path: "/", handler: { file: index } };
