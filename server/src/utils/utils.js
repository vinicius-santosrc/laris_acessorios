const crypto = require('crypto');

/**
 * Gera um UID hexadecimal de 20 caracteres (10 bytes)
 * @returns {string} UID gerado
 */
function generateUID() {
    return crypto.randomBytes(10).toString('hex');
}

module.exports = {
    generateUID
};
