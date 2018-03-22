/*jshint esversion: 6 */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const projetCtrl = require('./controlers/projets_controleur');
const adminCtrl = require('./controlers/admin_controleur');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + "/public"));

//Connection à la bdd
const BDD = require('mongoose');
let mongodbUri = 'mongodb://mlgportfolio:mlgadmin@ds235778.mlab.com:35778/mlgportfolio';
BDD.connect(mongodbUri)
//BDD.connect('mongodb://127.0.0.1:27017/portfolio');

let db = BDD.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('connecté à la bdd');
    app.listen(8000, () => {
        console.log('Listening on 8000');
        projetCtrl(app);
        adminCtrl(app);
    });
});
