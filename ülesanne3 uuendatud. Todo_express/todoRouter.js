const express = require('express');
const router = express.Router();
const { readFile, writeFile } = require('./fileHelpers');

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

// Ülesande kustutamine
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
const todoRouter = require('./todoRouter'); // Impordi ruuter

// EJS vaated
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

// Kasuta ruuterit
app.use('/', todoRouter);

app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
