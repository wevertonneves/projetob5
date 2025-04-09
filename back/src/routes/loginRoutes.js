"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logincontroller_1 = require("../controllers/logincontroller");
const router = express_1.default.Router();
// ROTAS DE LOGIN
router.post("/login", logincontroller_1.loginUser);
exports.default = router;
