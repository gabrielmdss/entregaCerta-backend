"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const assistido_routes_1 = __importDefault(require("./assistido.routes"));
const retirada_routes_1 = __importDefault(require("./retirada.routes"));
const routes = (0, express_1.Router)();
routes.use(assistido_routes_1.default);
routes.use(retirada_routes_1.default);
exports.default = routes;
