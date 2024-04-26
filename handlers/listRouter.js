const handleLists = (app, List, Record) => {
    app.get('/list', (req, res) => {
        List.find()
            .then((ldata) => {
                Record.find()
                    .then((rdata) => {
                        res.render('pages/list', {
                            lists: ldata,
                            records: rdata
                        });
                    })
                    .catch((err) => {
                        res.json({ message: "Unable to connect to Record." });
                    });
            })
            .catch((err) => {
                res.json({ message: "Unable to connect to List." });
            });
    });
};

const handleListName = (app, List, Record) => {
    app.get('/list/single/:listName', (req, res) => {
        List.find({ name: req.params.listName })
            .then((ldata) => {
                Record.find()
                    .then((rdata) => {
                        res.render('pages/list', {
                            lists: ldata,
                            records: rdata
                        });
                    })
                    .catch((err) => {
                        res.json({ message: "Unable to connect to Record." });
                    });
            })
            .catch((err) => {
                res.json({ message: "Unable to connect to List." });
            });
    });
};

const handleListEdit = (app, List) => {
    app.post("/list/add/finish", (req, res) => {
            List.findOneAndUpdate(
                {id: req.body.listID},
                {$push: { records: {recid: req.body.recoID} }},
                {new: true})
                .then((data) => {
                    res.redirect(`/list/add/record/${req.body.listID}`);
                })
                .catch((err) => {
                    res.json({ message: "Unable to update the list."});
                });
        });
};

const handleRecordSelect = (app, List, Record) => {
    app.get('/list/add/record/:listID', (req, res) => {
        List.findOne({id : req.params.listID})
            .then((ldata) => {
                Record.find()
                    .then((rdata) => {
                        res.render('pages/record', {
                            list: ldata,
                            records: rdata
                        });
                    })
                    .catch((err) => {
                        res.json({ message: "Unable to connect to Record."});
                    });
            })
            .catch((err) => {
                res.json({ message: "Unable to connect to List." });
            });
    });
};

module.exports = {
    handleLists,
    handleListName,
    handleListEdit,
    handleRecordSelect
};