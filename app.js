const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/tasks')

const app = express();

// connect to mongo db
const dbURI = 'mongodb+srv://ndz:test1234@cluster0.6mhcgws.mongodb.net/task-manager?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))

// app.get('/new-task', (req, res) => {
//     const task = new Task({
//         content: 'newer task',
//         isDone : false
//     });

//     task.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });
// app.get('/all-tasks', (req,res) => {
//     Task.find()
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });
// app.get('/single-task', (req, res) =>{
//     Task.findById('65def8cb345c955d55021a12')
//         .then((result) => {
//             res.send(result);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });

app.get('/', (req,res) =>{
    res.redirect('/task');
});
app.get('/task',(req, res) => {
    Task.find()
        .then((result) =>{
            res.render('index',{tasks : result});
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post('/task', (req, res) => {
    const task = new Task({
        content:req.body.content,
        isDone: false
    });

    task.save()
        .then((result) => {
            res.redirect('/task');
        })
        .catch((err) => {
            console.log(err);
        });
});
app.delete('/task/:id',(req,res) => {
    console.log('DELETE')
    const id = req.params.id;
    Task.findByIdAndDelete(id)
        .then(result => {
            res.json({redirect:'/task'});
        })
        .catch(err =>{
            console.log(err);
        })
});

app.put('/uncheck/:id', (req,res) => {
    console.log('UPDATE - uncheck a task');
    const id = req.params.id;
    const update = {isDone:false};
    Task.findByIdAndUpdate(id, update)
        .then(result => {
            res.json({redirect:'/task'});
        })
        .catch(err =>{
            console.log(err);
        });
});

app.put('/check/:id', (req,res) => {
    console.log('UPDATE - check a task');
    const id = req.params.id;
    const update = {isDone:true};
    Task.findByIdAndUpdate(id, update)
        .then(result => {
            res.json({redirect:'/task'});
        })
        .catch(err =>{
            console.log(err);
        });
});


app.get('/task/:id', async(req,res) => {
    const listOfTask = await Task.find();
    const id = req.params.id;
    Task.findById(id)
        .then((result) => {
            res.render('selected',{tasks:listOfTask, selectedTask:result});
        })
        .catch((err)=>{
            console.log(err);
        });
})
app.get('/s',(req, res) => {
    Task.find()
    .then((result) =>{
        res.render('selected',{tasks : result});
    })
    .catch((err) => {
        console.log(err);
    });
});

app.get('/add',(req, res) => {
    Task.find()
    .then((result) =>{
        res.render('add',{tasks : result});
    })
    .catch((err) => {
        console.log(err);
    });
});

app.use((req, res)=>{
    res.status(404).render('404', {root:__dirname});
});

