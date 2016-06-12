const routes = [
        {
            "name": "Index",
            "path": "./index"
        }, {
            "name": "static",
            "path": "./static"
        }, {
            "name": "Files",
            "path": "./files",
            "many": "true"
        }, {
            "name": "Movies",
            "path": "./movies",
            "many": "false"
        }, {
            "name": "Music",
            "path": "./music",
            "many": "true"
        }
    ]

module.exports = {
    routes: routes
}
