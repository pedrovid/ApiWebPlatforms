const mongoose = require('mongoose');

const schema = mongoose.Schema({
  _email:String,
  _nombre:String,
  _apellido:String,
  _password:String,
  _salt: String
});

class Usuario {
  constructor(email, nombre, apellido, password, salt){
    this._email = email;
    this._nombre = nombre;
    this._apellido = apellido;
    this._password = password;
    this._salt = salt;
  }

  get email(){
    return this._email;
  }

  set email(v){
    this._email = v;
  }

  get nombre(){
    return this._nombre;
  }

  set nombre(v){
    this._nombre = v;
  }
  get apellido(){
    return this._apellido;
  }

  set apellido(v){
    this._apellido = v;
  }

  get password(){
    return this._password;
  }

  set password(v){
    this._password = v;
  }

  get salt(){
    return this._salt;
  }

  set salt(v){
    this._salt = v;
  }

}

schema.loadClass(Usuario);
module.exports = mongoose.model('Usuario', schema);
