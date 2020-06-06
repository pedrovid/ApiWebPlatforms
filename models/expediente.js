const mongoose = require('mongoose');

const schema = mongoose.Schema({
  _nombreProyecto:String,
  _fechaSolicitud:Date,
  _fechaArranque:Date,
  _descripcion: String,
  _productManager:String,
  _productOwner:String,
  _miembros:[{
    type:mongoose.Schema.ObjectId,
    ref:'Integrante'
  }]
});



class Expendiente {
  constructor(nombreProyecto, fechaSolicitud, fechaArranque, descripcion, productManager, productOwner, miembros){
    this._nombreProyecto= nombreProyecto;
    this._fechaSolicitud=fechaSolicitud;
    this._fechaArranque=fechaArranque;
    this._descripcion=descripcion;
    this._productManager = productManager;
    this._productOwner = productOwner;
    this._miembros = miembros;
  }

  get nombreProyecto(){
    return this._nombreProyecto;
  }

  set nombreProyecto(v){
    this._nombreProyecto = v;
  }

  get fechaSolicitud(){
    return this._fechaSolicitud;
  }

  set fechaSolicitud(v){
    this._fechaSolicitud = v;
  }

  get fechaArranque(){
    return this._fechaArranque;
  }

  set fechaArranque(v){
    this._fechaArranque = v;
  }

  get descripcion(){
    return this._descripcion;
  }

  set descripcion(v){
    this._descripcion = v;
  }

  get productManager(){
    return this._productManager;
  }

  set productManager(v){
    this._productManager = v;
  }

  get productOwner(){
    return this._productOwner;
  }

  set productOwner(v){
    this._productOwner = v;
  }

  get miembros(){
    return this._miembros;
  }

  set miembros(v){
    this._miembros = v;
  }
}

schema.loadClass(Expendiente);
module.exports = mongoose.model('Expediente', schema);
