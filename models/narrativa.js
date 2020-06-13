const mongoose = require('mongoose');

const schema = mongoose.Schema({
  _nombre:String,
  _como:String,
  _quiero:String,
  _deTalManera:String,
  _prioridad:Number,
  _tamaño:Number,
  _nombreCriterio:String,
  _dado:String,
  _cuando:String,
  _entonces:String
});

class Narrativa{
  constructor(nombre, como, quiero, deTalManera, prioridad, tamaño, nombreCriterio, dado, cuando, entonces){
    this._nombre=nombre;
    this._como=como;
    this._quiero=quiero;
    this._deTalManera=deTalManera;
    this._prioridad=prioridad;
    this._tamaño=tamaño;
    this._nombreCriterio=nombreCriterio;
    this._dado=dado;
    this._cuando=cuando;
    this._entonces=entonces;
  }

  get nombre(){
    return this._nombre;
  }

  set nombre(v){
    this._nombre = v;
  }

  get como(){
    return this._como;
  }

  set como(v){
    this._como = v;
  }
  get quiero(){
    return this._quiero;
  }

  set quiero(v){
    this._quiero = v;
  }
  get deTalManera(){
    return this._deTalManera;
  }

  set deTalManera(v){
    this._deTalManera = v;
  }
  get prioridad(){
    return this._prioridad;
  }

  set prioridad(v){
    this._prioridad = v;
  }
  get tamaño(){
    return this._tamaño;
  }

  set tamaño(v){
    this._tamaño = v;
  }
  get nombreCriterio(){
    return this._nombreCriterio;
  }

  set nombreCriterio(v){
    this._nombreCriterio = v;
  }
  get dado(){
    return this._dado;
  }

  set dado(v){
    this._dado = v;
  }
  get cuando(){
    return this._cuando;
  }

  set cuando(v){
    this._cuando = v;
  }

  get entonces(){
    return this._entonces;
  }

  set entonces(v){
    this._entonces = v;
  }
}



schema.loadClass(Narrativa);
module.exports = mongoose.model('Narrativa',schema);
