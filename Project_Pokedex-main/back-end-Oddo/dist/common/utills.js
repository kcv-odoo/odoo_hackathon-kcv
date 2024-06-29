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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashToken = exports.hashPassword = void 0;
const bcrypt = __importStar(require("bcryptjs"));
const constrats_1 = require("./constrats");
const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(constrats_1.BYCRYPT_SALT_COST);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
};
exports.hashPassword = hashPassword;
const hashToken = (token) => {
    const salt = bcrypt.genSaltSync(constrats_1.BYCRYPT_SALT_COST);
    const hash = bcrypt.hashSync(token, salt);
    return hash;
};
exports.hashToken = hashToken;
const comparePassword = async (password, hash) => {
    return bcrypt.compare(password, hash);
};
exports.comparePassword = comparePassword;
//# sourceMappingURL=utills.js.map