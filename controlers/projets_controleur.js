/*jshint esversion: 6 */
const BDD = require('mongoose')
const ProjetColl = require('../modeles/projets_modele');
const nodemailer = require('nodemailer');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

module.exports = (app) => {
    app.get('/', (req, res) => {
        let data = {};
        data.infosPage = {
            title: "Maxime Lacasse Germain | Portfolio",
            description: "Portfolio de Maxime Lacasse Germain contenant les dernières réalisations en web, jeux vidéo et multimédia.",
            robots: "INDEX, FOLLOW",
            keywords: "Web, jeux vidéo, portfolio"
        };
        res.render('index', {
            data: data
        });
    });

    app.get('/web', (req, res) => {
        let data = {};
        ProjetColl.find({
            categorie: "web"
        }, (err, resultat) => {
            data.projets = resultat;
            console.log(resultat)
            data.infosPage = {
                title: "Maxime Lacasse Germain | Projets web",
                description: "Projets de conception web",
                robots: "INDEX, FOLLOW",
                keywords: "web, nodejs, php"
            };

            res.render('web', {
                data: data
            });
        });
    });

    app.get('/verificationGA',(req,res)=>{
        res.sendFile(__dirname + '/seo/google521ecf1fe145c269.html');
    });

    app.get('/recuperer/:id', (req, res) => {
        ProjetColl.findById(req.params.id, (err, resultat) => {
            res.send(resultat);
        });
    });

    app.get('/jeux-video', (req, res) => {
        let data = {};
        ProjetColl.find({
            categorie: "jeux-video"
        }, (err, resultat) => {
            data.projets = resultat;

            data.infosPage = {
                title: "Maxime Lacasse Germain | Projets de jeux vidéos",
                description: "Projet de jeux vidéo",
                robots: "INDEX, FOLLOW",
                keywords: "programmation, Unity, Phaser"
            };
            res.render('jeux-video', {
                data: data
            });
        });
    });

    app.get('/multimedia', (req, res) => {
        let data = {};
        ProjetColl.find({
            categorie: "multimedia"
        }, (err, resultat) => {
            data.projets = resultat;

            data.infosPage = {
                title: "Maxime Lacasse Germain | Projets de création numérique",
                description: "Projet de création numérique",
                robots: "INDEX, FOLLOW",
                keywords: "graphisme, photoshop, indesign, illustrator"
            };
            res.render('jeux-video', {
                data: data
            });
        });
    });

    app.get('/bio', (req, res) => {
        let data = {};
        data.infosPage = {
            title: "Maxime Lacasse Germain | Biographie",
            description: "Lorem",
            robots: "INDEX, FOLLOW",
            keywords: "Lorem"
        };
        res.render('bio', {
            data: data
        });
    });

    app.post('/traiterCourriel',(req, res) => {
        const errors = validationResult(req);
        console.log(errors);

        let msg = req.body.msg;
        let nom = req.body.nom;
        let fromCourriel = req.body.courriel;
        console.log(msg, nom, fromCourriel);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'lacassegermaindesign@gmail.com',
                pass: 'MLGDesign!84'
            }
        });

        const mailOptions = {
            from: fromCourriel,
            to: 'lacassegermaindesign@gmail.com',
            subject: 'Nouveau courriel de '+ nom,
            text: msg
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Courriel acheminé: ' + info.response);
            }
        });
        res.redirect('/bio');
    });
}