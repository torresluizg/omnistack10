const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const routes = require('./routes');
const { setupWebsocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

const {
    connect
} = require('../db/db.js');

const PORT = 3333;

app.use(cors());
app.use(express.json());
app.use(routes);

connect()
    .then(
        () => {
            app.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`)
            })
        }
    )
    .catch(
        e => console.log(e)
    )