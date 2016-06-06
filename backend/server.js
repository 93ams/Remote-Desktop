'use strict';
const Hapi = require("hapi");
const Inert = require('inert');

const routes = require("./routes/routes");

const server = new Hapi.Server();

server.connection({ host: "localhost", port: 8080 });

server.register(Inert, (err) => { if (err) throw err; });

server.route(routes);

server.start((err) => {
    if (err) throw err;
    console.log('Server running at:', server.info.uri);
});
