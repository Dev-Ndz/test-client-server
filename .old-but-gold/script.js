import { Database } from '../database.js';

console.log("hello there !");

const tasklist = document.getElementById('tasklist');
async function getListOfTask(){
    let listOfTask = await Database.dbcall("SELECT content FROM tasks")
    return (listOfTask);
}

async function getTaskContent(){
    let list = await getListOfTask();
    console.log(list);
    let returnlist =[]
    list.forEach((tasks) => {
        returnlist.push(tasks.content)
    });
    return returnlist;
}
async function generateTaskList(listOfTasks){
    listOfTasks.forEach((task)=>{
        const newtask = document.createElement("li");//create a new li element
        const taskContent = document.createTextNode(task); // add content to the new li
        newtask.appendChild(taskContent);   // add the text node to the newly created div
        tasklist.appendChild(newtask);
    })
}
async function async(){
    let listOfTask = await getTaskContent();
    generateTaskList(listOfTask);
    console.log("coucou");
}
async();


