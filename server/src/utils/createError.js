/**
 * Cria um erro padronizado com mensagem e código
 * @param {string} message - Mensagem descritiva do erro
 * @param {string} code - Código do erro padronizado
 * @returns {{ message: string, code: string }}
 */
function createError(message, code) {
    return { message, code };
}

module.exports = createError;
