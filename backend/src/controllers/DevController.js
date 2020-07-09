const axios = require('axios');
const DevModel = require('../models/devModel');
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    index: async (req, res) => {
        const devs = await Dev.find();
        return res.json(devs)
    },
    
    store: async (req, res) => {
        const { github_username, name = login, avatar_url, techs, latitude, longitude } = req.body;
        let dev = await Dev.findOne({github_username})

        if(!dev){
            try {
                const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)

                const { name = login, avatar_url, bio } = apiResponse.data

                console.log(name, avatar_url, bio, github_username);

                const techsArray = parseStringAsArray

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
                })

                return res.json({
                    message: 'Hello OmniStack'
                });
            } catch (error) {
                return res.json({
                    message: 'Não consegui :('
                })
            }
        }
    }
}