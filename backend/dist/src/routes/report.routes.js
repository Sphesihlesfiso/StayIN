"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const report_controller_1 = require("../controller/report.controller");
const protectRoute_1 = require("../middleware/protectRoute");
const router = (0, express_1.Router)();
router.post("/", protectRoute_1.protect, report_controller_1.createReport);
exports.default = router;
