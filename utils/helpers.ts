
/**
 * Generate Random string
 * @param {Number} length
 * @returns {String}
 */
export const generateRandomStr = (length: number = 16): string => {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var random = "";
    for (var i = 0; i <= length; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        random += chars.substring(randomNumber, randomNumber + 1);
    }
    return random;
}