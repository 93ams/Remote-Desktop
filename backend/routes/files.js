const Path = require("path");
const Fs = require("fs");

const files_dir = Path.join(__dirname, "..", "files");

if(!Fs.existsSync(files_dir)){ Fs.mkdirSync(files_dir); }
