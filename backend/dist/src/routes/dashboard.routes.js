"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const property_controller_1 = require("../controller/property.controller");
const protectRoute_1 = require("../middleware/protectRoute");
const router = (0, express_1.Router)();
router.get("/properties", protectRoute_1.protect, property_controller_1.getMyProperties);
exports.default = router;
