"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.updateUser = updateUser;
exports.changePassword = changePassword;
const bcrypt = __importStar(require("bcrypt-ts"));
const db_1 = __importDefault(require("../config/db"));
const selects_1 = require("../utils/selects");
const errors_1 = require("../errors/errors");
function updateUser(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return db_1.default.user.update({ where: { id }, data, select: selects_1.safeUser });
    });
}
function changePassword(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const record = yield db_1.default.user.findUniqueOrThrow({ where: { id } });
        if (!(yield bcrypt.compare(data.currentPassword, record.password)))
            throw new errors_1.AppError("Current password is incorrect.", 400, {
                currentPassword: ["Enter your current password correctly."],
            });
        yield db_1.default.$transaction([
            db_1.default.user.update({
                where: { id },
                data: { password: yield bcrypt.hash(data.password, 12) },
            }),
            db_1.default.session.deleteMany({ where: { userId: id } }),
        ]);
    });
}
