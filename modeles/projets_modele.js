let BDD = require('mongoose');
let ProjetModele = BDD.Schema({
    "titre": {type:String, required:true},
    "titre-court": {type:String, required:true},
    "date-creation":Date,
    "categorie": {type:String,enum:["web", "jeux-video", "multimedia"], required:true},
    "image": {type:[String], required:true},
    "description": {type:String, required:true},
    "tags": [String],
    "like": {type:Number, min:0},
    "lien": String,
    "temps": Number
});

let Projet = BDD.model('Projet', ProjetModele, 'projets');
module.exports = Projet;