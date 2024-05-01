/// <reference types="node" />
/**
 * Checks if the given file buffer represents a valid image.
 * @param fileBuffer - The buffer containing the file data.
 * @description - This function checks the magic numbers of the file buffer to determine if it is a valid image. Verifies if the file is a JPEG or PNG image.
 * @returns A boolean indicating whether the file is a valid image or not.
 */
declare function isValidImage(fileBuffer: Buffer): boolean;
export default isValidImage;