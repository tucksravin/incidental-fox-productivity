"use strict";
// YOUR_BASE_DIRECTORY/netlify/functions/api.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const express_1 = require("express");
const serverless_http_1 = require("serverless-http");
const api = (0, express_1.default)();
const router = (0, express_1.Router)();
router.get('/hello', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Hello from Express.js!</h1>');
    res.end();
});
api.use('/api/', router);
exports.handler = (0, serverless_http_1.default)(api);
