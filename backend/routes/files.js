/*
    Ficheiro de routes e handlers dos ficheiros dinamicos.
*/

const Path = require("path");
const Fs = require("fs");

const files_dir = Path.join(__dirname, "..", "files");
// Cria pasta de files, caso não exista
if(!Fs.existsSync(files_dir)){ Fs.mkdirSync(files_dir); }

// Utils

//Verifica se o caminho tem ".." para evitar porcaria
const checkForCheating = function(path){
    var aux = path.split('/');
    return (aux.indexOf('..') == -1);
}

// Handlers

const files_handler = function(req, res) {
    var absolute_path = files_dir;
    var path = req.query.path || "";

    if(checkForCheating(path))
        absolute_path = Path.join(files_dir, path);

    Fs.readdir(absolute_path, function (err, files) {
        if (err) throw err;

        var data = [];
        files.forEach(function(file){
            if (Fs.lstatSync(Path.join(absolute_path,file)).isDirectory()) {
                data.push({ name: file, isDirectory: true, path: path });
            } else {
                var ext = Path.extname(file);
                data.push({ name: file, ext: ext, isDirectory: false, path: path });
            }
        });
        res({ code: 200, files: data });
    });
}

const upload_files_handler = function(req, res) {
    var absolute_path = files_dir;
    var path = req.query.path || "";

    if(checkForCheating(path)){
        
    }

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
