const express = require('express');
const Expediente = require('../models/expediente');


// todos los elementos GET / => list
function list(req, res, next) {
  let name = "Expedientes" ;
  let page = req.params.page? req.params.page : 1;
  const options = {
    page: page,
    limit: 5
  };
  Expediente.paginate({}, options).then((expedientes)=>{
    res.render('expedientes/list', {
      title:"Expedientes",
      cabecera:name,
      expedientes:expedientes
     });
  });
}

function listData(req, res, next) {
  let name = "Expedientes" ;
  let page = req.params.page? req.params.page : 1;
  const options = {
    page: page,
    limit: 5
  };

  Expediente.paginate({}, options).then((expedientes)=>{
    res.json(expedientes);
  });
}



// regrese un elemento GET /:id => index
function index(req, res, next) {
  let object = new Expediente({
    _nombreProyecto:"Tarra",
    _fechaSolicitud:27/05/20,
    _fechaAranque:28/05/20,
    _descripcion:"Jo",
    _productoManager:"Juan",
    _productOwner:"Saul",
    _miembros:""
  });
  Expediente.create(object).then(obj => res.render('expedientes/list', {
  title:"Expedientes",
  cabecera:"",
  expedientes:[]}));
}

function form(req, res, next){
  let name = "Agregar un nuevo expediente" ;
  res.render('expedientes/form', {title:name, cabecera: name });
}

// crea un elemento POST /create => createError
function create(req, res, next) {
  let object = new Expediente({
    _nombreProyecto:req.body.nombreProyecto,
    _fechaSolicitud:req.body.fechaSolicitud,
    _fechaAranque:req.body.fechaArranque,
    _descripcion:req.body.descripcion,
    _productoManager:req.body.productManager,
    _productOwner:req.body.productOwner,
    _miembros:req.body.miembros
  });
  Expediente.create(object).then(obj => {
  //  res.flash("info", "Expediente creado correctamente.");
    res.redirect('/expedientes/');
  });
}

function edit(req, res, next){
  const id = req.params.id;
  let name = "Edita un expediente" ;
  Expediente.findOne({'_id':id})
  .then(obj => res.render('expedientes/form', {
    title:name, cabecera: name, expediente:obj
   }));
}

// modifica un elemento PUT /:id => update
function update(req, res, next) {
  const id = req.params.id;
  Expediente.findOne({'_id':id})
  .then((obj) =>{
    obj._nombreProyecto=req.body.nombreProyecto;
    obj._fechaSolicitud=req.body.fechaSolicitud;
    obj._fechaAranque=req.body.fechaArranque;
    obj._descripcion=req.body.descripcion;
    obj._productoManager=req.body.productManager;
    obj._productOwner=req.body.productOwner;
    obj._miembros=req.body.miembors;
    obj.save().then(expediente => res.redirect('/expedientes/'));
  });
}

//elimina un elemento DELETE /:id => destroy
function destroy(req, res, next) {
  const id = req.params.id;
  Integrante.remove({"_id":id}).then(obj => res.status(200).json({
    message:res.__('succeed'),
    objs: obj
  })).catch(err => res.status(500).json({
    message: res.__('err.delete.one', {"id":id,"item":"integrante"}),
    objs: err
  }));
}

function remove(req, res, next) {
  const id = req.params.id;
  console.log(id);
  Expediente.remove({"_id":id}).then(obj => res.redirect('/expedientes/'))
  .catch(err => res.status(500).json({
    message: res.__('err.delete.one', {"id":id,"item":"expediente"}),
    objs: err
  }));
}

module.exports = {
  list, index, form, create, edit, update, destroy, remove, listData
}
