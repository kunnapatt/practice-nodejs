const jwt = require('jsonwebtoken');

const { BadRequest } = require('../errors/index');

const login = async(req, res) => {
    const { username, password } = req.body;

    // mongo
    if (!username || !password) {
        throw new BadRequest('Please provide email and password')
    }

    const id = new Date().getDate()

    const taken = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' })

    res.status(200).json({ msg: 'user created', token: taken })
}

const dashboard = async(req, res) => {

    const { id, username } = req.user;
    const luckyNumber = Math.floor(Math.random() * 100);

    res.status(200).json({ msg: `Hello, ${username}`, secret: `Here is your authorized data, your lucky number it ${luckyNumber}` })
}

module.exports = {
    login,
    dashboard
}