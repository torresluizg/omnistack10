const express = require('express');
const routes = require('./routes')
const app = express();
const {
    connect
} = require('../db/db.js');

const PORT = 3000;


app.use(express.json());


app.get('/', (req, res) => {
    return res.json({
        message: 'Hello Xuletinha'
    });
});

let users = [];

app.put('/users', (req, res) => {
    const {
        name
    } = req.body;

    users = [
        ...users,
        {
            name
        }
    ];

    return res.json({
        message: `User ${name} cadastrado`
    })

})

app.get('/users', (req, res) => {
    return res.json({
        users
    })
})

app.delete('/users/:id', (req, res) => {
    const {
        id
    } = req.params;

    return res.json({
        message: `Deleting user with id ${id}`,
    });
});


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