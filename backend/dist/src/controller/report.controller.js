"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReport = void 0;
const report_schema_1 = require("../../schema/report.schema");
const report_service_1 = require("../services/report.service");
const protectRoute_1 = require("../middleware/protectRoute");
const apiResponce_1 = require("../utils/apiResponce");
const asyncHandler_1 = require("../utils/asyncHandler");
exports.createReport = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, report_service_1.submitReport)((0, protectRoute_1.currentUser)(req).email, report_schema_1.createReportSchema.parse(req.body));
    res.status(201).json((0, apiResponce_1.successResponse)(null, "Your report has been received."));
}));
