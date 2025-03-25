"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./src/application/routes"));
const errors_1 = __importDefault(require("./src/application/middlewares/errors"));
const PORT = process.env.PORT;
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use((0, cors_1.default)());
server.use("/api/entregaCerta", routes_1.default);
server.use(errors_1.default);
server.listen(PORT, () => {
    console.info(`server is running in port ${PORT}`);
});
