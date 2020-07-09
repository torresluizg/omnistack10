const {
    Router
} = require('express');

const {
    store,
    index
} = require('./controllers/DevController');

const SearchController = require('./controllers/SearchController')


const routes = Router();

routes.get('/devs', index)

routes.get('/search', index)

module.exports = routes;