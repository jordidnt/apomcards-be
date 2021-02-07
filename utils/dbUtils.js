const { customAlphabet } = require('nanoid');

module.exports = () => {
    const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 6);
    const self = {
        generateJoinCode() {
            return nanoid();
        }
    };

    return self;
}