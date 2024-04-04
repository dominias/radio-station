const fs = require('fs');
const path = require('path');
const express = require('express');

const jsonList = 'list.json';
const jsonListPath = path.join(__dirname, 'data/json', jsonList);
const jsonListData = fs.readFileSync(jsonListPath, 'utf8');
const list = JSON.parse(jsonListData);

const jsonTime = 'time.json';
const jsonTimePath = path.join(__dirname, 'data/json', jsonTime);
const jsonTimeData = fs.readFileSync(jsonTimePath, 'utf8');
const time = JSON.parse(jsonTimeData);

const app = express();

const jsonMessage = (msg) => { return {message: msg}};

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('data', path.join(__dirname, 'data'));

app.use('/static', express.static(path.join(__dirname, 'static')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.render('pages/main',
    {
        timeData: time,
        listData: list
    });
});

app.get('/extra', function(req, res) {
    res.render('pages/extra');
})

app.get('/list', (req, res) => {
    res.render('pages/list', { playlists: list });
});

app.get('/list/single/:listName', (req, res) => {
    const nameToFind = req.params.listName.toLowerCase();

    const matches = list.filter(playlist => nameToFind === playlist.name.toLowerCase());

    res.render('pages/list', { playlists: matches });
});

app.get('/list/search/:listSubstring', (req, res) => {
    const nameToFind = req.params.listSubstring.toLowerCase();

    const matches = list.filter(playlist => playlist.name.toLowerCase().includes(nameToFind));

    res.render('pages/list', { playlists: matches });
});

app.listen(8080);

console.log("The server is listening on port 8080.");
