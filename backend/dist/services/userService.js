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
exports.UserService = void 0;
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    createUser(telegramId, name, username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.create({
                telegramId,
                name,
                username,
            });
            if (user == null) {
                return { message: "User exists" };
            }
            return user;
        });
    }
    getUserById(id) {
        return this.userRepository.findById(id);
    }
    getAllUsers() {
        return this.userRepository.findAll();
    }
}
exports.UserService = UserService;
