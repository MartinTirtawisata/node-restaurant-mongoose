"use strict" 

const express = require('express');
const monGoose = require('mongoose');

monGoose.Promise = global.Promise;

const {DATABASE_URL, PORT} = require('./config');
