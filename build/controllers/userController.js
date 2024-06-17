"use strict";
// controllers/userController.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client"); // Import the User class
const prisma = new client_1.PrismaClient();
// Kayıt işlemi
const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Kullanıcıyı oluştur
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                username: username,
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Kullanıcı oluşturulurken bir hata oluştu' });
    }
};
exports.register = register;
// Giriş işlemi
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Kullanıcıyı bul
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        });
        // Kullanıcı yoksa hata dön
        if (!user) {
            res.status(404).json({ message: 'Kullanıcı bulunamadı' });
            return;
        }
        // Şifre eşleşmiyorsa hata dön
        if (!await bcryptjs_1.default.compare(password, user.password)) {
            res.status(401).json({ message: 'Hatalı şifre' });
            return;
        }
        // Kullanıcı adı ve şifre doğruysa giriş başarılı dön
        res.status(200).json({ message: 'Giriş başarılı' });
    }
    catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Giriş yapılırken bir hata oluştu' });
    }
};
exports.login = login;
// Çıkış işlemi (bu örnekte basit bir çıkış işlemidir)
const logout = async (req, res) => {
    // logout işlemi
    res.status(200).json({ message: 'Çıkış yapıldı' });
};
exports.logout = logout;
//# sourceMappingURL=userController.js.map