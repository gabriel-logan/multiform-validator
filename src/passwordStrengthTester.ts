/**
 * @description Avalia a força de uma senha e retorna o tipo de força da senha.
 *
 * @returns O tipo de força da senha ('veryWeak', 'weak', 'regular', 'strong' ou 'veryStrong').
 *
 * @example
 * passwordStrengthTester('123'); // Output: 'veryWeak'
 *
 * @example
 * passwordStrengthTester('abc'); // Output: 'weak'
 *
 * @example
 * passwordStrengthTester('abc123'); // Output: 'regular'
 *
 * @example
 * passwordStrengthTester('Abc123!'); // Output: 'strong'
 *
 * @example
 * passwordStrengthTester('SuperSecurePassword123!'); // Output: 'veryStrong'
 */
function passwordStrengthTester(password: string): string {
  if (typeof password !== 'string') throw new TypeError('The input should be a string.');
  // Check de comprimento da senha
  const passwordLength: number = password.length;
  let strengthType: string;

  // Critérios para classificar a senha
  if (passwordLength < 6 && /^\d+$/.test(password)) {
    strengthType = 'veryWeak';
  } else if (passwordLength < 8 && /^\d+$/.test(password)) {
    strengthType = 'weak';
  } else if (passwordLength < 8 && /\d/.test(password) && /[a-zA-Z]/.test(password)) {
    strengthType = 'regular';
  } else if (
    /[A-Z]/.test(password)
    && /[!@#$%^&*(),.?":{}|<>]/.test(password)
    && /\d/.test(password)
    && /[a-zA-Z]/.test(password)
  ) {
    strengthType = 'veryStrong';
  } else {
    strengthType = 'strong';
  }

  return strengthType;
}
export default passwordStrengthTester;
