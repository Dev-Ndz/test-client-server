const http = require('http');
const fs = require('fs')
const _ = require('lodash');

import { dbcall } from '../database.js';

async function async(){
    let dbcall = await database.dbcall('SELECT * FROM tasks')
    console.log(dbcall);
}
async();

async function runserver(){


const server = http.createServer(async (req, res) =>{
    /*this call back function is going to run 
    everytime the server recieves a request
    req = request object (ie url requested)
    res = object we use to send a response to the user
    */
    //lodash
    console.log(req.url);

   //set header content type
   res.setHeader('Content-Type', 'text/script')

   let url = req.url

   let page = url.split("?")[0];
   if (url.split("?")[1] != undefined){
       let request = url.split("?")[1];
       let content = request.split("=")[1]
       dbcall(
           `INSERT INTO tasks (content, isDone)
           VALUES ('${content}', 0)`
       )
   }
   let listOfTask = await Database.dbcall('SELECT * FROM tasks')
    console.log(listOfTask);
    console.log(page)

    let path = './views/'
    switch(page){
        case '/':
            path += 'index.html'
            res.statusCode = 200;
            break;
        case '/about':
            path+= 'about.html'
            res.statusCode = 200;
            break;
        case '/about-bla':
            res.statusCode = 301;
            res.setHeader('Location', '/about')
            res.end();
            break;
        default:
            path += '404.html'
            res.statusCode = 404;
            break;
    }

   fs.readFile(path, (err,data)=>{
    if (err){
        console.log(err)
        res.end();
    }else{
        //res.write(data); if you send only one thing, you can directly send it back in the .end() function
        res.end(data);
    }
   })

});

server.listen(3000, 'localhost', ()=>{
    console.log('listening for requests on port 3000')
});

}
runserver();