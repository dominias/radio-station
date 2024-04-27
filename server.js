require('dotenv').config();

const path = require('path');
const express = require('express');

const User = require('./models/User');
const List = require('./models/List');
const Time = require('./models/Time');
const Record = require('./models/Record');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('data', path.join(__dirname, 'data'));

app.use('/static', express.static(path.join(__dirname, 'static')));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', function(req, res) {
    Time.find()
        .then((tdata) => {
            List.find()
                .then((ldata) => {
                    Record.find()
                        .then((rdata) => {
                            User.find()
                                .then((udata) => {
                                    res.render('pages/main', {
                                        timeData: tdata,
                                        listData: ldata,
                                        recoData: rdata,
                                        userData: udata
                                    });
                                })
                                .catch((err) => {
                                    res.json({ message: "Unable to connect to User."});
                                });
                        })
                        .catch((err) => {
                            res.json({ message: "Unable to connect to Record." });
                        });
                })
                .catch((err) => {
                    res.json({ message: "Unable to connect to List." });
                });
        })
        .catch((err) => {
            res.json({ message: "Unable to connect to Time." });
        });
});

const listRouter = require('./handlers/listRouter.js');
listRouter.handleLists(app, List, Record);
listRouter.handleListName(app, List, Record);
listRouter.handleListEdit(app, List);
listRouter.handleRecordSelect(app, List, Record);

require('./handlers/dataHandler.js').connect();

const port = process.env.port;

app.listen(port, () => { console.log(`The server is running at port number ${port}.`); });
