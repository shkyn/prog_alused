const fs = require('fs');

const readFile = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, "utf8", (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            const tasks = JSON.parse(data);
            resolve(tasks);
        });
    });
};

const writeFile = (filename, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filename, data, "utf8", (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(true);
        });
    });
};

module.exports = { readFile, writeFile };
