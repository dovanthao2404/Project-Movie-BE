const getExtensionFile = (filename) => {
    const arrString = filename.split(".");
    return arrString[arrString.length - 1];
};

module.exports = {
    getExtensionFile,
};
