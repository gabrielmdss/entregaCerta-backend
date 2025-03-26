"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../errors/appError"));
const Errors = (error, req, res, next) => {
    if (error instanceof appError_1.default) {
        return res.status(error.statusCode).json({
            status: "error",
            statusCode: error.statusCode,
            message: error.message,
        });
    }
    return res.status(500).json({
        status: "error",
        message: "Internal server error",
    });
};
exports.default = Errors;
