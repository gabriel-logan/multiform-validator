/**
 * @param username
 * @param minLength optional
 * @param maxLength optional
 * @param errorMsg optional
 * @default minLength number: 1
 * @default maxLength number: Infinity
 * @example validateUsername('User999', 8, 20);
 * @example validateUsername('User999', 8, 20, ['My own errorsMsg']);
 * @info minLength cannot be greater than maxLength
 * @description This function returns 7 errors in the following order,
 *
 * If you want to use a default parameter, use null.
 *
 * Default:
 *   [
  'Invalid value passed',
  'username too short',
  'This username is too long',
  'Username cannot contain spaces',
  'Cannot start with number',
  'Cannot contain only numbers',
  'Unknown error'
];
 *
 * Create a list of errors separated by commas in strings
 * @returns An object with 'isValid' (boolean) and 'errorMsg' (string) properties.
 */
declare function validateUsername(username: string, minLength?: number | null, maxLength?: number | null, errorMsg?: (string | null)[]): {
    isValid: boolean;
    errorMsg: string | null;
};
export default validateUsername;
