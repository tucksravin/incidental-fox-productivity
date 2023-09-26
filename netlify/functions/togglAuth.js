"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const cors_1 = require("cors");
const express_1 = require("express");
const serverless_http_1 = require("serverless-http");
// Create a router to handle routes
const app = (0, express_1.default)();
const router = express_1.default.Router();
// Define a route that responds with a JSON object when a GET request is made to the root path
router.get("/", (req, res) => {
    res.json({
        hello: "hi!"
    });
});
// Use the router to handle requests to the `/.netlify/functions/api` path
app.use(`/.netlify/functions/api`, router);
// Export the app and the serverless function
module.exports = app;
module.exports.handler = (0, serverless_http_1.default)(app);
