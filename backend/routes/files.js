const Path = require("path");
const Fs = require("fs");

const files_dir = Path.join(__dirname, "..", "files");

if(!Fs.existsSync(files_dir)){ Fs.mkdirSync(files_dir); }

const files_handler = function(req, res) {
    res("get file list");
}

const upload_files_handler = function(req, res) {
    res("upload file");
}

const rename_files_handler = function(req, res) {
    res("rename file");
}

const delete_files_handler = function(req, res) {
    res("delete file");
}

const get_file_handler = function(req, res) {
    res("get file");
}

const copy_file_handler = function(req, res) {
    res("copy file");
}

const move_file_handler = function(req, res) {
    res("move file");
}

const routes = [{ method: "GET",    path: "/files",        handler: files_handler        },
                { method: "POST",   path: "/files",        handler: upload_files_handler },
                { method: "PUT",    path: "/files",        handler: rename_files_handler },
                { method: "DELETE", path: "/files",        handler: delete_files_handler },
                { method: "GET",    path: "/files/get",    handler: get_file_handler     },
                { method: "POST",   path: "/files/copy",   handler: copy_file_handler    },
                { method: "POST",   path: "/files/move",   handler: get_file_handler     }];

module.exports = routes;
