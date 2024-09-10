const fs = require('fs');
var count = 0;
var str = '';

async function readTextFile() {
    try {
        const data = fs.readFileSync('./document.txt', 'utf8');
        str = data.replace(/\r\n|\r|\n/g, ' ')
    } catch (err) {
        console.log(err);
    }
}
readTextFile();

const eachWord = str.split(' ');
const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
for (let i in eachWord) {
    if (eachWord[i].match(pattern)) {
        count++
        console.log(eachWord[i])
    }
}

console.log(count)