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
exports.deleteRuleById = exports.updateRuleById = exports.postRule = exports.fetchRuleById = exports.fetchAllRules = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const apiResponce_1 = require("../utils/apiResponce");
const rule_schema_1 = require("../../schema/rule.schema");
const rule_service_1 = require("../services/rule.service");
exports.fetchAllRules = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const propertyId = Number(req.params.propertyId);
    const rules = yield (0, rule_service_1.getAllRules)(propertyId);
    res.status(200).json((0, apiResponce_1.successResponse)(rules, "Rules fetched successfully"));
}));
exports.fetchRuleById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ruleId = Number(req.params.ruleId);
    const rule = yield (0, rule_service_1.getRuleById)(ruleId);
    if (!rule) {
        // Return early if it doesn't exist so we don't send a null success
        return res.status(404).json((0, apiResponce_1.errorResponse)("Rule not found"));
    }
    res.status(200).json((0, apiResponce_1.successResponse)(rule, "Rule fetched successfully"));
}));
exports.postRule = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // We merge the request body with the propertyId from the URL
    const inputData = Object.assign(Object.assign({}, req.body), { propertyId: Number(req.params.propertyId) });
    const parsed = rule_schema_1.createRuleSchema.safeParse(inputData);
    if (!parsed.success) {
        return res.status(400).json((0, apiResponce_1.validationError)(parsed.error.issues));
    }
    const newRule = yield (0, rule_service_1.addRule)(parsed.data.propertyId, parsed.data.content);
    res.status(201).json((0, apiResponce_1.successResponse)(newRule, "Rule created successfully"));
}));
exports.updateRuleById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ruleId = Number(req.params.ruleId);
    const parsed = rule_schema_1.updateRuleSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json((0, apiResponce_1.validationError)(parsed.error.issues));
    }
    // Because updateRuleSchema is partial(), content could technically be undefined
    if (!parsed.data.content) {
        return res
            .status(400)
            .json((0, apiResponce_1.errorResponse)("Content is required to update a rule"));
    }
    const updatedRule = yield (0, rule_service_1.updateRule)(ruleId, parsed.data.content);
    res
        .status(200)
        .json((0, apiResponce_1.successResponse)(updatedRule, "Rule updated successfully"));
}));
exports.deleteRuleById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ruleId = Number(req.params.ruleId);
    yield (0, rule_service_1.deleteRule)(ruleId);
    res.status(200).json((0, apiResponce_1.successResponse)(null, "Rule deleted successfully"));
}));
