const CustomAPIError = require('../errors/custom-error');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const {username, password} = req.body;
    
    // throw error if any of the two values are missing in the post request 
    if(!username || !password) {
        throw new CustomAPIError('Please provide email and password', 400);
    }

    // just a demo value, normally provided by the DB 
    const id = new Date().getDate();

    // try to keep the payload small to give the user a better experience 
    // use a long, complex and unguessable  value for the token secret 
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: '30d'});

    res.status(200).json({msg: 'user created', token});
}

const dashboard = async (req, res) => {

    const luckyNumber = Math.floor(Math.random()*100);

    res.status(200).json({msg: `Hello ${req.user.username}`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}`});
}

module.exports = {
    login,
    dashboard
}