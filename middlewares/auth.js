const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) return res.sendStatus(401);

    jwt.verify(token, 'coremaker-secret-key-C00D3Ch@ll@ng3', (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

function generateToken(user) {
    return jwt.sign({data: user}, 'coremaker-secret-key-C00D3Ch@ll@ng3', { expiresIn: '1h' });
}

module.exports = {
    authenticateToken,
    generateToken,
};