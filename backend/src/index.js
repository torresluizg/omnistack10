const express = require('express');
const routes = require('./routes')
const app = express();
const {
    connect
} = require('../db/db.js');

const PORT = 3000;

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