const express = require('express');
const Integrante = require('../models/integrante');
const async = require('async');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('config');

//login = email y password

//const jwtKey = config.get("secret.key");
//user => email, name, last_name, password

function edit(req, res, next){
  const id = req.params.id;
  let name = "Agregar un nuevo integrante";
  Integrante.findOne({'_id': id}).populate({path:'_miembro'})
    .then(obj => {
      console.log(obj);
      res.render('members/form',
        {cabecera:name,
          title:name, integrante: obj})})
}

function form(req, res, next){
  let name = "Agregar un nuevo Integrante";
  res.render('members/form',{cabecera:name, title:name})
}

// todos los elementos GET / => list
function list(req, res, next) {
  let name = "listado de todos los Integrantes";
  let page = req.params.page ? req.params.page : 1;
  const options = {
    page: page,
    limit: 5
  };
  Integrante.find().populate({path:'_miembro'})
  .then((integrantes)=>{
    res.render('members/list',{title:"Integrantes", cabecera:name,integrantes:integrantes});
  });
}

// regrese un elemento GET /:id => index
function index(req, res, next) {
  const id = req.params.id;
  Integrante.findOne({"_id":id}).populate({path:'_miembro'})
    .then(obj => res.status(200).json({
      message:res.__('succeed'),
      objs: obj
    })).catch(err => res.status(500).json({
      //message: `error al cargar el usuario del sistema con id = ${id}`,
      message: res.__('err.load.one', {"id":id,"item":"integrante"}),
      objs: err
    }));
}

// crea un elemento POST /create => createError
function create(req, res, next) {
  let miembro = req.body.miembro;
  let rol = req.body.rol;

  let integrante = new Integrante({
    _miembro:miembro,
    _rol:rol,
  });

  integrante.save().then(obj => res.redirect('/integrantes/')).catch(err => res.status(500).json({
          message:res.__('err.create.one', {"item":"integrante"}),
          objs: err
      }));
}

// modifica un elemento PUT /:id => update
function update(req, res, next) {
  const id = req.params.id;
  let miembro = req.body.miembro;
  let rol = req.body.rol;

  Integrante.findOne({"_id":id}).then(exp => {
    exp._miembro = (miembro!=null) ? miembro:exp._miembro;
    exp._rol = (rol!=null) ? rol:exp._rol;
    exp.save().then(integrante => res.redirect('/integrantes/'));
    });
}

//elimina un elemento DELETE /:id => destroy
function destroy(req, res, next) {
  const id = req.params.id;
  console.log(id);
  Integrante.remove({"_id":id}).then(obj => res.redirect('/integrantes/'))
  .catch(err => res.status(500).json({
    message: res.__('err.delete.one', {"id":id,"item":"integrante"}),
    objs: err
  }));
}

//elimina un elemento DELETE /:id => destroy
function remove(req, res, next) {
  const id = req.params.id;
  console.log(id);
  Integrante.remove({"_id":id}).then(obj => res.redirect('/integrantes/'))
  .catch(err => res.status(500).json({
    message: res.__('err.delete.one', {"id":id,"item":"integrante"}),
    objs: err
  }));
}

function listData(req, res, next) {
  let name = "listado de todos los Integrantes";
  let page = req.params.page ? req.params.page : 1;
  const options = {
    page: page,
    limit: 5
  };
  Integrante.find().populate({path:'_miembro'})
  .then((integrantes)=>{
    res.render('members/list',{title:"Integrantes", cabecera:name,integrantes:integrantes});
  });
}

module.exports = {
  list, index, create, update, destroy, listData, edit, form, remove
}
