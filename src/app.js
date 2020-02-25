const express = require('express');
const routes = require('./routes');

class App {
    constructor() {
        this.server = express();
        
        this.middlewares()
        this.routes()
    }

    middlewares() { 
        this.server.use(express.json());  // o servidor pode suportar requisição com json.
    }

    routes() {
        this.server.use(routes)
    }
}

module.exports = new App().server // somente o server faz sentido ser acessado de fora dessa classe