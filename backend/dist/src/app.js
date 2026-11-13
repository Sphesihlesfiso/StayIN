"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const property_routes_1 = __importDefault(require("./routes/property.routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const saved_routes_1 = __importDefault(require("./routes/saved.routes"));
const report_routes_1 = __importDefault(require("./routes/report.routes"));
const health_routes_1 = __importDefault(require("./routes/health.routes"));
const requestPolicy_1 = require("./middleware/requestPolicy");
const errorHandler_error_1 = require("./middleware/errorHandler.error");
/** Compose Express only: request policy → routes → shared error handling. */
function createApp() {
    const app = (0, express_1.default)();
    app.disable("x-powered-by");
    app.use(requestPolicy_1.requestPolicy, express_1.default.json({ limit: "10mb" }), (0, cookie_parser_1.default)());
    app.use("/health", health_routes_1.default);
    app.use("/auth", auth_routes_1.default);
    app.use("/account", user_routes_1.default);
    app.use("/properties", property_routes_1.default);
    app.use("/dashboard", dashboard_routes_1.default);
    app.use("/saved", saved_routes_1.default);
    app.use("/reports", report_routes_1.default);
    app.use(requestPolicy_1.notFound);
    app.use(errorHandler_error_1.errorHandler);
    return app;
}
