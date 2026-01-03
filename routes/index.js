module.exports = (app) => {
    require("./users.routes")(app);
    require("./auth.routes")(app);

    require("./kyc.routes")(app);

    return app
}