"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_contoller_1 = require("../controller/user.contoller");
const roommate_routes_1 = __importDefault(require("./roommate.routes"));
const protectRoute_1 = require("../middleware/protectRoute");
const router = (0, express_1.Router)();
router.use(protectRoute_1.protect);
router.patch("/", user_contoller_1.updateUserInfo);
router.post("/password", user_contoller_1.updatePassword);
router.use("/roommate-profile", roommate_routes_1.default);
exports.default = router;
