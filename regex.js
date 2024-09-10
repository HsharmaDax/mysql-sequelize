const regex = require('regex');
const fs = require('fs');

var count = 0;
var str = '';

async function example() {
    try {
        const data = fs.readFileSync('./document.txt', 'utf8');
        str = data.replace(/\r\n|\r|\n/g, ' ')
    } catch (err) {
        console.log(err);
    }
}
example();
// const password = 'hrsH122@'
// const pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*$-_@!){8,16}/
// console.log(password.match(pass))
const eachWord = str.split(' ');
// console.log(eachWord);
const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
for (let i in eachWord) {
    // console.log(i)
    if (eachWord[i].match(pattern)) {
        count++
        console.log(eachWord[i])
    }
}


console.log(count)
// const str = 'hello harsh harsh@gmail.com harsh@gmail.com'

// const gmail = /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,4}/