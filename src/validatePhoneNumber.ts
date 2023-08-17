const defaultErrorMsg = ['Invalid value passed', 'Invalid phone number', 'Unknown error'];
/**
 * @param {string} phoneNumber
 * @param {string[]} [errorMsg=defaultErrorMsg] optional
 * @example validatePhoneNumber('555-123-4567');
 * @example validatePhoneNumber('(555) 123-4567', [null, 'Custom error 2']);
 * @default {errorMsg} ['Invalid value passed', 'Invalid phone number', 'Unknown error']
 * @description This function is a generic phone number validator. It can validate phone numbers in various formats depending on the specific implementation.
 * @returns {object} An object with 'isValid' (boolean) and 'errorMsg' (string) properties.
 */
function validatePhoneNumber(phoneNumber: string, errorMsg = defaultErrorMsg) {
  if (typeof phoneNumber !== 'string') throw new TypeError('The input should be a string.');
  // Check to see if the passed error messages are valid; otherwise, return an error
  if (errorMsg) {
    if (!Array.isArray(errorMsg)) throw new Error('errorMsg must be an Array or null');
    for (let index = 0; index < errorMsg.length; index += 1) {
      if (errorMsg[index] != null && typeof errorMsg[index] !== 'string') {
        throw new TypeError('All values within the array must be strings or null/undefined.');
      }
    }
  }
  // Internal function to get the error message
  function getErrorMessage(index: number) {
    if (index >= 0 && index < errorMsg.length && errorMsg[index] != null) {
      return errorMsg[index];
    }
    return defaultErrorMsg[index];
  }
  if (!phoneNumber) {
    return {
      isValid: false,
      errorMsg: getErrorMessage(0),
    };
  }
  // Add specific phone number validation logic here for different countries/formats
  // For the generic implementation, we'll use a dummy regex that matches any string.
  // Updated regular expression for phone number validation
  const phoneNumberRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
  try {
    if (!phoneNumberRegex.test(phoneNumber)) {
      return {
        isValid: false,
        errorMsg: getErrorMessage(1),
      };
    }
    return {
      isValid: true,
      errorMsg: null,
    };
  } catch (error) {
    return {
      isValid: false,
      errorMsg: getErrorMessage(2),
    };
  }
}
export = validatePhoneNumber;
