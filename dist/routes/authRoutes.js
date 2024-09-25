"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const roleMiddleware_1 = require("../middleware/roleMiddleware");
const router = express_1.default.Router();
router.post('/login', authController_1.login);
router.get('/google', authController_1.googleAuth);
router.get('/admin', (0, roleMiddleware_1.checkRole)('admin'), authController_1.protectedEndpoint);
router.get('/customer', (0, roleMiddleware_1.checkRole)('customer'), authController_1.protectedEndpoint);
exports.default = router;
