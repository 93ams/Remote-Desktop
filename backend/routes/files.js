/*
    Ficheiro de routes e handlers dos ficheiros dinamicos.
*/

const Path = require("path");
const Fs = require("fs");
const Mime = require("mime");

const files_dir = Path.join(__dirname, "..", "files");
// Cria pasta de files, caso não exista
if(!Fs.existsSync(files_dir)){ Fs.mkdirSync(files_dir); }
//TODO: buscar settings e criar o resto das pastas de base


// Utils

//Verifica se o caminho tem ".." para evitar porcaria
const checkForCheating = function(path){
    if(path!=null){
        var aux = path.split('/');
        return (aux.indexOf('..') == -1);
    }
}

const rmdir = function(dir_path){
    if( Fs.existsSync(dir_path) ) {
        Fs.readdirSync(dir_path).forEach(function(file){
            var file_path = Path.join(dir_path, file);
            if(Fs.lstatSync(file_path).isDirectory()) { rmdir(file_path); }
            else { Fs.unlinkSync(file_path); }
        });
        Fs.rmdirSync(dir_path);
    }
}

// Handlers

const files_handler = function(req, res) {
    var absolute_path = files_dir;
    var path = req.query.path || "";

    if(checkForCheating(path))
        absolute_path = Path.join(files_dir, path);

    if (Fs.existsSync(absolute_path)) {
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
    } else {
        res({ code: 404 });
    }
}

const upload_files_handler = function(req, res) {
    var absolute_path = files_dir;
    var data = req.payload;
    var path = data.path;
    var overwrite = data.overwrite;
    var file = data.file;
    if(file){
        var file_name = file.hapi.filename;
        var file_path = Path.join(path, file_name);
        if(checkForCheating(file_path)){
            absolute_path = Path.join(absolute_path, file_path);
            if(Fs.existsSync(absolute_path) && overwrite == "false"){
                res({ code: 409, name: file_name });
            } else {
                var pipe = Fs.createWriteStream(absolute_path);
                pipe.on('error', (err) => {
                    if(err) throw err;
                });
                file.pipe(pipe);
                file.on('end', function (err) {
                    if(err) throw err;
                    var ext = Path.extname(file_name);
                    var response = { name: file_name, ext: ext, isDirectory: false, path: path };
                    res({ code: 200, file: response });
                });
            }
        }
    }
}

const rename_files_handler = function(req, res) {
    var absolute_path = files_dir;
    var data = req.payload;
    var file_name = data.file;
    var new_name = data.name;
    var old_path = Path.join(data.path, file_name);
    var new_path = Path.join(data.path, new_name);
    if(checkForCheating(old_path) && checkForCheating(new_path)){
        old_path = Path.join(absolute_path, old_path);
        new_path = Path.join(absolute_path, new_path);
        if(Fs.existsSync(new_path)){
            res({ code: 409 });
        } else {
            Fs.renameSync(old_path, new_path);
            res({ code: 200 });
        }
    }
}

const delete_files_handler = function(req, res) {
    var path = req.query.path || "";
    var file = req.query.file;
    var file_path = Path.join(path, file);
    if(checkForCheating(file_path)){
        var absolute_path = Path.join(files_dir, file_path);
        if (Fs.existsSync(absolute_path)) {
            if(Fs.lstatSync(absolute_path).isDirectory()){ rmdir(absolute_path); }
            else { Fs.unlinkSync(absolute_path); }
            res({ code: 200, name: file });
        } else {
            res({ code: 404 });
        }
    }
}

const get_file_handler = function(req, res) {
    var path = req.query.path || "";
    var file = req.query.file;
    var file_path = Path.join(path, file);
    if(checkForCheating(file_path)){
        var absolute_path = Path.join(files_dir, file_path);
        if (Fs.existsSync(absolute_path)) {
            Fs.readFile(absolute_path, function(err, data){
                if(err) throw err;
                res(data).header('Content-Type', Mime.lookup(file))
                         .header("Content-Disposition", "attachment; filename=" + file)
            });
        } else {
            res({ code: 404 });
        }
    }
}

const copy_file_handler = function(req, res) {
    res("copy file");
}

const move_file_handler = function(req, res) {
    res("move file");
}

const new_dir_handler = function(req, res) {
    var absolute_path = files_dir;
    var data = req.payload;
    var path = data.path || "";
    var name = data.name;
    var dir_path = Path.join(path, name);
    if(checkForCheating(dir_path)){
        absolute_path = Path.join(absolute_path, dir_path);
        if(Fs.existsSync(absolute_path)){
            res({ code: 409 });
        } else {
            Fs.mkdirSync(absolute_path);
            res({ code: 200, file: { name: name, isDirectory: true, path: path } });
        }
    }
}

const routes = [{ method: "GET",    path: "/files",          handler: files_handler        },
                { method: "POST",   path: "/files",          config: { handler: upload_files_handler,
                  payload: { output: 'stream', parse: true, allow: 'multipart/form-data' }}},
                { method: "PUT",    path: "/files",          handler: rename_files_handler },
                { method: "DELETE", path: "/files",          handler: delete_files_handler },
                { method: "GET",    path: "/files/get",      handler: get_file_handler     },
                { method: "POST",   path: "/files/copy",     handler: copy_file_handler    },
                { method: "POST",   path: "/files/move",     handler: get_file_handler     },
                { method: "POST",   path: "/files/newdir",   handler: new_dir_handler     }];

module.exports = routes;
