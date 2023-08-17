"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const isEmail_1 = __importDefault(require("./isEmail"));
const defaultErrorMsg = [
    'Invalid value passed',
    'This e-mail is not valid',
    'Email too big, try again',
    'This email is not valid in the country',
    'Email domain is not allowed.',
    'Unknown error',
];
const validDomainsDefault = ['@gmail.com', '@outlook.com', '@yahoo.com', '@icloud.com', '@hotmail.com',
    '@mail.ru', '@yandex.ru', '@gmx.com', '@zoho.com', '@protonmail.com', '@protonmail.ch'
];
/**
 * @param {string} email
 * @param {number} maxLength optional
 * @param {string|null} country optional
 * @param {string[]} [errorMsg=defaultErrorMsg] optional
 * @param {boolean|string[]} [validDomains=false] optional
 * @default maxLength number: 400, validDomains = false
 * @example validateEmail('foor@bar.com', 30, 'us);
 * @example validateEmail('foor@bar.com', 30, 'br);
 * @example validateEmail('foor@bar.com', 30);
 * @example validateEmail('foor@bar.com', 30, null, ['My own error message']); Country is set to null
 * @example validateEmail('joao@myOwnDomain.com', null, null, null, ['@myOwnDomain.com']);
 * @example validateEmail('joaoaoao@gmail.com.com', null, null, null, true);
 * @description This function returns six errors in the following order,
 *
 * If you want to use a default parameter, use null.
 *
 * Default:
 * ['Invalid value passed', 'This e-mail is not valid', 'Email too big, try again', 'This email is not valid in the country','Email domain is not allowed.', 'Unknown error']
 *
 * Create a list of errors separated by commas in strings
 *
 * @description You can also pass a list of domains that will be allowed, if you leave the parameter empty, it will be set to false and no check will be performed, you can also pass only true and the following list will be used by default:
 *
 * Default:
 * ['@gmail.com', '@outlook.com', '@yahoo.com', '@icloud.com', '@hotmail.com',
  '@mail.ru', '@yandex.ru', '@gmx.com', '@zoho.com', '@protonmail.com', '@protonmail.ch'];

 * You can also create a custom list, your list will completely replace the default list.
 * @returns {object} An object with 'isValid' (boolean) and 'errorMsg' (string) properties.
 */
function validateEmail(email, maxLength, country, errorMsg = defaultErrorMsg, validDomains = false) {
    if (typeof email !== 'string')
        throw new TypeError('The input should be a string.');
    // Expressão regular para verificar se o e-mail termina com um dos domínios válidos
    let regex;
    if (validDomains === true) {
        regex = new RegExp(`${validDomainsDefault.join('|')}$`, 'i');
    }
    else if (Array.isArray(validDomains) && validDomains.length > 0) {
        const validDomainsCustom = validDomains.map((domain) => domain.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
        regex = new RegExp(`${validDomainsCustom.join('|')}$`, 'i');
    }
    // Check para saber se as mensagens que sao passadas sao validas
    // caso contrario retorna um ERRO
    if (errorMsg) {
        if (!Array.isArray(errorMsg))
            throw new Error('errorMsg must be an Array or null');
        for (let index = 0; index < errorMsg.length; index += 1) {
            if (errorMsg[index] != null && typeof errorMsg[index] !== 'string') {
                throw new TypeError('All values within the array must be strings or null/undefined.');
            }
        }
    }
    // Função interna para obter a mensagem de erro
    function getErrorMessage(index) {
        if (errorMsg && index >= 0 && index < errorMsg.length && errorMsg[index] != null) {
            return errorMsg[index];
        }
        return defaultErrorMsg[index];
    }
    if (!email) {
        return {
            isValid: false,
            errorMsg: getErrorMessage(0),
        };
    }
    const maxEmailLength = maxLength || 400;
    try {
        // Check domain only if regex is defined (validDomains is true or validDomains is an array)
        if (regex && !regex.test(email)) {
            return {
                isValid: false,
                errorMsg: getErrorMessage(4),
            };
        }
        if (!((0, isEmail_1.default)(email))) {
            return {
                isValid: false,
                errorMsg: getErrorMessage(1),
            };
        }
        if (email.length > maxEmailLength) {
            return {
                isValid: false,
                errorMsg: getErrorMessage(2),
            };
        }
        // If country is provided, check if the email ends with the country code
        if (country) {
            if (!email.endsWith(`.${country}`)) {
                return {
                    isValid: false,
                    errorMsg: getErrorMessage(3),
                };
            }
        }
        return {
            isValid: true,
            errorMsg: null,
        };
    }
    catch (error) {
        return {
            isValid: false,
            errorMsg: getErrorMessage(5),
        };
    }
}
module.exports = validateEmail;
