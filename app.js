const express = require('express');
const Database = require('./database.js');



const app = express();
// connect to mongo db
const dbURI = 'mongodb+srv://ndz:test1234@cluster0.6mhcgws.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

//register view engine
app.set('view engine', 'ejs');

app.listen(3000);

// middleware & static files
app.use(express.static('public'))

app.use((req, res, next)=>{
    console.log('in the next middleware');
    next();
})

app.get('/',async (req, res) => {
    
    const tasks = await Database.query(
        `SELECT content FROM tasks`
    );
    console.log(tasks);
    res.render('index', {tasks});
});

app.get('/about',(req, res) => {
    res.render('about')
});

app.use((req, res)=>{
    res.status(404).render('404', {root:__dirname});
});

