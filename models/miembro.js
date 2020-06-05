const mongoose = require('mongoose');

const schema = mongoose.Schema({
  _nombreCompleto:String,
  _fechaNacimiento:String,
  _curp:String,
  _rfc: String,
  _domicilio:String,
  _habilidades:[{
    _lenguaje:String,
    _rank:String
  }]
});

class Miembro {
  constructor(nombreCompleto, fechaNacimiento, curp, rfc, domicilio, habilidades){
    this._nombreCompleto = nombreCompleto;
    this._fechaNacimiento = fechaNacimiento;
    this._curp = curp;
    this._rfc = rfc;
    this._domicilio = domicilio;
    this._habilidades = habilidades;
  }

  get nombreCompleto(){
    return this._nombreCompleto;
  }

  set nombreCompleto(v){
    this._nombreCompleto = v;
  }

  get fechaNacimiento(){
    return this._fechaNacimiento;
  }

  set fechaNacimiento(v){
    this._fechaNacimiento = v;
  }

  get curp(){
    return this._curp;
  }

  set curp(v){
    this._curp = v;
  }

  get rfc(){
    return this._rfc;
  }

  set rfc(v){
    this._rfc = v;
  }

  get domicilio(){
    return this._domicilio;
  }

  set domicilio(v){
    this._domicilio = v;
  }

  get habilidades(){
    return this._habilidades;
  }

  set habilidades(v){
    this._habilidades = v;
  }
}

schema.loadClass(Miembro);
module.exports = mongoose.model('Miembro', schema);
