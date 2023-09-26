"use strict";
//togglServer.ts
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
dotenv_1.default.config();
const app = (0, express_1.default)();
//const PORT = process.env.SERVER_PORT || 3001;
let apiToken = "";
app.use((0, cors_1.default)());
const router = express_1.default.Router();
router.get('/toggl-auth', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("server ran ran");
    if (!req || !req.headers || !req.headers.apitoken) {
        res.status(500).json({ error: 'Unable to fetch Toggl data' });
        return;
    }
    try {
        const response = yield axios_1.default.get('https://api.track.toggl.com/api/v9/me', {
            auth: {
                username: 'eb5f0f751ab4079e0f7de08feab2d2a8',
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
}));
router.get('/toggl/projects', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.headers);
    if (!req || !req.headers || !req.headers.apitoken || !req.headers.workspaceid) {
        res.status(500).json({ error: 'Unable to fetch Toggl data' });
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
app.use('/.netlify/functions/togglServer', router);
exports.handler = (0, serverless_http_1.default)(app);
