"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoommateProfile = exports.saveRoommateProfile = exports.getRoommateProfile = void 0;
const db_1 = __importDefault(require("../config/db"));
const getRoommateProfile = (userId) => db_1.default.roommateProfile.findUnique({ where: { userId } });
exports.getRoommateProfile = getRoommateProfile;
const saveRoommateProfile = (userId, data) => db_1.default.roommateProfile.upsert({
    where: { userId },
    create: Object.assign({ userId }, data),
    update: data,
});
exports.saveRoommateProfile = saveRoommateProfile;
const deleteRoommateProfile = (userId) => db_1.default.roommateProfile.deleteMany({ where: { userId } });
exports.deleteRoommateProfile = deleteRoommateProfile;
