const User = require("../models/User");
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors/index')

const register = async(req, res) => {
    // res.send('register user')
    const { name, email, password } = req.body

    const user = await User.create({
        ...req.body
    })

    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
    console.log(user);
    // res.json(req.body);
}

const login = async(req, res) => {
    // res.send('login user')
    const { email, password } = req.body

    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
        throw new UnauthenticatedError("Invalid Credentials")
    }
    console.log("Hello world", password);
    // compare password 
    const isPasswordCorrect = await user.comparePassword(password)
    console.log(isPasswordCorrect)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError("Invalid Credentials")
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

module.exports = {
    register,
    login
}