/*jshint esversion: 6 */
const BDD = require('mongoose')
const AdminColl = require('../modeles/admin_modele');


module.exports = (app) => {

    app.get('/admin', (req, res) => {
        res.render('adminConn');
    });

    app.post('/adminConnexion', (req, res) => {
        AdminColl.find({
            'util': req.body.utilisateur
        }, (err, resultat) => {
    
            if (resultat.length == 0) {
                res.render('adminConn')
            }else{
                res.render('adminProjets');
            }
        });
    });
}