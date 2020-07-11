const axios = require('axios');
const Dev = require('../models/devModel');
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    index: async (req, res) => {
        const devs = await Dev.find();
        return res.json(devs)
    },

    store: async (req, res) => {
        const {
            github_username,
            techs,
            latitude,
            longitude
        } = req.body;
        try {
            let dev = await Dev.findOne({
                github_username
            })
        } catch (error) {}

        if (!dev) {
            try {
                const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)

                const {
                    name = login, avatar_url, bio
                } = apiResponse.data

                console.log(name, avatar_url, bio, github_username);

                const techsArray = parseStringAsArray(techs)

                const location = {
                    type: 'Point',
                    coordinates: [longitude, latitude],
                }

                const dev = await Dev.create({
                    github_username,
                    name,
                    avatar_url,
                    bio,
                    techs: techsArray,
                    location
                })

                return res.json(dev);
            } catch (error) {
                return res.json({
                    message: 'Não consegui :('
                })
            }
        } else {
            return res.json({
                message: 'Usuário já existente'
            })
        }
    }
}