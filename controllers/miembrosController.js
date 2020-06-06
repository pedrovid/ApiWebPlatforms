const express = require('express');
const Miembro = require('../models/miembro');
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
  Miembro.find().populate({path:'_habilidades'})
    .then(obj =>
      res.status(200).json({
       message:'miembro del sistema',
       objs:obj
    })).catch(err => res.status(500).json({
      message: "error al cargar los miembro del sistema",
      objs: err
    }));
}

// regrese un elemento GET /:id => index
function index(req, res, next) {
  const id = req.params.id;
  Miembro.findOne({"_id":id}).populate({path:'_habilidades'})
    .then(obj => res.status(200).json({
      message:`miembro del sistema con id ${id}`,
      objs: obj
    })).catch(err => res.status(500).json({
      //message: `error al cargar el usuario del sistema con id = ${id}`,
      message: res.__('err.load.user', {"id":id}),
      objs: err
    }));
}

// crea un elemento POST /create => createError
function create(req, res, next) {
  let nombreCompleto = req.body.nombreCompleto;
  let fechaNacimiento = req.body.fechaNacimiento;
  let curp = req.body.curp;
  let rfc = req.body.rfc;
  let domicilio = req.body.domicilio;
  let habilidades = req.body.habilidades;
  let miembro = new Miembro({
    _nombreCompleto:nombreCompleto,
    _fechaNacimiento:fechaNacimiento,
    _curp:curp,
    _rfc:rfc,
    _domicilio:domicilio,
    _habilidades:habilidades
  });

  miembro.save().then(obj => res.status(200).json({
          message : 'miembro creado correctamente.',
          objs: obj
        })).catch(err => res.status(500).json({
          message: 'no se pudo guardar el miembro',
          objs: err
      }));
}

// modifica un elemento PUT /:id => update
function update(req, res, next) {
  const id = req.params.id;
  let nombreCompleto = req.body.nombreCompleto;
  let fechaNacimiento = req.body.fechaNacimiento;
  let curp = req.body.curp;
  let rfc = req.body.rfc;
  let domicilio = req.body.domicilio;
  let habilidades = req.body.habilidades;

  Miembro.findOne({"_id":id}).then(exp => {
    exp._nombreCompleto = (nombreCompleto!=null) ? nombreCompleto:exp._nombreCompleto;
    exp._fechaNacimiento = (fechaNacimiento!=null) ? fechaNacimiento:exp._fechaNacimiento;
    exp._curp = (curp!=null) ? curp:exp._curp;
    exp._rfc = (rfc!=null) ? rfc:exp._rfc;
    exp._domicilio = (domicilio!=null) ? domicilio:exp._domicilio;
    exp._habilidades = (habilidades!=null) ? habilidades:exp._habilidades;

    exp.save().then(miembro => {
      res.status(200).json({
          message : 'miembro actualizado correctamente.',
          objs: miembro
        }).catch(err => res.status(500).json({
          message: 'no se pudo guardar el miembro',
          objs: err
      }));
    });
  });
}

//elimina un elemento DELETE /:id => destroy
function destroy(req, res, next) {
  const id = req.params.id;
  Miembro.remove({"_id":id}).then(obj => res.status(200).json({
    message:`miembro del sistema con id ${id} ha sido elimiando`,
    objs: obj
  })).catch(err => res.status(500).json({
    message: `error al eliminar el miembro del sistema con id = ${id}`,
    objs: err
  }));
}

module.exports = {
  list, index, create, update, destroy
}
