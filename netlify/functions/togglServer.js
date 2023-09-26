"use strict";
//togglServer.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const express_1 = require("express");
const serverless_http_1 = require("serverless-http");
const axios_1 = require("axios");
const cors_1 = require("cors");
const dotenv_1 = require("dotenv");
dotenv_1.default.config();
const app = (0, express_1.default)();
//const PORT = process.env.SERVER_PORT || 3001;
let apiToken = "";
app.use((0, cors_1.default)());
const router = express_1.default.Router();
router.get('/toggl-auth', async (req, res) => {
    console.log("server ran ran");
    if (!req.headers.apitoken) {
        res.status(500).json({ error: 'Unable to fetch Toggl data' });
        return;
    }
    try {
        const response = await axios_1.default.get('https://api.track.toggl.com/api/v9/me', {
            auth: {
                username: req.headers.apitoken.toString(),
                password: 'api_token',
            },
        });
        res.json(response.data);
    }
    catch (error) {
        console.log("call failed from server," + req.headers.apitoken.toString());
        //console.error(error);
        res.status(500).json({ error: 'Unable to fetch Toggl data' });
    }
});
router.get('/toggl/projects', async (req, res) => {
    console.log(req.headers);
    if (!req.headers.apitoken || !req.headers.workspaceid) {
        res.status(500).json({ error: 'Unable to fetch Toggl data' });
        return;
    }
    console.log('https://api.track.toggl.com/api/v9/workspaces/' + req.headers.workspaceid.toString() + '/projects');
    try {
        const response = await axios_1.default.get('https://api.track.toggl.com/api/v9/workspaces/' + req.headers.workspaceid.toString() + '/projects', {
            auth: {
                username: req.headers.apitoken.toString(),
                password: 'api_token',
            },
        });
        res.json(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to fetch Toggl data' });
    }
});
/*

router.use('*', (_req, res) => {
  const svelteKitAppURL = 'http://localhost:5173';
  axios
    .get(`${svelteKitAppURL}${_req.url}`)
    .then((response) => {
      res.status(response.status).send(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Unable to proxy request to SvelteKit app' });
    });
});
*/
app.use('/togglServer/', router);
exports.handler = (0, serverless_http_1.default)(app);
