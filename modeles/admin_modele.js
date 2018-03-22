let BDD = require('mongoose');
let UtilModele = BDD.Schema({
    "util": {type:String, required:true},
    "mdp": {type:String, required:true},
});

let Util = BDD.model('Admin', UtilModele, 'admin');
module.exports = Util;