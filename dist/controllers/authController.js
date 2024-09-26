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
//import oryService from '../services/oryService';
const client_1 = require("@ory/client");
const fs_1 = __importDefault(require("fs"));
const oryConfig = JSON.parse(fs_1.default.readFileSync("ory-config.json", "utf-8"));
const ory = new client_1.FrontendApi(new client_1.Configuration({
    basePath: "https://jolly-bhabha-sq17gq6hso.projects.oryapis.com",
    apiKey: "ory_pat_RsDRiDDgbfdrr0SEPp1sGE2nApltr***"
}));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        // Step 1: Create the browser login flow
        let flowResponse = yield ory.createBrowserLoginFlow({
            via: email
        });
        // flowResponse = JSON.parse(JSON.stringify(flowResponse));
        let flowId = flowResponse.data.id;
        // Step 2: Update the login flow with email for passwordless login
        const updatedFlow = yield ory.updateLoginFlow(flowId);
        res.json({ message: "Check your email for the magic link", flow: updatedFlow.data });
    }
    catch (error) {
        console.error('Error during passwordless login:', error);
        res.status(500).json({ error: 'Passwordless login failed' });
    }
});
exports.login = login;
const googleAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Step 1: Create the browser login flow
        const flowResponse = yield ory.createBrowserLoginFlow();
        // Step 2: Construct the Google OAuth URL
        const googleOAuthUrl = `https://jolly-bhabha-sq17gq6hso.projects.oryapis.com/self-service/login/browser?flow=${flowResponse.data.id}&provider=google`;
        // Step 3: Redirect the user to Google OAuth via Ory
        res.redirect(googleOAuthUrl);
    }
    catch (error) {
        console.error('Error during Google OAuth login flow:', error);
        res.status(500).json({ error: 'Google login failed' });
    }
});
exports.googleAuth = googleAuth;
const protectedEndpoint = (req, res) => {
    res.json({ message: 'This is a protected route' });
};
exports.protectedEndpoint = protectedEndpoint;
