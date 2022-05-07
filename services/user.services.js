const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const auth = require('../middlewares/auth.js');

async function login({ username, password }, callback) {
    const user = await User.findOne({ username });

    if (user !== null) {
        if (bcrypt.compareSync(password, user.password)) {
            const token = auth.generateToken(username);
            return callback(null, {...user.toJson(), token});
        }
        else
        {
            return callback({
                message: 'Invalid username or password'
            });
        }
    }
    else
    {
        return callback({
            message: 'Invalid username or password'
        });
    }
}

async function register(params, callback){
    if (params.username === undefined){
        return callback({message: 'Username is required'});
    }
    
    const user = new User(params);
    user.save()
    .then((response) => {
        return callback(null, response);
    })
    .catch((error) => {
        return callback(error);
    })
}

module.exports = {
    login,
    register,
};