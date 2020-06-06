const express = require('express');
const Expediente = require('../models/expediente');
const async = require('async');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

//login = email y password

//const jwtKey = config.get("secret.key");
//user => email, name, last_name, password

// todos los elementos GET / => list
function list(req, res, next) {
  Expediente.find().populate("_miembros")
    .then(obj =>
      res.status(200).json({
       message:'expediente del sistema',
       objs:obj
    })).catch(err => res.status(500).json({
      message: "error al cargar los expediente del sistema",
      objs: err
    }));
}

// regrese un elemento GET /:id => index
function index(req, res, next) {
  const id = req.params.id;
  Expediente.findOne({"_id":id}).populate("_miembros")
    .then(obj => res.status(200).json({
      message:`expediente del sistema con id ${id}`,
      objs: obj
    })).catch(err => res.status(500).json({
      //message: `error al cargar el usuario del sistema con id = ${id}`,
      message: res.__('err.load.user', {"id":id}),
      objs: err
    }));
}

// crea un elemento POST /create => createError
function create(req, res, next) {
  let nombreProyecto = req.body.nombreProyecto;
  let fechaSolicitud = req.body.fechaSolicitud;
  let fechaArranque = req.body.fechaArranque;
  let descripcion = req.body.descripcion;
  let productManager = req.body.productManager;
  let productOwner = req.body.productOwner;
  let miembros = req.body.miembros;

  let expediente = new Expediente({
    _nombreProyecto:nombreProyecto,
    _fechaSolicitud:fechaSolicitud,
    _fechaArranque:fechaArranque,
    _descripcion:descripcion,
    _productManager:productManager,
    _productOwner:productOwner,
    _miembros:miembros
  });

  expediente.save().then(obj => res.status(200).json({
          message : 'expediente creado correctamente.',
          objs: obj
        })).catch(err => res.status(500).json({
          message: 'no se pudo guardar el expediente',
          objs: err
      }));
}

// modifica un elemento PUT /:id => update
function update(req, res, next) {
  const id = req.params.id;
  let nombreProyecto = req.body.nombreProyecto;
  let fechaSolicitud = req.body.fechaSolicitud;
  let fechaArranque = req.body.fechaArranque;
  let descripcion = req.body.descripcion;
  let productManager = req.body.productManager;
  let productOwner = req.body.productOwner;
  let miembros = req.body.miembros;

  Expediente.findOne({"_id":id})
    .then(exp => {
      exp._nombreProyecto = (nombreProyecto!=null) ? nombreProyecto:exp._nombreProyecto;
      exp._fechaSolicitud = (fechaSolicitud!=null) ? fechaSolicitud:exp._fechaSolicitud;
      exp._fechaArranque = (fechaArranque!=null) ? fechaArranque:exp._fechaArranque;
      exp._descripcion = (descripcion!=null) ? descripcion:exp._descripcion;
      exp._productManager = (productManager!=null) ? productManager:exp._productManager;
      exp._productOwner = (productOwner!=null) ? productOwner:exp._productOwner;
      exp._miembros = (miembros!=null) ? miembros:exp._miembros;
      exp.save().then(obj => {
        res.status(200).json({
                message : 'expediente actualizado correctamente.',
                objs: obj
              }).catch(err => res.status(500).json({
                message: 'no se pudo guardar el expediente',
                objs: err
            }));
      });
    });
}

//elimina un elemento DELETE /:id => destroy
function destroy(req, res, next) {
  const id = req.params.id;
  Expediente.remove({"_id":id}).then(obj => res.status(200).json({
    message:`expediente del sistema con id ${id} ha sido elimiando`,
    objs: obj
  })).catch(err => res.status(500).json({
    message: `error al eliminar el expediente del sistema con id = ${id}`,
    objs: err
  }));
}

module.exports = {
  list, index, create, update, destroy
}
