"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = require("./app");
const port = Number(process.env.PORT || 5000);
(0, app_1.createApp)().listen(port, "127.0.0.1", () => console.log(`StayIN API listening on ${port}`));
