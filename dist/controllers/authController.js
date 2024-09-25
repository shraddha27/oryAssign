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
exports.protectedEndpoint = exports.googleAuth = exports.login = void 0;
const oryService_1 = __importDefault(require("../services/oryService"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const response = yield oryService_1.default.initiatePasswordless(email);
        res.json(response);
    }
    catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
});
exports.login = login;
const googleAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const googleLoginUrl = yield oryService_1.default.initiateGoogleAuth();
        res.redirect(googleLoginUrl);
    }
    catch (error) {
        res.status(500).json({ message: 'Google Auth failed', error: error.message });
    }
});
exports.googleAuth = googleAuth;
const protectedEndpoint = (req, res) => {
    res.json({ message: 'This is a protected route' });
};
exports.protectedEndpoint = protectedEndpoint;
