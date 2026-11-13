"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const property_controller_1 = require("../controller/property.controller");
const router = (0, express_1.Router)();
router.get("/", property_controller_1.fetchAllProperties);
exports.default = router;
