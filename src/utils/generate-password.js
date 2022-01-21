const generatePassword = Math.random().toString(36).substring(2);

module.exports = { generatePassword };