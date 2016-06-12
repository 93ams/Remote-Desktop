const Path = require("path");
const Fs = require("fs");

const files_path = Path.join(__dirname, "..", "files");
const music_dir = Path.join("Audio", "Music");
const absolute_path = Path.join(files_path, music_dir);
if(!Fs.existsSync(absolute_path)){ Fs.mkdirSync(absolute_path); }

var bands = {};

const read_file = function(band, album, file){
    const file_path = Path.join(band, album, file);
    if (!Fs.lstatSync(Path.join(absolute_path, file_path)).isDirectory()) {
        var ext = Path.extname(file);
        if(ext == ".mp3"){
            bands[band].albums[album].songs.push({
                name: file,
                path: file_path,
                number: bands[band].albums[album].songs.length
            });
        } else if(ext == ".png" || ext == ".jpg"){
            console.log("cover" + ext);
            if(file == ("cover" + ext)){
                bands[band].albums[album].cover = file_path;
            } else {

            }
        }
    } else {

    }
}

const read_album = function(band, album){
    const path = Path.join(absolute_path,band,album);
    if (Fs.lstatSync(path).isDirectory()) {
        bands[band].albums[album] = {
            name: album,
            songs: []
        }
        Fs.readdir(path, function (err, files) {
            if (err) throw err;
            files.forEach(function(file){ read_file(band,album,file); });
        });
    } else {

    }
}

const read_band = function(band){
    const path = Path.join(absolute_path,band);
    bands[band] = {
        name: band,
        albums: {}
    };
    if (Fs.lstatSync(path).isDirectory()) {
        Fs.readdir(path, function (err, files) {
            if (err) throw err;
            files.forEach(function(file){ read_album(band,file); });
        });
    } else {

    }
}

Fs.readdir(absolute_path, function (err, files) {
    if (err) throw err;
    files.forEach(function(file){ read_band(file); });
});


const bands_handler = function(req, res){
    res(JSON.stringify(bands));
}

const band_handler = function(req, res){
    console.log(req.params);
    console.log(bands);
    var band = bands[req.params.band];
    console.log("Band:" + band);
    if(band){
        res(JSON.stringify(band));
    } else {
        res({ "code": 404 });
    }
}

const album_handler = function(req, res){
    console.log(req.params);
    console.log(bands);
    var band = bands[req.params.band];
    console.log("Band:" + band);
    if(band){
        var album = band.albums[req.params.album];
        console.log("Album: " +  album);
        if(album){
            res(JSON.stringify(album));
        } else {
            res({ "code": 404 });
        }
    } else {
        res({ "code": 404 });
    }
}

const song_handler = function(req, res){
    console.log(req.params);
    var band = bands[req.params.band];
    console.log("Band:" + band);
    if(band){
        var album = band.albums[req.params.album];
        console.log("Album: " +  album);
        if(album){
            var song = album.songs[req.params.song];
            console.log("Song: "+ song);
            if(song){
                res(JSON.stringify(song));
            } else {
                res({ "code": 404 });
            }
        } else {
            res({ "code": 404 });
        }
    } else {
        res({ "code": 404 });
    }
}

module.exports = [{method: "GET", path: "/music/bands", handler: bands_handler },
                  {method: "GET", path: "/music/bands/{band}", handler: band_handler },
                  {method: "GET", path: "/music/bands/{band}/{album}", handler: album_handler },
                  {method: "GET", path: "/music/bands/{band}/{album}/{song}", handler: song_handler }];
