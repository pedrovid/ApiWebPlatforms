const mongoose = require('mongoose');

const schema = mongoose.Schema({
  _miembro:{type: mongoose.Schema.Types.ObjectId, ref: 'Miembro' },
  _rol:String
})

class Integrante {
  constructor(miembro, rol){
    this._miembro = miembro;
    this._rol = rol;
  }

  get miembro(){
    return this._miembro;
  }

  set miembro(v){
    this._miembro = v;
  }

  get rol(){
    return this._rol;
  }

  set rol(v){
    this._rol = v;
  }
}



schema.loadClass(Integrante);
module.exports = mongoose.model('Integrante', schema);
