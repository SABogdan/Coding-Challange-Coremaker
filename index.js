const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dbConfig = require("./config/db.config");

const auth = require("./middlewares/auth.js");
const errors = require("./middlewares/errors.js");
const unless = require("express-unless");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1/coremaker-code-challenge", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the database");
}).catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
});

auth.authenticateToken.unless = unless;
app.use(auth.authenticateToken.unless({
    path: [
        { url: "/", methods: ["GET"] },
        { url: "/users/login", methods: ["POST"] },
        { url: "/signup", methods: ["POST"] },
    ],
}));

app.use(express.json());

app.use("/users", require("./routes/user.routes"));

app.use(errors.errorHandler);

app.listen(process.env.port || 4000, () => {
    console.log("Server is running on port 4000");
});