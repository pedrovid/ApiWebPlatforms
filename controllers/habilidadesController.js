const express = require('express');
const Habilidad = require('../models/habilidad');
const async = require('async');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('config');

//login = email y password

//const jwtKey = config.get("secret.key");
//user => email, name, last_name, password

// todos los elementos GET / => list
function list(req, res, next) {
  Habilidad.find()
    .then(obj =>
      res.status(200).json({
       message:'habilidad del sistema',
       objs:obj
    })).catch(err => res.status(500).json({
      message: "error al cargar los habilidad del sistema",
      objs: err
    }));
}

// regrese un elemento GET /:id => index
function index(req, res, next) {
  const id = req.params.id;
  Habilidad.findOne({"_id":id})
    .then(obj => res.status(200).json({
      message:`habilidad del sistema con id ${id}`,
      objs: obj
    })).catch(err => res.status(500).json({
      //message: `error al cargar el usuario del sistema con id = ${id}`,
      message: res.__('err.load.user', {"id":id}),
      objs: err
    }));
}

// crea un elemento POST /create => createError
function create(req, res, next) {
  let lenguaje = req.body.lenguaje;
  let rank = req.body.rank;

  let habilidad = new Habilidad({
    _lenguaje:lenguaje,
    _rank:rank,
  });

  habilidad.save().then(obj => res.status(200).json({
          message : 'habilidad creado correctamente.',
          objs: obj
        })).catch(err => res.status(500).json({
          message: 'no se pudo guardar el habilidad',
          objs: err
      }));
}

// modifica un elemento PUT /:id => update
function update(req, res, next) {
  const id = req.params.id;
  let lenguaje = req.body.lenguaje;
  let rank = req.body.rank;

  Habilidad.findOne({"_id":id}).then(exp => {
    exp._lenguaje = (lenguaje!=null) ? lenguaje:exp._lenguaje;
    exp._rank = (rank!=null) ? rank:exp._rank;

    exp.save().then(obj => {
      res.status(200).json({
          message : 'habilidad actualizado correctamente.',
          objs: obj
        }).catch(err => res.status(500).json({
          message: 'no se pudo guardar el habilidad',
          objs: err
      }))
    })

  });
}

//elimina un elemento DELETE /:id => destroy
function destroy(req, res, next) {
  const id = req.params.id;
  Habilidad.remove({"_id":id}).then(obj => res.status(200).json({
    message:`habilidad del sistema con id ${id} ha sido elimiando`,
    objs: obj
  })).catch(err => res.status(500).json({
    message: `error al eliminar el habilidad del sistema con id = ${id}`,
    objs: err
  }));
}

module.exports = {
  list, index, create, update, destroy
}
