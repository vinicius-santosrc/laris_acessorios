const { pool } = require('../config/database');
const userService = require('./userService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createError = require('../utils/createError');
const ERROR_CODES = require('../utils/errorCodes');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '30d';

const authService = {
    /**
     * Cria um novo usuário com senha criptografada
     */
    register: async ({ data, password }) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        return userService.createUser(data, hashedPassword);
    },

    /**
     * Autentica o usuário, verifica senha e gera token
     */
    login: async ({ email, password }) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM users WHERE email = ?';
            pool.query(sql, [email], async (err, results) => {
                if (err) return reject(createError('Erro interno ao buscar usuário.', ERROR_CODES.DB_QUERY_ERROR));
                if (results.length === 0) {
                    return reject(createError('Usuário não encontrado.', ERROR_CODES.USER_NOT_FOUND));
                }

                const user = results[0];
                const passwordMatch = await bcrypt.compare(password, user.password);
                if (!passwordMatch) {
                    return reject(createError('E-mail ou senha incorreta.', ERROR_CODES.INVALID_PASSWORD));
                }

                const token = jwt.sign(
                    { id: user.id, email: user.email },
                    JWT_SECRET,
                    { expiresIn: JWT_EXPIRES_IN }
                );

                resolve({
                    token,
                    user: {
                        id: user.id,
                        uid: user.uid,
                        full_name: user.nome_completo,
                        email: user.email,
                        photoURL: user.photoURL,
                        role: user.role
                    }
                });
            });
        });
    },

    /**
     * Verifica token de autenticação
     */
    verifyToken: (token) => {
        try {
            return jwt.verify(token, JWT_SECRET);
        } catch (err) {
            throw createError('Token inválido ou expirado.', ERROR_CODES.INVALID_TOKEN);
        }
    }
};

module.exports = authService;
