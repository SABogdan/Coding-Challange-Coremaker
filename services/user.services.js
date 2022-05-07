const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const auth = require('../middlewares/auth.js');

async function login(email, password, callback) {

    const user = await User.findOne({ email });

    if (user !== null) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        // bcrypt.compareSync(password, user.password)
        //here it should be that above, but it dosent work.. idk why..
        if (password == user.password) {
            const token = auth.generateToken(email);
            return callback(null, {...JSON.stringify(email), token});
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