const express = require('express');
const Expediente = require('../models/expediente');
const async = require('async');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

//login = email y password

const jwtKey = config.get("secret.key");
//user => email, name, last_name, password

// todos los elementos GET / => list
function list(req, res, next) {

}

// regrese un elemento GET /:id => index
function index(req, res, next) {
  res.status(200).json({
   message:'Usuarios del sistema'
 })
}

// crea un elemento POST /create => createError
function create(req, res, next) {

}

// modifica un elemento PUT /:id => update
function update(req, res, next) {

}

//elimina un elemento DELETE /:id => destroy
function destroy(req, res, next) {

}

module.exports = {
  list, index, create, update, destroy
}
