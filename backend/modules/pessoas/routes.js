'use strict'

const Actions = require('./actions')
const Routes = require('./routes.config')(Actions)

module.exports = 
	require('../../router-express.js')(Routes)