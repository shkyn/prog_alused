const express = require("express")

const fs = require("fs");

// use ejs files to prep temp for views
const path = require("path")
app.set("view engine", "ejs")
apps.et("views", path.join(_dirname, "views"))






app.get("/", (req, res) => {
    // tasks list data
   readFile("./tasks.json")
        .then(tasks => {
            res.render("index", {
                tasks: tasks,
                error: null
            })
        })
    });


app.use(express.urlencoded({ extended: true}));


app.post("/", (req, res) => {
    // controll data form
    let error = null
    if(req.bodyˇ.task.trim().length == 0){
        error ="Please insert correct task data"
        readFile("./tasks.json")
        .then(tasks => {
            res.render("index", {
                tasks: tasks,
                error: error
            })
        })

    }else{

    // tasks list data
    readFile("./tasks")
     .then(tasks => {
        let index
        if(tasks.length === 0)
        {
            index = 0
        } else {
            index = tasks[tasks.length-1].id + 1;
        }
        // create task
        const newTask = {
            "id" : index,
            "task" : req.body.task
        }
        // adds form sent task
        tasks.push(newTask)
        data = JSON.stringify(tasks, null, 2)
        writeFile("tasks.json", data)
        res.redirect("/")
        })
     }
    })
    

app.get("/delete-task/:taskId", (req,   res) => {
    let deletedTaskId = parseInt(req.params.taskId)
    readFile("./tasks.json")
    .then(tasks => {
        tasks.forEach((task, index) => {
            if(task.id === deletedTaskId){
                tasks.splice(index, 1)
            }
        })
        data = JSON.stringify(tasks, null, 2)

        writeFile("tasks.json", data)
        res.redirect("/")
        })
    })







app.listen(3001, () => {
    console.log("Example app is started at http://localhost:3001")
})

const express = require('express');
const router = express.Router();
const fs = require('fs');

// Kood, mis loeb ja kirjutab faili
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

// GET päring kodulehele
router.get('/', (req, res) => {
    readFile('./tasks.json')
        .then(tasks => {
            res.render('index', { tasks: tasks, error: null });
        })
        .catch(err => {
            res.render('index', { tasks: [], error: "Failed to load tasks." });
        });
});

// POST päring uue ülesande lisamiseks
router.post('/', (req, res) => {
    let error = null;
    if (!req.body.task || req.body.task.trim().length === 0) {
        error = "Please insert a valid task.";
        readFile('./tasks.json')
            .then(tasks => {
                res.render('index', { tasks: tasks, error: error });
            });
    } else {
        readFile('./tasks.json')
            .then(tasks => {
                const newTask = {
                    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
                    task: req.body.task.trim()
                };
                tasks.push(newTask);
                return writeFile('./tasks.json', JSON.stringify(tasks, null, 2));
            })
            .then(() => {
                res.redirect('/');
            })
            .catch(err => {
                res.render('index', { tasks: [], error: "Failed to add task." });
            });
    }
});

// Ülesande kustutamise funktsioon
router.get('/delete-task/:taskId', (req, res) => {
    const taskId = parseInt(req.params.taskId);
    readFile('./tasks.json')
        .then(tasks => {
            const updatedTasks = tasks.filter(task => task.id !== taskId);
            return writeFile('./tasks.json', JSON.stringify(updatedTasks, null, 2));
        })
        .then(() => {
            res.redirect('/');
        })
        .catch(err => {
            res.render('index', { tasks: [], error: "Failed to delete task." });
        });
});

module.exports = router;

const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes/todoRouter'); // Lisa see, et tuua ruuter

// EJS vaated
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

// Kasuta ruuterit
app.use('/', router);

app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});

// Errori haldamine faili lugemisel
readFile('./tasks.json')
    .then(tasks => {
        res.render('index', { tasks: tasks, error: null });
    })
    .catch(err => {
        res.render('index', { tasks: [], error: "Failed to load tasks." });
    });
