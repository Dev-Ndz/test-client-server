const database = require('../database.js');
const urlshort = "/about"
const url = "/about?task=bliblablou"

async function async(){

let page = url.split("?")[0];
if (url.split("?")[1] != undefined){
    let request = url.split("?")[1];
    let content = request.split("=")[1]
    database.query(
        `INSERT INTO tasks (content, isDone)
        VALUES ('${content}', 0)`
    )
}
let listOfTask = await database.query('SELECT * FROM tasks')
console.log(listOfTask);

console.log(page)
}
async();