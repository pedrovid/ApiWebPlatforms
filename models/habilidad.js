const mongoose = require('mongoose');

const schema = mongoose.Schema({
  _lenguaje:String,
  _rank:String
});

class Habilidad {
  constructor(lenguaje, rank){
    this._lenguaje = lenguaje;
    this._rank = rank;
  }

  get lenguaje(){
    return this._lenguaje;
  }

  set lenguaje(v){
    this._lenguaje = v;
  }

  get rank(){
    return this._rank;
  }

  set rank(v){
    this._rank = v;
  }
}



schema.loadClass(Habilidad);
module.exports = mongoose.model('Habilidad',schema);
