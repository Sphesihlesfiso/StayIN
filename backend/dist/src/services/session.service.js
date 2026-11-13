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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSessionUser = getSessionUser;
exports.createSession = createSession;
exports.deleteSession = deleteSession;
const crypto_1 = require("crypto");
const db_1 = __importDefault(require("../config/db"));
const selects_1 = require("../utils/selects");
const digest = (token) => (0, crypto_1.createHash)("sha256").update(token).digest("hex");
function getSessionUser(token) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!token)
            return null;
        const session = yield db_1.default.session.findUnique({
            where: { id: digest(token) },
            include: { User: { select: selects_1.safeUser } },
        });
        return session && session.expiresAt > new Date() ? session.User : null;
    });
}
function createSession(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = (0, crypto_1.randomBytes)(32).toString("hex"), expiresAt = new Date(Date.now() + 7 * 86400000);
        yield db_1.default.session.create({
            data: { id: digest(token), userId, expiresAt },
        });
        return { token, expiresAt };
    });
}
function deleteSession(token) {
    return __awaiter(this, void 0, void 0, function* () {
        if (token)
            yield db_1.default.session.deleteMany({ where: { id: digest(token) } });
    });
}
