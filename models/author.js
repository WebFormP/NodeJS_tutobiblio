var moment = require('moment');   // ce module permet de formater les dates (TUTO Part 5 : Date formatting)
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
  }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {
  return this.family_name + ', ' + this.first_name;
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  return '/catalog/author/' + this._id;
});

/*------------------ Formatage des dates (Vue : author_list) --------------*/ 
// Propriété virtuelle pour la date de naissance formatée
AuthorSchema
.virtual('date_de_naissance')
.get(function () {
  return this.date_of_birth ? moment(this.date_of_birth).format('DD/MM/YYYY') : '';
});

// Propriété virtuelle pour la date de naissance formatée
AuthorSchema
.virtual('date_de_deces')
.get(function () {
  return this.date_of_death ? moment(this.date_of_death).format('DD/MM/YYYY') : '';
});
/*--------------------------------------------------------------------------------------*/

/*------------------ Formatage des dates (Vue : author_form) --------------*/ 
// Propriété virtuelle pour la date de naissance formatée
AuthorSchema
.virtual('date_de_naissance_a_modifier')
.get(function () {
  return this.date_of_birth ? moment(this.date_of_birth).format('YYYY-MM-DD') : '';
});

// Propriété virtuelle pour la date de naissance formatée
AuthorSchema
.virtual('date_de_deces_a_modifier')
.get(function () {
  return this.date_of_death ? moment(this.date_of_death).format('YYYY-MM-DD') : '';
});
/*--------------------------------------------------------------------------------------*/


//Export model
module.exports = mongoose.model('Author', AuthorSchema);