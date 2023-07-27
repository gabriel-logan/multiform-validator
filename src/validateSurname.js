const defaultErrorMsg = [
  'Invalid value passed',
  'Surname cannot contain numbers', 'Surname cannot contain special characters',
  'This surname is not valid',
  'Surname too big, try again',
  'Unknown error',
];
/**
 * @param {string} surname
 * @default minLength number: default: 1
 * @default maxLength number: default: 25
 * @example validateSurname('Jackson', 3, 25);
 * @info minLength cannot be greater than maxLength
 * @description This function returns 6 errors in the following order,
 *
 * default:
 *
 * [
  'Invalid value passed',
  'Surname cannot contain numbers',
  'Surname cannot contain special characters',
  'This surname is not valid',
  'Surname too big, try again',
  'Unknown error',
];
 * @returns {object} An object with 'isValid' (boolean) and 'errorMsg' (string) properties.
 */
function validateSurname(surname, minLength = 1, maxLength = 25, errorMsg = defaultErrorMsg) {
  if (typeof surname !== 'string') throw new TypeError('The input should be a string.');
  // Check para saber se as mensagens que sao passadas sao validas
  // caso contrario retorna um ERRO
  if (errorMsg) {
    if (!Array.isArray(errorMsg)) throw new Error('errorMsg must be an Array or null');
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
  if (minLength > maxLength) {
    throw new Error('minLength cannot be greater than maxLength');
  }
  if (!surname) {
    return {
      isValid: false,
      errorMsg: getErrorMessage(0),
    };
  }
  try {
    if (surname.length > maxLength) {
      return {
        isValid: false,
        errorMsg: getErrorMessage(4),
      };
    }
    if (surname.length < minLength) {
      return {
        isValid: false,
        errorMsg: getErrorMessage(3),
      };
    }

    if (surname.match(/\d/)) {
      return {
        isValid: false,
        errorMsg: getErrorMessage(1),
      };
    }

    if (surname.match(/[^\w\s]/)) {
      return {
        isValid: false,
        errorMsg: getErrorMessage(2),
      };
    }

    // Check if all characters in the surname are repeated
    if (new Set(surname).size === 1) {
      return {
        isValid: false,
        errorMsg: getErrorMessage(3), // Assuming 'Surname is not allowed.' refers to all characters being repeated.
      };
    }

    // Check if the surname contains at least 3 consecutive characters that are the same
    const consecutiveCharsRegex = /(\w)\1\1/;
    if (consecutiveCharsRegex.test(surname)) {
      return {
        isValid: false,
        errorMsg: getErrorMessage(3), // You can set the appropriate error message for this case.
      };
    }

    return {
      isValid: true,
      errorMsg: null,
    };
  } catch (error) {
    return {
      isValid: false,
      errorMsg: getErrorMessage(5),
    };
  }
}
module.exports = validateSurname;
