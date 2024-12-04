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
exports.UserRepository = void 0;
const client_1 = require("@prisma/client");
class UserRepository {
    constructor() {
        this.users = [];
        this.prisma = new client_1.PrismaClient();
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.prisma.user.create({
                    data: {
                        name: user.name,
                        telegramId: user.telegramId,
                        username: user.username,
                    },
                });
                return result;
            }
            catch (_a) {
                return null;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.prisma.user.findFirst({ where: { id } });
            return result;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.prisma.user.findMany();
            return results;
        });
    }
    // Hapus user berdasarkan ID
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.prisma.user.delete({ where: { id } });
            return result ? true : false;
        });
    }
}
exports.UserRepository = UserRepository;
