const express = require('express');
const Narrativa = require('../models/narrativa');
const async = require('async');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('config');

//login = email y password

//const jwtKey = config.get("secret.key");
//user => email, name, last_name, password
function form(req, res, next){
  let name = "Agregar una nueva Narrativa";
  res.render('Narrativas/form',{cabecera:name, title:name})
}
// todos los elementos GET / => list
function list(req, res, next) {
  Narrativa.find().then(obj =>{
    let name = "listado de Narrativas";
    res.render('Narrativas/list',{title:"Narrativas", cabecera:name,narrativas:obj})
  }).catch(err => res.status(500).json({
      message: res.__('err.load.many', {"item":"narrativas"}),
      objs: err
    }));
}

function edit(req, res, next){
  const id = req.params.id;
  let name = "Agregar una nueva narrativa";
  Narrativa.findOne({'_id': id})
    .then(obj => {
      res.render('Narrativas/form',
        {cabecera:name,
          title:name, narrativa: obj})})
}

// regrese un elemento GET /:id => index
function index(req, res, next) {
  const id = req.params.id;
  Narrativa.findOne({"_id":id})
    .then(obj => res.status(200).json({
      message:res.__('succeed'),
      objs: obj
    })).catch(err => res.status(500).json({
      //message: `error al cargar el usuario del sistema con id = ${id}`,
      message: res.__('err.load.one', {"id":id,"item":"narrativa"}),
      objs: err
    }));
}

// crea un elemento POST /create => createError
function create(req, res, next) {
  let nombre = req.body.nombre;
  let como = req.body.como;
  let quiero = req.body.quiero;
  let deTalManera = req.body.deTalManera;
  let prioridad = req.body.prioridad;
  let tamaño = req.body.tamaño;
  let nombreCriterio = req.body.nombreCriterio;
  let dado = req.body.dado;
  let cuando = req.body.cuando;
  let entonces = req.body.entonces;
  let narrativa = new Narrativa({
    _nombre:nombre,
    _como:como,
    _quiero:quiero,
    _deTalManera:deTalManera,
    _prioridad:prioridad,
    _tamaño:tamaño,
    _nombreCriterio:nombreCriterio,
    _dado:dado,
    _cuando:cuando,
    _entonces:entonces
  });

  narrativa.save().then(obj => res.redirect('/narrativas/'))
    .catch(err => res.status(500).json({
          message: res.__('err.create.one', {"item":"narrativa"}),
          objs: err
      }));
}

// modifica un elemento PUT /:id => update
function update(req, res, next) {
  const id = req.params.id;
  let nombre = req.body.nombre;
  let como = req.body.como;
  let quiero = req.body.quiero;
  let deTalManera = req.body.deTalManera;
  let prioridad = req.body.prioridad;
  let tamaño = req.body.tamaño;
  let nombreCriterio = req.body.nombreCriterio;
  let dado = req.body.dado;
  let cuando = req.body.cuando;
  let entonces = req.body.entonces;

  Narrativa.findOne({"_id":id}).then(exp => {
    exp.nombre=(nombre!=null)? nombre:exp._nombre;
    exp.como=(como!=null)? como:exp._como;
    exp.quiero=(quiero!=null)? quiero:exp._quiero;
    exp.deTalManera=(deTalManera!=null)? deTalManera:exp._deTalManera;
    exp.prioridad=(prioridad!=null)? prioridad:exp._prioridad;
    exp.tamaño=(tamaño!=null)? tamaño:exp._tamaño;
    exp.nombreCriterio=(nombreCriterio!=null)? nombreCriterio:exp._nombreCriterio;
    exp.dado=(dado!=null)? dado:exp._dado;
    exp.cuando=(cuando!=null)? cuando:exp._cuando;
    exp.entonces=(entonces!=null)? entonces:exp._entonces;

    exp.save().then(obj => {
      res.redirect('/narrativas/')
    }).catch(err => res.status(500).json({
      message: res.__('err.update.one', {"id":id,"item":"narrativa"}),
      objs: err
  }))

  });
}

//elimina un elemento DELETE /:id => destroy
function destroy(req, res, next) {
  const id = req.params.id;
  Narrativa.remove({"_id":id}).then(obj => res.redirect('/narrativas/'))
    .catch(err => res.status(500).json({
    message: res.__('err.delete.one', {"id":id,"item":"narrativa"}),
    objs: err
  }));
}

module.exports = {
  list, index, create, update, destroy, form, edit
}
