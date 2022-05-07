function errorHandler(err, req, res, next) {
    if (typeof (err) === 'string') {
        return res.status(400).json({ error: err });
    }

    if (typeof (err) === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    }

    if (typeof (err) === 'UnauthorizedError') {
        return res.status(401).json({ error: err.message });
    }

    return res.status(500).json({ error: err.message });
}

module.exports = {
    errorHandler,
};