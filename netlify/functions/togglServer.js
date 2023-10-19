"use strict";
//togglServer.ts
//on changes run npm run build:functions to compile
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const express_1 = __importDefault(require("express"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const luxon_1 = require("luxon");
dotenv_1.default.config();
const app = (0, express_1.default)();
//const PORT = process.env.SERVER_PORT || 3001;
let apiToken = "";
app.use((0, cors_1.default)());
const router = express_1.default.Router();
router.get('/auth', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req || !req.headers || !req.headers.apitoken) {
        res.status(500).json({ error: 'Unable to fetch Toggl data, missing headers or api token, auth' });
        return;
    }
    try {
        const response = yield axios_1.default.get('https://api.track.toggl.com/api/v9/me', {
            auth: {
                username: req.headers.apitoken.toString(),
                password: 'api_token',
            },
        });
        res.json(response.data);
    }
    catch (error) {
        //console.log("call failed from server," + req.headers.apitoken.toString())
        //console.error(error);
        res.status(500).json({ error: 'Unable to fetch Toggl data' });
    }
}));
router.get('/projects', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.headers);
    if (!req || !req.headers || !req.headers.apitoken || !req.headers.workspaceid) {
        res.status(500).json({ error: 'Unable to fetch Toggl data, check headers, projects' });
        return;
    }
    console.log('https://api.track.toggl.com/api/v9/workspaces/' + req.headers.workspaceid.toString() + '/projects');
    try {
        const response = yield axios_1.default.get('https://api.track.toggl.com/api/v9/workspaces/' + req.headers.workspaceid.toString() + '/projects', {
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
}));
router.get('/time-entries', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req) {
        res.status(500).json({ error: 'Unable to fetch Toggl data, missing request' });
        return;
    }
    if (!req.headers) {
        res.status(500).json({ error: 'Unable to fetch Toggl data, missing headers object,' });
        return;
    }
    if (!req.headers.apitoken) {
        res.status(500).json({ error: 'Unable to fetch Toggl data, missing api token,' });
        return;
    }
    if (!req.headers.requested_date) {
        res.status(500).json({ error: 'Unable to fetch Toggl data, missing requested_date header,' });
        return;
    }
    let givenDateString = "";
    if (Array.isArray(req.headers.requested_date)) {
        givenDateString = req.headers.requested_date.join('');
    }
    else {
        givenDateString = req.headers.requested_date;
    }
    let givenDay = luxon_1.DateTime.fromISO(givenDateString);
    console.log(givenDateString);
    let nextDay = givenDay.plus({ days: 1 }).setTimeZone("America/New_York");
    let nextDateString = nextDay.toISO();
    console.log('https://api.track.toggl.com/api/v9/me/time_entries?start_date=' + givenDateString + '&end_date=' + nextDateString);
    try {
        const response = yield axios_1.default.get('https://api.track.toggl.com/api/v9/me/time_entries?start_date=' + givenDateString + '&end_date=' + nextDateString, {
            auth: {
                username: req.headers.apitoken.toString(),
                password: 'api_token',
            },
        });
        console.log(response.data);
        res.json(response.data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Unable to fetch Toggl data, ' + error });
    }
}));
app.use('/.netlify/functions/togglServer', router);
exports.handler = (0, serverless_http_1.default)(app);
