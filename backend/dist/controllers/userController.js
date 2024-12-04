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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.getUserById = exports.createUser = void 0;
const userRepository_1 = require("../repositories/userRepository");
const userService_1 = require("../services/userService");
const userRepository = new userRepository_1.UserRepository();
const userService = new userService_1.UserService(userRepository);
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { telegramId, name, username } = req.body;
    const user = yield userService.createUser(telegramId, name, username);
    res.status(200).json(user);
});
exports.createUser = createUser;
const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    const user = userService.getUserById(id);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({ message: "User not found" });
    }
};
exports.getUserById = getUserById;
const getAllUsers = (_req, res) => {
    const users = userService.getAllUsers();
    res.json(users);
};
exports.getAllUsers = getAllUsers;
